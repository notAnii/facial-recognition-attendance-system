import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  Spacer,
  IconButton,
  Input,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Button,
  Portal,
  PopoverContent,
  RadioGroup,
  Stack,
  Radio,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { BsFilterLeft } from "react-icons/bs";
import { WeekContext } from "../../context";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPageContext } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  console.log(query);
  return { props: { query } };
};

type Props = {};

const Hero = (props: any) => {
  const router = useRouter();
  const { subjectCode, sessionNumber, day, startTime, endTime, classType } =
    router.query;

  useEffect(() => {
    console.log(props.query);
  }, []);

  const [testState, setTestState] = useState({});

  const { weekNumber, setWeekNumber } = useContext(WeekContext);

  const [checkedItems, setCheckedItems] = React.useState([false, false, false]);

  const allChecked = checkedItems.every(Boolean);

  const URL = `http://127.0.0.1:5000/api/v2/attendance/${subjectCode}/${sessionNumber}/${weekNumber}`;

  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState<
    Array<{
      student_id: number;
      student_name: string;
      week: string;
      date: string;
      attedance_percentage: string;
      status: string;
      unexcused_absences: string;
    }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(URL, { withCredentials: true });
      setData(result.status == 200 ? result.data : []);
    };

    fetchData();
  }, [weekNumber]);

  const filteredData = data.filter((item) => {
    const searchQueryLower = searchQuery.toLowerCase();
    const studentIdLower = item.student_id.toString().toLowerCase();

    if (studentIdLower === searchQueryLower) {
      return true;
    }

    if (studentIdLower.startsWith(searchQueryLower)) {
      return true;
    }

    return item.student_name.toLowerCase().startsWith(searchQueryLower);
  });

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box //Whole page box excluding the tast bar
      h="100vh"
      bg="white"
    >
      <Head>
        <title>View Attendance Page</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <Box //Top of page space
        h="5%"
        display="flex"
        alignItems="right"
      ></Box>
      <Box //Whole box that has subject name, time, table, and weeeks at the bottom
        h="85%"
        m={5}
        bg="#ECECEC"
        borderRadius={30}
        border={"1px"}
        borderColor={"Black"}
      >
        <Box //Top part that has subject name and time
          h="15%"
          display="flex"
          alignItems="center"
          paddingLeft="2%"
          borderRadius={10}
        >
          <Box //Box that has the Subject code and name
            w="30%"
            h="100%"
            display="flex"
            alignItems="center"
            borderRadius={10}
          >
            <Text fontSize="2xl">{`${subjectCode} ${classType} Attendance List`}</Text>
          </Box>
          <Box display="flex" alignItems="center" width="40%">
            <Input
              placeholder="Search"
              size="sm"
              variant="filled"
              bg="#F0F0F0"
              borderRadius={30}
              border={"1px"}
              borderColor={"Black"}
              onChange={handleSearch}
              value={searchQuery}
            />
          </Box>
          <Box //Box that has filter button
            w="4%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Popover placement="bottom">
              <PopoverTrigger>
                <IconButton
                  aria-label="Filter"
                  color="black"
                  size="sm"
                  icon={<BsFilterLeft />}
                  px={4}
                  fontSize="25px"
                  variant={"ghost"}
                  borderRadius={13}
                  _hover={{
                    bgColor: "#ECECEC",
                    color: "#818589",
                  }}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverHeader border="0">Filter By:</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <CheckboxGroup>
                      <Stack direction="column" mt={2}>
                        <Checkbox
                          isChecked={checkedItems[0]}
                          onChange={(e) => {
                            const index = 0;
                            setCheckedItems([
                              e.target.checked,
                              !e.target.checked && checkedItems[1], // Uncheck Absent checkbox
                              !e.target.checked && checkedItems[2], // Uncheck Excused checkbox
                            ]);
                          }}
                        >
                          Present
                        </Checkbox>
                        <Checkbox
                          isChecked={checkedItems[1]}
                          onChange={(e) => {
                            const index = 1;
                            setCheckedItems([
                              !e.target.checked && checkedItems[0], // Uncheck Present checkbox
                              e.target.checked,
                              !e.target.checked && checkedItems[2], // Uncheck Excused checkbox
                            ]);
                          }}
                        >
                          Absent
                        </Checkbox>
                        <Checkbox
                          isChecked={checkedItems[2]}
                          onChange={(e) => {
                            const index = 2;
                            setCheckedItems([
                              !e.target.checked && checkedItems[0], // Uncheck Present checkbox
                              !e.target.checked && checkedItems[1], // Uncheck Absent checkbox
                              e.target.checked,
                            ]);
                          }}
                        >
                          Excused
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Box>

          <Spacer />
          <Box //Box that has day and time
            w="30%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={10}
          >
            <Text fontSize="2xl">{`${day} ${startTime} - ${endTime}`}</Text>
          </Box>
        </Box>
        <Box //Box that holds the table
          h="77%"
          w="100%"
          maxHeight="100%"
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
            <Box w="10%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Student ID</Text>
            </Box>
            <Box w="13%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Student Name</Text>
            </Box>
            <Box w="7%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Week</Text>
            </Box>
            <Box w="8%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Date</Text>
            </Box>
            <Box w="15%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Attendance %</Text>
            </Box>
            <Box w="15%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Attendance Status</Text>
            </Box>
            <Box w="15%" display="flex" alignItems="center">
              <Text fontWeight={"bold"}>Unexcused Absences</Text>
            </Box>
          </Box>

          {filteredData
            .filter((item) => {
              // Filter based on checkbox state
              if (checkedItems[0]) {
                return item.status.toLowerCase() === "present";
              }

              if (checkedItems[1]) {
                return item.status.toLowerCase() === "absent";
              }

              if (checkedItems[2]) {
                return item.status.toLowerCase() === "excused";
              } else {
                return true;
              }
            })
            .map((item) => (
              <Box paddingLeft="2%" h="13%" display="flex">
                <Box w="10%" display="flex" alignItems="center">
                  <Text>{item.student_id}</Text>
                </Box>
                <Box w="13%" display="flex" alignItems="center">
                  <Text>{item.student_name}</Text>
                </Box>
                <Box w="7%" display="flex" alignItems="center">
                  <Text>{item.week}</Text>
                </Box>
                <Box w="8%" display="flex" alignItems="center">
                  <Text>{item.date}</Text>
                </Box>
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.attedance_percentage + "%"}</Text>
                </Box>
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.status}</Text>
                </Box>
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.unexcused_absences}</Text>
                </Box>
              </Box>
            ))}
        </Box>
        <Box //Box under the table that has the weeks
          h="8%"
          w="15%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingBottom={1}
        >
          <IconButton
            aria-label="Go To Previous Week"
            backgroundColor="#818589"
            color="white"
            size="sm"
            icon={<ArrowBackIcon />}
            fontSize={"sm"}
            variant={"ghost"}
            bgColor={"#818589"}
            borderRadius={13}
            onClick={() => {
              if (weekNumber > 1) setWeekNumber(weekNumber - 1);
            }}
            _hover={{
              bgColor: "#ECECEC",
              color: "#818589",
            }}
          />
          <>{`Week ${weekNumber}`}</>
          <IconButton
            aria-label="Go To Next Week"
            backgroundColor="#818589"
            color="white"
            size="sm"
            icon={<ArrowForwardIcon />}
            fontSize={"sm"}
            variant={"ghost"}
            bgColor={"#818589"}
            borderRadius={13}
            onClick={() => {
              if (weekNumber < 10) setWeekNumber(weekNumber + 1);
            }}
            _hover={{
              bgColor: "#ECECEC",
              color: "#818589",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
