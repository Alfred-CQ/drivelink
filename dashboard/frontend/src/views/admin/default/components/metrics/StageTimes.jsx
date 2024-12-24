import React, { useState, useEffect } from "react";
import axios from "axios";
import { useColorModeValue, Icon } from "@chakra-ui/react";
import MiniStatistics from "../../../../../components/card/MiniStatistics";
import IconBox from "../../../../../components/icons/IconBox";

const StageTime = ({ name, icon, stage }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/avg-stage-time/${stage}`
        );
        setValue(response.data.avg_time);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [stage]);

  return (
    <MiniStatistics
      startContent={
        <IconBox
          w="56px"
          h="56px"
          bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
          icon={<Icon w="28px" h="28px" as={icon} color="white" />}
        />
      }
      name={name}
      value={value !== null ? value : "Loading..."}
    />
  );
};

export default StageTime;
