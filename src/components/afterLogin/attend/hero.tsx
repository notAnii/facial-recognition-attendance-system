import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Container,
  VStack,
  HStack,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import "@fontsource/open-sans";
import Card from "../attend/card";
import Webcam from "react-webcam";
import { WeekContext } from "../../context";
import { useRouter } from "next/router";

type Props = {};

const Hero: React.FC = () => {
  const { weekNumber, setWeekNumber } = useContext(WeekContext);

  const router = useRouter();
  const { subjectCode, sessionNumber, day, startTime, endTime, classType } =
    router.query;
  //here you list down the json titles you want to list for example:
  //Id, title, and userId (should be written exactly like the json file)

  const URL = `http://127.0.0.1:5000/api/v1/live-attendance/${subjectCode}/${sessionNumber}/${weekNumber}`;

  const [is404Error, setIs404Error] = useState(false);

  const [data, setData] = useState<
    Array<{
      student_id: number;
      clock_in: string;
      program: string;
      student_name: string;
    }>
  >([]);

  //make a GET request to the https://jsonplaceholder.typicode.com/posts API endpoint
  //to retrieve a list of posts. (this will allow table to automatically increment rows)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(URL, { withCredentials: true });
      console.log(result.data);
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <Container
      h="100vh"
      display={"flex"}
      maxW={"9xl"}
      justifyContent={"center"}
      backgroundColor="#E5E5E5"
      overflow={"hidden"}
    >
      <VStack spacing={2} align="stretch" paddingTop={7}>
        <Box //Text Here
          h="7vh"
          w="100%"
          borderRadius={40}
        >
          <HStack paddingTop={5} paddingLeft={5}>
            <Text fontFamily={"Open Sans"} fontWeight="bold" paddingRight={594}>
              Recently Marked
            </Text>

            <Text fontFamily={"Open Sans"} fontWeight="bold" paddingLeft={103}>
              Thursday 13:30-15:30
            </Text>
          </HStack>
        </Box>

        <HStack
          paddingLeft={5}
          borderRadius={40}
          paddingRight={5}
          gap={6}
          overflowX={"scroll"}
          w={"100%"}
          maxW={"77rem"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "6px",
              backgroundColor: `rgba(0, 0, 0, 0.10)`,
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "6px",
              backgroundColor: `rgba(0, 0, 0, 0.10)`,
            },
          }}
        >
          <Card />
        </HStack>

        <HStack>
          <Box //Table
            backgroundColor={"white"}
            h="45vh"
            w="100%"
            borderRadius={40}
            border="1px"
            borderColor="black"
          >
            <VStack maxW={"100%"} paddingTop={3}>
              <Box //Title
                h="4vh"
                w="100%"
                textAlign="center"
              >
                <Text fontFamily={"Open Sans"} fontWeight="bold">
                  CSCI203 tutorial attendance list
                </Text>
              </Box>

              <Box //Table
                h="32vh"
                w="100%"
                textAlign="center"
                paddingTop={1}
                overflowY="auto"
                overflowX="auto"
              >
                <TableContainer>
                  <Table size="sm" variant="striped" colorScheme="blackAlpha">
                    <Thead>
                      <Tr //COLUMN NAMES
                      >
                        <Th fontFamily={"Open sans"} color="#4F4747">
                          Student Number
                        </Th>
                        <Th fontFamily={"Open sans"} color="#4F4747">
                          Student Name
                        </Th>
                        <Th fontFamily={"Open sans"} color="#4F4747">
                          Program
                        </Th>
                        <Th fontFamily={"Open sans"} color="#4F4747" isNumeric>
                          Time
                        </Th>
                      </Tr>
                    </Thead>

                    <Tbody //DATA INSIDE THE TABLE (it will auto increment)
                    >
                      {data && Array.isArray(data) ? (
                        data.map((item) => (
                          <Tr key={item.student_id}>
                            <Td>{item.student_id}</Td>
                            <Td>{item.student_name}</Td>
                            <Td>{item.program}</Td>
                            <Td isNumeric>{item.clock_in}</Td>
                          </Tr>
                        ))
                      ) : (
                        <Box display={"flex"} w="100%">
                          <Box
                            justifyContent={"center"}
                            w="100%"
                            alignItems="center"
                            textAlign={"center"}
                          >
                            <Text color="red">No Students</Text>
                          </Box>
                        </Box>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </VStack>
          </Box>

          <Box //Camera
            backgroundColor={"white"}
            h="45vh"
            maxW={"100%"}
            marginTop={13.3}
            borderRadius={10}
            border="1px"
            borderColor="black"
            padding={3}
            paddingTop={5}
          >
            <Webcam width={450} height={450} />
          </Box>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Hero;
