import React, { useContext, useEffect, useState } from "react";
import { Box, Text, IconButton, Input, Button } from "@chakra-ui/react";
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
      const result = await axios.get("http://127.0.0.1:5000/api/v1/classes", {
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
    <Box //Whole page box excluding the tast bar
      h="100vh"
      bg="white"
    >
      <Head>
        <title>Classes</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>
      
      <Box //Top of page space
        h="5%"
        display="flex"
        alignItems="right"
      ></Box>
      <Box //box that holds teachers name, filter button, classes list, and weeks
        h="85%"
        m={5}
        bg="#ECECEC"
        borderRadius={30}
        border={"1px"}
        borderColor={"Black"}
      >
        <Box //top bar of the box with the teachers name and filter button
          h="12%"
          display="flex"
          alignItems="center"
          borderRadius={10}
        >
          <Box //Box thhat has the teachers name
            w="25%"
            h="100%"
            display="flex"
            alignItems="center"
            borderRadius={10}
            paddingLeft="2%"
          >
            {teacherData.map((item) => (
              <Text fontSize="2xl">{item.teacher_name}</Text>
            ))}
          </Box>
          <Box //Box that has the filter button
            w="50%"
            h="100%"
            display="flex"
            alignItems="center"
            marginLeft={"1%"}
            borderRadius={10}
          >
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
        </Box>
        <Box //Box that holds the table
          h="76%"
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
              <Text>Subject Code</Text>
            </Box>
            <Box w="15%" display="flex" alignItems="center">
              <Text>Subject Name</Text>
            </Box>
            <Box w="9%" display="flex" alignItems="center">
              <Text>Day</Text>
            </Box>
            <Box w="8%" display="flex" alignItems="center">
              <Text>Start Time</Text>
            </Box>
            <Box w="8%" display="flex" alignItems="center">
              <Text>End Time</Text>
            </Box>
            <Box w="5%" display="flex" alignItems="center">
              <Text>Room</Text>
            </Box>
            <Box w="10%" display="flex" alignItems="center">
              <Text>Class Type</Text>
            </Box>
            <Box w="13%" display="flex" alignItems="center" />
            <Box w="13%" display="flex" alignItems="center" />
          </Box>

          <>
            {filteredData.map((item) => (
              <Box paddingLeft="2%" h="13%" display="flex">
                <Box w="10%" display="flex" alignItems="center">
                  <Text>{item.subject_code}</Text>
                </Box>
                <Box w="15%" display="flex" alignItems="center">
                  <Text>{item.subject_name}</Text>
                </Box>
                <Box w="9%" display="flex" alignItems="center">
                  <Text>{item.day}</Text>
                </Box>
                <Box w="8%" display="flex" alignItems="center">
                  <Text>{item.start_time}</Text>
                </Box>
                <Box w="8%" display="flex" alignItems="center">
                  <Text>{item.end_time}</Text>
                </Box>
                <Box w="5%" display="flex" alignItems="center">
                  <Text>{item.room}</Text>
                </Box>
                <Box w="10%" display="flex" alignItems="center">
                  <Text>{item.class_type}</Text>
                </Box>
                <Box
                  w="13%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Link
                    href={{
                      pathname: "/afterLogin/viewAttendance",
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
                      View Attendance
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
                      Start Attendance
                    </Button>
                  </Link>
                </Box>
              </Box>
            ))}
          </>
        </Box>
        <Box //Box under the table that has the weeks
          h="12%"
          w="14%"
          display="flex"
          alignItems="center"
          justifyContent="center"
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
