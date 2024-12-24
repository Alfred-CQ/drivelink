import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, SimpleGrid, useColorModeValue, Icon } from "@chakra-ui/react";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";
import { MdAttachMoney } from "react-icons/md";

const CurrentPipelineValue = () => {
  const [pipelineValue, setPipelineValue] = useState({
    setup_price_sum: 0,
    delta: 0,
  });
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [conversionRate, setConversionRate] = useState(50.0); // Valor inicial
  useEffect(() => {
    axios
      .get("http://localhost:5000/current-pipeline-value")
      .then((response) => {
        setPipelineValue({
          setup_price_sum: Number(response.data.setup_price_sum_4),
          delta: Number(response.data.delta),
        });
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the conversion rate data!",
          error
        );
      });
  }, []);

  return (
    <MiniStatistics
      startContent={
        <IconBox
          w="56px"
          h="56px"
          bg={boxBg}
          icon={
            <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
          }
        />
      }
      name="Payload"
      value={`${conversionRate}`}
      growth={pipelineValue.delta.toFixed(2)}
    />
  );
};

export default CurrentPipelineValue;
