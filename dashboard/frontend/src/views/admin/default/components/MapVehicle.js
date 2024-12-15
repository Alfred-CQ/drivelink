import React from 'react';
import { Box, Text, Button, useColorModeValue, Flex } from '@chakra-ui/react'; // Chakra UI para estilos
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';

import Card from 'components/card/Card.js';
import { MdBarChart } from 'react-icons/md';
import 'leaflet/dist/leaflet.css';

// Ícono personalizado
const customIcon = new divIcon({
  html: `<div style="
      background-color: #4A90E2;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 6px rgba(0,0,0,0.3);">
    </div>`,
  className: 'custom-marker',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});
// Componente del mapa
const MapVehicle = ({ center, points }) => {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' },
  );
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' },
  );

  return (
    <Card align="center" direction="column" w="100%">
      {' '}
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
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {points.map((point, index) => (
            <Marker key={index} position={point} icon={customIcon}>
              <Popup>
                <strong>Lat:</strong> {point.lat}, <strong>Lng:</strong>{' '}
                {point.lng}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Card>
  );
};

export default MapVehicle;
