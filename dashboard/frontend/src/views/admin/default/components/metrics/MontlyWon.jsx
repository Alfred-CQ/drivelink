import React, { useState, useEffect } from "react";
import axios from "axios";
import { useColorModeValue, Icon } from "@chakra-ui/react";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";
import { MdCalendarMonth } from "react-icons/md";

const MontlyWon = () => {
  const [MontlyWonValues, setMontlyWon] = useState({
    won_issues: 0,
    delta_issues_count: 0,
  });
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [conversionRate, setConversionRate] = useState(50.0); // Valor inicial
  useEffect(() => {
    axios
      .get("http://localhost:5002/api_dw/montly-won/5/10")
      .then((response) => {
        setMontlyWon({
          won_issues: response.data.recent_won_issues,
          delta_issues_count: response.data.delta_issues_count,
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
            <Icon w="32px" h="32px" as={MdCalendarMonth} color={brandColor} />
          }
        />
      }
      name="Eng Cool Tmp "
      value={`${conversionRate}`}
      growth={MontlyWonValues.delta_issues_count}
    />
  );
};

export default MontlyWon;
