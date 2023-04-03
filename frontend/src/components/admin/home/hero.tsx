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
            paddingLeft={6}
            fontFamily={"Open Sans"}
            fontSize={"27px"}
            fontWeight="bold"
          >
            Teacher
          </Text>

          <HStack
            paddingLeft={5}
            gap={10}
            overflowX={"scroll"}
            w={"100%"}
            maxW={"9xl"}
          >

           <Link //LINK 
          href="/admin/teacher"
          style={{ textDecoration: "none" }}
        > 
            <Center
            //FIRST BOX
            py={3}>
          <Box
            w={"270px"}
            h={"200px"}
            bg={"#333333"}
            boxShadow={"2xl"}
            borderRadius={30}
            overflow={"hidden"}
            paddingLeft={3}
          >
            <Box>
            <Stack spacing={0} align={"center"} mb={1} paddingTop={65}>
              <Heading
                fontSize={"25px"}
                fontWeight={550}
                fontFamily={"Open Sans"}
                color="white"
                textAlign="center"
              >
                Assign Teacher<br />To Class
              </Heading>
            </Stack>
          </Box>
          </Box>
        </Center>
        </Link>
        
        <Link //LINK 
          href="/admin/teacher2"
          style={{ textDecoration: "none" }}
        > 
        <Center 
        //SECOND BOX
        py={3}>
          <Box
            w={"270px"}
            h={"200px"}
            bg={"#333333"}
            boxShadow={"2xl"}
            borderRadius={30}
            overflow={"hidden"}
            paddingLeft={3}
          >
             <Box>
            <Stack spacing={0} align={"center"} mb={1} paddingTop={65}>
              <Heading
                fontSize={"25px"}
                fontWeight={550}
                fontFamily={"Open Sans"}
                color="white"
                textAlign="center"
              >
              Edit Teacher<br />Classes
            </Heading>
          </Stack>

            </Box>
          </Box>
        </Center>
        </Link>

          </HStack>
        </Box>

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
        >
          <Text
            paddingLeft={6}
            fontFamily={"Open Sans"}
            fontSize={"27px"}
            fontWeight="bold"
          >
            Student
          </Text>

          <HStack
            paddingLeft={5}
            gap={10}
            overflowX={"scroll"}
            w={"100%"}
            maxW={"9xl"}
          >
             <Link //LINK
          href="/admin/student"
          style={{ textDecoration: "none" }}
        > 
            <Center
            //FIRST BOX
            py={3}>
          <Box
            w={"270px"}
            h={"200px"}
            bg={"#333333"}
            boxShadow={"2xl"}
            borderRadius={30}
            overflow={"hidden"}
            paddingLeft={3}
          >
             <Box>
            <Stack spacing={0} align={"center"} mb={1} paddingTop={65}>
              <Heading
                fontSize={"25px"}
                fontWeight={550}
                fontFamily={"Open Sans"}
                color="white"
                textAlign="center"
              >
              Add Student<br />To Class
            </Heading>
          </Stack>

            </Box>
          </Box>
        </Center>
        </Link>

        <Link //LINK
          href="/admin/student2"
          style={{ textDecoration: "none" }}
        > 
        <Center
            //SECOND BOX
            py={3}>
          <Box
            w={"270px"}
            h={"200px"}
            bg={"#333333"}
            boxShadow={"2xl"}
            borderRadius={30}
            overflow={"hidden"}
            paddingLeft={3}
          >
             <Box>
            <Stack spacing={0} align={"center"} mb={1} paddingTop={65}>
              <Heading
                fontSize={"25px"}
                fontWeight={550}
                fontFamily={"Open Sans"}
                color="white"
                textAlign="center"
              >
              Edit Student<br />Classes
            </Heading>
          </Stack>

            </Box>
          </Box>
        </Center>
        </Link>

        <Link //LINK
          href="/admin/student3"
          style={{ textDecoration: "none" }}
        > 
        <Center
            //THIRD BOX
            py={3}>
          <Box
            w={"270px"}
            h={"200px"}
            bg={"#333333"}
            boxShadow={"2xl"}
            borderRadius={30}
            overflow={"hidden"}
            paddingLeft={3}
          >
             <Box>
            <Stack spacing={0} align={"center"} mb={1} paddingTop={65}>
              <Heading
                fontSize={"25px"}
                fontWeight={550}
                fontFamily={"Open Sans"}
                color="white"
                textAlign="center"
              >
              Edit Student<br />Attendance
            </Heading>
          </Stack>

            </Box>
          </Box>
        </Center>
        </Link>

          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Hero;