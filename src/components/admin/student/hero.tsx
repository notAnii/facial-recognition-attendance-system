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

  const [StudentID, setStudentID] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [Session, setSession] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const toast = useToast();

  const [data, setData] = useState<
  Array<{
    day: string;
    end_time: string;
    session_number: number;
    start_time: string;
  }>
>([]);

  const handleSubmit = async () => {

    const selectedOption = document.getElementById("session-select") as HTMLSelectElement;
    const selectedIndex = selectedOption.selectedIndex;
    const selectedSession = data[selectedIndex];


    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/enrol-student",
        {
          student_id: StudentID,
          subject_code: SubjectCode,
          session_number:  selectedSession.session_number, 
          
        },{ withCredentials: true }
      );
      console.log(response.data);

      if (response.status === 201) {
        console.log(response.data);

        toast({
          title: "Successfully Assigned Student To Class",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

    } catch (error: any) {

      if (error && error.response && error.response.status === 409) {
        toast({
          title: "Error",
          description: `Student Already Enrolled`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });

      } else {

        console.error(error);

        if (StudentID === "") {
          toast({
            title: "Error",
            description: "Student ID field is required",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
  
          if (SubjectCode === "") {
            toast({
              title: "Error",
              description: "Subject Code field is required",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            return;
          }
      }
    }

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
        <title>Add Student To Class</title>
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
            Add Student To Class
          </Text>

          <Box paddingLeft={9} paddingTop={8}>

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
                id="session-select"
                border={"2px solid black"}
                borderRadius={"xl"}
                width={"lg"}
                height={"52px"}
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                {data.map((session: any) => (
                  <option key={session.id} value={session.id}>
                    {session.day} {session.start_time}-{session.end_time} ({session.session_number})
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