import {
  Box,
  Container,
  Text,
  VStack,
  Input,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "@fontsource/open-sans";
import Head from "next/head";
import axios from "axios";

type Props = {};

const Hero = (props: Props) => {

  const [TeacherID, setTeacherID] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [Session, setSession] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  const [data, setData] = useState<
  Array<{
    day: string;
    end_time: string;
    session_number: number;
    start_time: string;
  }>
>([]);

  const handleSubmit = async () => {

      const response = await axios.put(
        "http://127.0.0.1:5000/api/v1/assign-teacher",
        {
          teacher_id: TeacherID,
          subject_code: SubjectCode,
          session_number: 3
          
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
        <title>Assign Teacher To Class</title>
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
              value={TeacherID}
              onChange={(e) => setTeacherID(e.target.value)}
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
              value={SubjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
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
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                {data.map((session: any) => (
                  <option key={session.id} value={session.id}>
                    {session.day} {session.start_time}-{session.end_time}
                  </option>
                ))}
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
           onClick={handleSubmit}
          // isLoading={isLoading}
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