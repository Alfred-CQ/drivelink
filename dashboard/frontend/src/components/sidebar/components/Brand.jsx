import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Icon } from "@chakra-ui/react";
import { FaTruck } from "react-icons/fa";

// Custom components
import { HorizonLogo } from "../../icons/Icons";
import { HSeparator } from "../../separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      <Icon as={FaTruck} h="40px" w="40px" my="32px" color={logoColor} />
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
