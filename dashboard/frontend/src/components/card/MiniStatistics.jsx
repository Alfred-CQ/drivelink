// Custom icons
import React from "react";

// Chakra imports

import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

// Custom components
import Card from "./Card.jsx";

export default function Default(props) {
  const { startContent, endContent, name, growth, value, postfix } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  const growthColor = growth && growth < 0 ? "red.500" : "green.500";
  const growthIndicator = growth && growth < 0 ? "" : "+";

  return (
    <Card py="15px">
      <Flex
        my="auto"
        h="100%"
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}
      >
        {startContent}

        <Stat my="auto" ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight="100%"
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}
          >
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "2xl",
            }}
          >
            {value}
          </StatNumber>
          {growth ? (
            <Flex align="center">
              <Text color={growthColor} fontSize="xs" fontWeight="700" me="5px">
                {growthIndicator}
                {growth}
                {postfix}
              </Text>
              <Text color={textColorSecondary} fontSize="xs" fontWeight="400">
                since last month
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms="auto" w="max-content">
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
