import React, { useState, useEffect } from "react";
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import {
  MdHandshake,
  MdOutlineAnalytics,
  MdChecklistRtl,
  MdAttachMoney,
  MdBarChart,
  MdCoPresent,
  MdBusinessCenter,
  MdOutlineWineBar,
} from "react-icons/md";
import axios from "axios";
import ComplexTable from "./components/ComplexTable";
import DailyTraffic from "./components/DailyTraffic";
import WeeklyRevenue from "./components/WeeklyRevenue";
import { columnsDataComplex } from "./variables/columnsData";
import MapVehicle from "./components/MapVehicle";

import { opportunityOwners } from "../../../variables/OpportunityOwners";

import ConversionRate from "./components/metrics/ConversionRate";
import SalesCycle from "./components/metrics/SalesCycle";
import LtvAverage from "./components/metrics/LtvAverage";

import CurrentPipelineValue from "./components/metrics/CurrentPipelineValue";
import CurrentPipelineSize from "./components/metrics/CurrentPipelineSize";
import MontlyWon from "./components/metrics/MontlyWon";
import StageTimes from "./components/metrics/StageTimes";

const MainDashboard = () => {
  const [tableDataComplex, setTableDataComplex] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(opportunityOwners[0].name);

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [center] = useState({ lat: -15.15514, lng: -75.060448 });

  const vehicles = [];

  useEffect(() => {
    if (selectedOwner) {
      axios
        .get(`http://localhost:5002/api_dw/next-actions/${selectedOwner}`)
        .then((response) => {
          setTableDataComplex(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the issues!", error);
          console.log(response.data);
        });
    }
  }, [selectedOwner]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction="column" h="100vh">
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4, "2xl": 6 }}
          gap="20px"
          mb="20px"
        >
          <ConversionRate />
          <SalesCycle />
          <LtvAverage />

          <MontlyWon />
          <CurrentPipelineValue />
          <CurrentPipelineSize />
        </SimpleGrid>

        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <DailyTraffic />
        <WeeklyRevenue />
      </SimpleGrid> */}

        <SimpleGrid
          columns={{ base: 1, md: 1, xl: 1 }}
          gap="20px"
          mb="20px"
          flex="1"
        >
          <MapVehicle center={center} vehicles={vehicles} />
        </SimpleGrid>
        {/* <ComplexTable
        columnsData={columnsDataComplex}
        tableData={tableDataComplex}
        tableName="Acciones Pendientes"
        onSelectOwner={(ownerName) => setSelectedOwner(ownerName)}
      /> */}
      </Flex>
    </Box>
  );
};

export default MainDashboard;
