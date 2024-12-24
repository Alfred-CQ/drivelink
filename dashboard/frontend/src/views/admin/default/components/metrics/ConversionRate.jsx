import React, { useState, useEffect } from "react";
import axios from "axios";
import { useColorModeValue, Icon } from "@chakra-ui/react";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";
import { MdAutoGraph } from "react-icons/md";

const ConversionRate = () => {
  const [conversionData, setConversionData] = useState({
    recentConversionRate: 50,
    deltaConversionRate: 50,
  });

  const [conversionRate, setConversionRate] = useState(50.0);

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  useEffect(() => {
    axios
      .get("http://localhost:5002/api_dw/conversion-rate/5/10")
      .then((response) => {
        console.log(response);
        setConversionData({
          recentConversionRate: response.data.short_term_conversion_rate,
          deltaConversionRate: response.data.time_difference,
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
          icon={<Icon w="32px" h="32px" as={MdAutoGraph} color={brandColor} />}
        />
      }
      name="Fuel rate"
      value={`${conversionRate}`}
      growth={conversionData.deltaConversionRate.toFixed(2)}
      postfix="%"
    />
  );
};

export default ConversionRate;
