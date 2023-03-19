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
import React, { useContext, useEffect, useState } from "react";
import "@fontsource/open-sans";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { BsFilterLeft } from "react-icons/bs";
import { WeekContext } from "../../context";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

type Props = {};

const Hero = (props: Props) => {
  const { weekNumber, setWeekNumber } = useContext(WeekContext);
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState<
    Array<{
      class_type: string;
      day: string;
      end_time: string;
      room: string;
      start_time: string;
      subject_code: string;
      subject_name: string;
      session_number: number;
    }>
  >([]);

  const [teacherData, setTeacherData] = useState<
    Array<{
      department: string;
      position: string;
      teacher_name: string;
    }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://127.0.0.1:5000/api/v1/teacher-classes/123", {
        withCredentials: true,
      });
      setData(result.data);
    };

    const fetchTeacherData = async () => {
      const result = await axios.get(
        "http://127.0.0.1:5000/api/v1/teacher-info",
        {
          withCredentials: true,
        }
      );
      setTeacherData(result.data);
    };

    fetchTeacherData();
    fetchData();
  }, [weekNumber]);

  const filteredData = data.filter((item) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const subject_codeLower = item.subject_code.toString().toLowerCase();
    const dayLower = item.day.toString().toLowerCase();

    // Filter out items that match the search query exactly
    if (subject_codeLower === searchQueryLower) {
      return true;
    }

    if (dayLower === searchQueryLower) {
      return true;
    }
    // Filter out items that start with the search query
    if (subject_codeLower.startsWith(searchQueryLower)) {
      return true;
    }

    if (dayLower.startsWith(searchQueryLower)) {
      return true;
    }

    // Filter out items that don't match the search query
    return item.subject_name.toLowerCase().startsWith(searchQueryLower);
  });

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };



  return (
    <Container
      h="100vh"
      display={"flex"}
      maxW={"7xl"}
      justifyContent={"center"}
    >
      <Head>
        <title>Edit Teacher Classes</title>
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
          paddingBottom={3}
        >
          <Text
            paddingLeft={9}
            fontFamily={"Open Sans"}
            fontSize={"27px"}
            fontWeight="bold"
          >
            Edit Teacher Classes
          </Text>

          <Box paddingLeft={9} paddingTop={8}>
            <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Teacher ID</Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              width={"lg"}
              onChange={handleSearch}
              value={searchQuery}
            />
          <Button
           fontSize={"lg"}
           borderRadius={14}
           variant={"ghost"}
           bgColor={"#818589"}
           color="white"
           marginLeft={30}
           w="40"
           _hover={{
           bgColor: "white",
           color: "#818589",
           }}
           >
            Search
           </Button>

           <Box //Box Bottom
          backgroundColor={"#F0F0F0"}
          w="100%"
          maxW="5xl"
          m={1}
          borderRadius={40}
          border="1px"
          borderColor="black"
          overflowY="auto"
          overflowX="auto"
          paddingTop={3}
          marginTop={5}
        >
          <Box //Box that holds the table
          h="sm"
          borderRadius={10}
          overflowY="auto"
          overflowX="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.10)`,
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.10)`,
            },
          }}
        >
          <Box
            paddingLeft="2%"
            h="10%"
            display="flex"
            position="sticky"
            top={0}
            bg="#ECECEC"
            zIndex={1}
          >
            <Box w="15%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Subject Code</Text>
            </Box>
            <Box w="15%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Subject Name</Text>
            </Box>
            <Box w="15%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Day</Text>
            </Box>
            <Box w="15%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Start Time</Text>
            </Box>
            <Box w="15%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>End Time</Text>
            </Box>
            <Box w="13%" display="flex" alignItems="center" />
            <Box w="13%" display="flex" alignItems="center" />
          </Box>

          <>
            {filteredData.map((item) => (
              <Box paddingLeft="2%" h="13%" display="flex">
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.subject_code}</Text>
                </Box>
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.subject_name}</Text>
                </Box>
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.day}</Text>
                </Box>
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.start_time}</Text>
                </Box>
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.end_time}</Text>
                </Box>
                <Box
                  w="13%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Link
                    href={{
                      pathname: "/admin/edit2",
                      query: {
                        subjectCode: item.subject_code,
                        sessionNumber: item.session_number,
                        day: item.day,
                        startTime: item.start_time,
                        endTime: item.end_time,
                        classType: item.class_type,
                      },
                    }}
                  >
                    <Button
                       paddingLeft={6}
                       paddingRight={6}
                      fontSize={"sm"}
                      rounded={"full"}
                      variant={"ghost"}
                      bgColor={"#818589"}
                      color="white"
                      _hover={{
                        bgColor: "white",
                        color: "#818589",
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                </Box>
                <Box
                  w="13%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Link
                    href={{
                      pathname: "/afterLogin/attend",
                      query: {
                        subjectCode: item.subject_code,
                        sessionNumber: item.session_number,
                        day: item.day,
                        startTime: item.start_time,
                        endTime: item.end_time,
                        classType: item.class_type,
                      },
                    }}
                  >
                    <Button
                      paddingLeft={6}
                      paddingRight={6}
                      fontSize={"sm"}
                      rounded={"full"}
                      variant={"ghost"}
                      bgColor={"#818589"}
                      color="white"
                      _hover={{
                        bgColor: "white",
                        color: "#818589",
                      }}
                    >
                      Delete
                    </Button>
                  </Link>
                </Box>
              </Box>
            ))}
          </>
        </Box>
        </Box>

          </Box>
          
        </Box>
      </VStack>
    </Container>
  );
};

export default Hero;