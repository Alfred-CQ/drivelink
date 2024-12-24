import React, { useState, useEffect } from "react";
import axios from "axios";
import { useColorModeValue, Icon } from "@chakra-ui/react";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";
import { MdAttachMoney } from "react-icons/md";

const LtvAverage = () => {
  const [conversionData, setConversionData] = useState({
    short_term: 0,
    time_difference: 0,
  });
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [conversionRate, setConversionRate] = useState(50.0); // Valor inicial
  useEffect(() => {
    axios
      .get("http://localhost:5002/api_dw/ltv-avg/5/10")
      .then((response) => {
        console.log(response);
        setConversionData({
          short_term: response.data.short_term,
          time_difference: response.data.time_difference,
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
      name="Eng Oil Press (Kpa) "
      value={`${conversionRate}`}
      growth={conversionData.time_difference + "%"}
    />
  );
};

export default LtvAverage;
