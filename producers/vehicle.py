import pandas as pd
import json
import time
import argparse
from kafka import KafkaProducer

KAFKA_BROKER = 'node5:9092'
TOPIC = 'test'

def load_equipment_data(file_path):
    try:
        data = pd.read_csv(file_path)
        print(f"File loaded successfully: {file_path}")
        return data
    except Exception as e:
        print(f"Error loading file: {e}")
        return None

def create_producer():
    return KafkaProducer(
        bootstrap_servers=KAFKA_BROKER,
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )

def send_data_to_kafka(producer, topic, data, frequency):
    for index, row in data.iterrows():
        message = {
            "equipment": row["Equipment"],
            "event_date": row["Event Date"],
            "location": {"lat": row["Lat"], "lng": row["Lng"]},
            "engine": {
                "load": row["Engine Load"],
                "throttle_position": row["Thrott Pstn"],
                "speed_rpm": row["Eng Spd (rpm)"],
                "fuel_rate": row["Eng Fuel Rate"],
                "oil_pressure_kpa": row["Eng Oil Press (Kpa)"],
                "coolant_temp": row["Eng Cool Tmp"]
            },
            "brakes": {
                "left_front_temp": row["Lft Frnt Brk Tmp"],
                "right_rear_temp": row["Rght Rr Brk Tmp"]
            },
            "payload_tons": row["Payload (t)"],
            "ground_speed": row["Grnd Spd"],
            "fuel_level_percent": row["Tnk Fuel Lvl (%)"]
        }

        # Agregar headers
        headers = [
            ("equipment", str(row["Equipment"]).encode("utf-8"))
        ]

        # Enviar mensaje con headers
        producer.send(topic, value=message, headers=headers)
        print(f"Message sent with headers: {headers}")

        time.sleep(frequency)

# Main function
if __name__ == "__main__":
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Kafka Producer for Vehicle Telemetry Data")
    parser.add_argument("--file", type=str, required=True, help="Path to the CSV file with equipment data")
    parser.add_argument("--frequency", type=float, required=True, help="Frequency of message sending (in seconds)")
    args = parser.parse_args()

    equipment_data = load_equipment_data(args.file)
    if equipment_data is None:
        print("Failed to load the file. Exiting program.")
        exit(1)

    producer = create_producer()

    try:
        send_data_to_kafka(producer, TOPIC, equipment_data, args.frequency)
    except KeyboardInterrupt:
        print("Process interrupted by the user.")
    finally:
        producer.close()
        print("Producer closed.")
