import {
  Box,
  Container,
  Text,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import "@fontsource/open-sans";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

type Props = {};

const Hero = (props: Props) => {
  const [studentID, setStudentID] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [flag, setFlag] = useState(false);
  const toast = useToast();

  const [data, setData] = useState<
    Array<{
      day: string;
      end_time: string;
      enrolment_id: number;
      session_number: number;
      start_time: string;
      subject_code: string;
      subject_name: string;
    }>
  >([]);

  useEffect(() => {
    if (flag) {
      const fetchData = async () => {
        const result = await axios.get(
          `http://127.0.0.1:5000/api/v1/student-classes/${studentID}`,
          {
            withCredentials: true,
          }
        );
        setData(result.status == 200 ? result.data : []);
      };

      fetchData();
    }
  }, [isActive]);

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStudentID(e.target.value);
  };

  const handleClick = () => {
    setIsActive(!isActive);
    setFlag(true);
  };

  const handleDelete = async (enrolmentID: number) => {
    const response = await axios.delete(
      `http://127.0.0.1:5000/api/v1/unenrol-student/${enrolmentID}`,
      { withCredentials: true }
    );

    if (response.status === 200) {
      console.log(response.data);

      toast({
        title: "Successfully Deleted Class",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsActive(!isActive);
  };

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
          paddingBottom={3}
        >
          <Text
            paddingLeft={9}
            fontFamily={"Open Sans"}
            fontSize={"27px"}
            fontWeight="bold"
          >
            Edit Student Classes
          </Text>

          <Box paddingLeft={9} paddingTop={8}>
            <Text fontFamily={"Open Sans"} fontSize={"20px"}>
              Student ID
            </Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              width={"lg"}
              onChange={handleSearch}
              value={studentID}
            />
            <Button
              fontSize={"lg"}
              borderRadius={14}
              variant={"ghost"}
              bgColor={"#818589"}
              color="white"
              marginLeft={30}
              w="40"
              onClick={handleClick}
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
                  {data.map((item) => (
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
                            pathname: "/admin/edit",
                            query: {
                              subjectCode: item.subject_code,
                              sessionNumber: item.session_number,
                              day: item.day,
                              startTime: item.start_time,
                              endTime: item.end_time,
                              enrolmentID: item.enrolment_id,
                              studentID: studentID,
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
                        <Button
                          paddingLeft={6}
                          paddingRight={6}
                          fontSize={"sm"}
                          rounded={"full"}
                          variant={"ghost"}
                          bgColor={"#818589"}
                          color="white"
                          onClick={() => handleDelete(item.enrolment_id)}
                          _hover={{
                            bgColor: "white",
                            color: "#818589",
                          }}
                        >
                          Delete
                        </Button>
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
