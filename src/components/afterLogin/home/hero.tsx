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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "@fontsource/open-sans";
import Chart from "./chart";
import Card from "./card";
import { Router } from "next/router";
import axios from "axios";

type Props = {};

const Hero = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  const [data, setData] = useState<
    Array<{
      department: string;
      position: string;
      teacher_name: string;
    }>
  >([]);

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      const result = await axios.get(
        "http://127.0.0.1:5000/api/v1/teacher-info",
        {
          withCredentials: true,
        }
      );
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Container
      h="100vh"
      display={"flex"}
      maxW={"7xl"}
      justifyContent={"center"}
    >
      <VStack w="100%">
        <Box //Box Top
          backgroundColor={"white"}
          w="100%"
          maxW="8xl"
          m={1}
          marginTop={10}
          borderRadius={40}
          border="1px"
          borderColor="black"
          overflowY="auto"
          overflowX="auto"
          paddingBottom={5}
          sx={{
            "&::-webkit-scrollbar": {
              backgroundColor: `rgba(0, 0, 0, 0)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0)`,
            },
          }}
        >
          <Stack justifyContent="center" alignItems="center" marginTop={2}>
            <HStack>
              <Box //inside left box
                w="100%"
                maxW="xl"
              >
                <VStack p={10}>
                  <Box //AVATAR
                    display={"flex"}
                    justifyContent="center"
                    paddingTop={4}
                  >
                    <Avatar
                      size={"2xl"}
                      src={"/avatar.jpg"}
                      css={{
                        border: "2px solid white",
                      }}
                    />
                  </Box>

                  <Box //Name and stuff
                    w="100%"
                    display={"flex"}
                    paddingTop={4}
                    overflowY="auto"
                    overflowX="auto"
                    paddingLeft={10}
                  >
                    {data.map((item) => (
                      <Table
                        width={"100%"}
                        maxWidth={"100vh"}
                        variant="unstyled"
                        size={"sm"}
                      >
                        <Thead>
                          <Tr>
                            <Th
                              textAlign="left"
                              fontFamily={"Open Sans"}
                              fontWeight={"bold"}
                              fontSize={"13px"}
                            >
                              Name
                            </Th>

                            <Th
                              textAlign="left"
                              fontFamily={"Open Sans"}
                              fontWeight={"light"}
                            >
                              {item.teacher_name}
                              {window.sessionStorage.setItem(
                                "teacherName",
                                item.teacher_name
                              )}
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Thead>
                              <Td
                                textAlign="left"
                                fontFamily={"Open Sans"}
                                fontWeight={"bold"}
                              >
                                Department
                              </Td>
                            </Thead>
                            <Td
                              textAlign="left"
                              fontFamily={"Open Sans"}
                              fontWeight={"light"}
                            >
                              {item.department}
                              {window.sessionStorage.setItem(
                                "teacherDepartment",
                                item.department
                              )}
                            </Td>
                          </Tr>
                          <Tr>
                            <Td
                              isNumeric
                              textAlign="left"
                              fontFamily={"Open Sans"}
                              fontWeight={"bold"}
                            >
                              Position
                            </Td>
                            <Td
                              textAlign="left"
                              fontFamily={"Open Sans"}
                              fontWeight={"light"}
                            >
                              {item.position}
                              {window.sessionStorage.setItem(
                                "teacherPosition",
                                item.position
                              )}
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    ))}
                  </Box>
                </VStack>
              </Box>

              <VStack>
                <Text
                  fontFamily={"Open Sans"}
                  fontSize="23px"
                  paddingBottom={25}
                  fontWeight="bold"
                  textAlign={"center"}
                >
                  2023 Spring Semester Schedule
                </Text>

                <Chart />
              </VStack>
            </HStack>
          </Stack>
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
          sx={{
            "&::-webkit-scrollbar": {
              backgroundColor: `rgba(0, 0, 0, 0)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0)`,
            },
          }}
        >
          <Text
            paddingLeft={6}
            fontFamily={"Open Sans"}
            fontSize="20px"
            fontWeight="bold"
          >
            Upcoming Classes
          </Text>

          <HStack
            paddingLeft={5}
            gap={5}
            overflowX={"scroll"}
            w={"100%"}
            maxW={"9xl"}
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
        </Box>
      </VStack>
    </Container>
  );
};

export default Hero;
