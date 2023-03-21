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
import axios from "axios";
import { status } from "nprogress";

type Props = {};

const Hero = (props: Props) => {

  const [StudentID, setStudentID] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [Week, setWeek] = useState("");
  const [Status, setStatus] = useState("");

  const [Session, setSession] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  const [data, setData] = useState<
  Array<{
    student_id: string;
    subject_code: string;
    session_number: string;
    week: string;
    status: string;
  }>
>([]);

  const handleSubmit = async () => {

    const selectedOption = document.getElementById("session-select") as HTMLSelectElement;
    const selectedIndex = selectedOption.selectedIndex;
    const selectedSession = data[selectedIndex];

      const response = await axios.put(
        "http://127.0.0.1:5000/api/v1/update-attendance",
        {
          student_id: StudentID, //Working
          subject_code: SubjectCode, //Working
          session_number:  selectedSession.session_number, //Not 
          week: Week, //Working
          status: Status //Working
          
        },{ withCredentials: true }
      );
      console.log(response.data);
        

  };

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/v1/subject-sessions/${SubjectCode}`, { withCredentials: true });
        if (Array.isArray(response.data)) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSessions();
  }, [SubjectCode]);

  return (
    <Container
      h="100vh"
      display={"flex"}
      maxW={"7xl"}
      justifyContent={"center"}
    >
      <Head>
        <title>Edit Student Attendance</title>
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
            Edit Student Attendance
          </Text>

          <Box paddingLeft={9} paddingTop={5}>

          <Box>
            <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Student ID</Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              width={"lg"}
              value={StudentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
          </Box>
          <Box paddingTop={3}>
          <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Subject Code</Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              width={"lg"}
              value={SubjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </Box>
          <Box paddingTop={3}>
          <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Session</Text>
            <Select
                id="session-select"
                border={"2px solid black"}
                borderRadius={"xl"}
                width={"lg"}
                height={"52px"}
              >
                {data.map((session: any) => (
                  <option key={session.id} value={session.id}>
                    {session.day} {session.start_time}-{session.end_time} ({session.session_number})
                  </option>
                ))}
              </Select>
          </Box>

          <Box paddingTop={3}>
          <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Week</Text>
            <Select
            border={"2px solid black"}
            borderRadius={"xl"}
            width={"lg"}
            height={"52px"}
            value={Week}
            onChange={(e) => setWeek(e.target.value)}
          >
            <option value="0">Choose an option</option>
            <option value="1">Week 1</option>
            <option value="2">Week 2</option>
            <option value="3">Week 3</option>
            <option value="4">Week 4</option>
            <option value="5">Week 5</option>
            <option value="6">Week 6</option>
            <option value="7">Week 7</option>
            <option value="8">Week 8</option>
            <option value="9">Week 9</option>
            <option value="10">Week 10</option>
           
          </Select>
          </Box>

          <Box paddingTop={3}>
          <Text
            fontFamily={"Open Sans"}
            fontSize={"20px"}
            >Status</Text>
            <Select
            border={"2px solid black"}
            borderRadius={"xl"}
            width={"lg"}
            height={"52px"}
            value={Status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="0">Choose an option</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Excused">Excused</option>
          </Select>
          </Box>
          </Box>
          <Box paddingLeft={"80%"} paddingBottom={"4%"}>
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
           onClick={handleSubmit}
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