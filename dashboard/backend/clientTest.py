import asyncio
import websockets
import json

# URL del servidor WebSocket
WS_SERVER_URL = "ws://localhost:8765"
async def websocket_client():
    while True:
        try:
            # Conectar al servidor WebSocket
            async with websockets.connect(WS_SERVER_URL) as websocket:
                print(f"Conectado al servidor WebSocket: {WS_SERVER_URL}")

                # Recibir datos del servidor WebSocket
                while True:
                    response = await websocket.recv()
                    data = json.loads(response)
                    print(f"Datos recibidos del servidor: {data}")

        except websockets.exceptions.ConnectionClosedError as e:
            print(f"Error en la conexión: {e}")
        except Exception as e:
            print(f"Error inesperado: {e}")
        finally:
            print("Intentando reconectar en 5 segundos...")
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(websocket_client())