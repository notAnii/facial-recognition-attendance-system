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
import { useRouter } from "next/router";

type Props = {};

const Hero = (props: Props) => {
  const router = useRouter();
  const {
    subjectCode,
    sessionNumber,
    day,
    startTime,
    endTime,
    enrolmentID,
    studentID,
  } = router.query;

  const [subjectCodeInput, setSubjectCodeInput] = useState(`${subjectCode}`);
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

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSubjectCodeInput(e.target.value);
  };

  const handleSubmit = async () => {
    const selectedOption = document.getElementById(
      "session-select"
    ) as HTMLSelectElement;
    const selectedIndex = selectedOption.selectedIndex;
    const selectedSession = data[selectedIndex];

    try {
      const response = await axios.put(
        "http://127.0.0.1:5000/api/v1/edit-student",
        {
          enrolment_id: enrolmentID,
          subject_code: subjectCodeInput,
          session_number: selectedSession.session_number,
        },
        { withCredentials: true }
      );
      console.log(response.data);

      if (response.status === 201) {
        console.log(response.data);

        toast({
          title: "Update Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      if (error && error.response && error.response.status === 500) {
        toast({
          title: "Error",
          description: `Invalid Entry`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/v1/subject-sessions/${subjectCodeInput}`,
          { withCredentials: true }
        );
        if (Array.isArray(response.data)) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchSessions();
  }, [subjectCodeInput]);

  return (
    <Container
      h="100vh"
      display={"flex"}
      maxW={"7xl"}
      justifyContent={"center"}
    >
      <Head>
        <title>Edit Student Classes</title>
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
            {`${subjectCode} ${day} ${startTime} - ${endTime}`}
          </Text>

          <Box paddingLeft={9} paddingTop={8}>
            <Text fontFamily={"Open Sans"} fontSize={"20px"}>
              Subject Code
            </Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              width={"lg"}
              onChange={(e) => setSubjectCodeInput(e.target.value)}
              value={subjectCodeInput}
            />

            <Box paddingTop={10}>
              <Text fontFamily={"Open Sans"} fontSize={"20px"}>
                Session
              </Text>
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
              onClick={handleSubmit}
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
