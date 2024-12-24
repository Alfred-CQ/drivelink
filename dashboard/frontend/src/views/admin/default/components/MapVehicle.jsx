import React from "react";
import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";

import Card from "../../../../components/card/Card.jsx";
import "leaflet/dist/leaflet.css";

// Crear íconos personalizados para cada vehículo
const createIcon = (color) =>
  new divIcon({
    html: `<div style="
      background-color: ${color};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 6px rgba(0,0,0,0.3);">
    </div>`,
    className: "custom-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

const MapVehicle = ({ center, vehicles }) => {
  return (
    <Card align="center" direction="column" w="100%" h="100%">
      <Box
        h="100%"
        mt="auto"
        borderRadius="lg"
        overflow="hidden"
        borderWidth="1px"
        shadow="md"
      >
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {vehicles.map((vehicle, vIndex) =>
            vehicle.points.map((point, pIndex) => (
              <Marker
                key={`${vIndex}-${pIndex}`}
                position={{ lat: point.lat, lng: point.lng }}
                icon={createIcon(vehicle.color)}
              >
                <Popup>
                  <strong>Vehículo:</strong> {vehicle.name}
                  <br />
                  <strong>Lat:</strong> {point.lat}, <strong>Lng:</strong>{" "}
                  {point.lng}
                </Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </Box>
    </Card>
  );
};

export default MapVehicle;
