import {
  Box,
  Container,
  Text,
  Stack,
  VStack,
  Avatar,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Center,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "@fontsource/open-sans";
import Head from "next/head";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {

  return (
    <Container
      h="100vh"
      display={"flex"}
      maxW={"7xl"}
      justifyContent={"center"}
    >
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>
      
      <VStack w="100%">
      <Box //Box Bottom
          backgroundColor={"white"}
          w="100%"
          maxW="8xl"
          m={1}
          borderRadius={40}
          border="1px"
          borderColor="black"
          overflowY="auto"
          overflowX="auto"
          paddingTop={3}
          marginTop={5}
        >
          <Text
            paddingLeft={10}
            fontFamily={"Open Sans"}
            fontSize={"27px"}
            fontWeight="bold"
          >
            Assign Teacher To Class
          </Text>

          <Box paddingLeft={9} paddingTop={8}>

          <Box>
            <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Teacher ID</Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              width={"lg"}
            />
          </Box>
          <Box paddingTop={10}>
          <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Subject Code</Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              width={"lg"}
            />
          </Box>
          <Box paddingTop={10}>
          <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Session</Text>
            <Select
            border={"2px solid black"}
            borderRadius={"xl"}
            width={"lg"}
            height={"52px"}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </Box>
          </Box>
          <Box paddingLeft={"80%"} paddingTop={"10%"} paddingBottom={"4%"}>
          <Button
           fontSize={"lg"}
           borderRadius={14}
           variant={"ghost"}
           bgColor={"#818589"}
           color="white"
           w="40"
           _hover={{
           bgColor: "white",
           color: "#818589",
           }}
           >
           Submit
           </Button>
           </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default Hero;