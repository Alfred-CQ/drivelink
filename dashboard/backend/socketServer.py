import asyncio
import websockets
from kafka import KafkaConsumer
import json

KAFKA_BROKER = 'node5:9092'
KAFKA_TOPIC = 'test'
WEB_SOCKET_HOST = 'localhost'
WEB_SOCKET_PORT = 8765

async def kafka_to_websocket(websocket):
    print(f"Cliente conectado")

    # Configura el consumidor de Kafka
    consumer = KafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=[KAFKA_BROKER],
        auto_offset_reset='earliest',
        group_id='vehicle-driveLink-dashboard',
        consumer_timeout_ms=1000  # Tiempo de espera para evitar bloqueos
    )

    try:
        while True:
            # Obtiene los mensajes disponibles de Kafka
            for message in consumer:
                try:
                    # Intenta decodificar el mensaje como JSON
                    telemetry_data = json.loads(message.value.decode('utf-8'))

                    # Construye el objeto de posición
                    position = {
                        'lat': telemetry_data['location']['lat'],
                        'lng': telemetry_data['location']['lng']
                    }

                    # Envía la posición al cliente WebSocket
                    await websocket.send(json.dumps(position))
                except json.JSONDecodeError as e:
                    print(f"Mensaje inválido recibido desde Kafka: {message.value.decode('utf-8')}. Error: {e}")
                except KeyError as e:
                    print(f"Faltan claves en el mensaje JSON: {message.value.decode('utf-8')}. Error: {e}")

            # Agrega un pequeño retraso para liberar el bucle de eventos
            await asyncio.sleep(0.1)

    except websockets.exceptions.ConnectionClosed:
        print(f"Cliente desconectado")
    except asyncio.CancelledError:
        print(f"Conexión cancelada")
    finally:
        # Cierra el consumidor de Kafka al salir
        consumer.close()
        print("Cerrando consumidor de Kafka")

# Función para iniciar el servidor WebSocket
async def start_server():
    server = await websockets.serve(kafka_to_websocket, WEB_SOCKET_HOST, WEB_SOCKET_PORT)
    print(f"Servidor WebSocket iniciado en ws://{WEB_SOCKET_HOST}:{WEB_SOCKET_PORT}")
    await server.wait_closed()

# Iniciar el servidor WebSocket
if __name__ == "__main__":
    asyncio.run(start_server())