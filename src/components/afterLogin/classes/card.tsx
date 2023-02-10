import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [data, setData] = useState<Array<{ 
    class_type: string; 
    day: string; 
    end_time: string;
    room: string;
    start_time: string;
    subject_code: string;
    subject_name: string; 
    session_number: number;
  }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://127.0.0.1:5000/api/test/classes',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

    return (
      <>
        {data.map((item) => (
          <Box paddingLeft="2%" h="13%" display="flex">            
            <Box w='10%' display="flex" alignItems="center">
              <Text>{item.subject_code}</Text>
            </Box>
            <Box w='15%' display="flex" alignItems="center">
              <Text>{item.subject_name}</Text>
            </Box>
            <Box w='7%' display="flex" alignItems="center">
              <Text>{item.day}</Text>
            </Box>
            <Box w='8%' display="flex" alignItems="center">
              <Text>{item.start_time}</Text>
            </Box>
            <Box w='8%' display="flex" alignItems="center">
              <Text>{item.end_time}</Text>
            </Box>
            <Box w='5%' display="flex" alignItems="center">
              <Text>{item.room}</Text>
            </Box>
            <Box w='10%' display="flex" alignItems="center">
              <Text>{item.class_type}</Text>
            </Box>
            <Box w='13%' display="flex" justifyContent="center" alignItems="center">
              <Link 
              href='/afterLogin/viewAttendance'>
                <Button 
                fontSize={'sm'} 
                rounded={'full'} 
                variant={"ghost"}
                bgColor={"#818589"}
                color="white"
                _hover={{
                  bgColor: "white",
                  color: "#818589",
                }}>
                  View Attendance
                </Button>
              </Link>
            </Box>
            <Box w='13%' display="flex" justifyContent="center" alignItems="center">
              <Link 
                href='/afterLogin/attend'>
                <Button 
                    fontSize={'sm'} 
                    rounded={'full'} 
                    variant={"ghost"}
                    bgColor={"#818589"}
                    color="white"
                    _hover={{
                      bgColor: "white",
                      color: "#818589",
                    }}>
                      Start Attendance
                </Button>
              </Link>
            </Box>
          </Box>
        ))}
      </>
  );
};

export default Hero;