import { useState } from "react";

import { Box, Container, useColorMode } from "@chakra-ui/react";

import Links from "./links";
import HamburgerMenu from "./hamburgerMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      as="nav"
      display="flex"
      flexDir={{ base: "row-reverse", lg: "row" }}
      alignItems="center"
    >
      <Container maxW={"7xl"}>
        <HamburgerMenu toggled={isOpen} toggle={setIsOpen} />
        <Box
          as="ul"
          fontWeight="600"
          bg={{ base: "telegram.700", lg: "transparent" }}
          display={{
            base: isOpen ? "block" : "none",
            lg: "flex",
          }}
          position={{ base: "absolute", lg: "static" }}
          top="5rem"
          left="5%"
          right="5%"
          rounded={{ base: "lg", lg: "none" }}
          py={{ base: "2", lg: "0" }}
          px={{ base: "4", lg: "0" }}
          alignItems={{ lg: "center" }}
          boxShadow={{ base: "xl", lg: "none" }}
          zIndex="2"
        >
          <Links onClick={() => setIsOpen(false)} />
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
