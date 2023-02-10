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
import { useState } from 'react';

  export default function SocialProfileWithImage() {
    return (
        <Box paddingLeft="2%" h="13%" display="flex">            
          <Box w='10%' display="flex" alignItems="center">
            <Text>CSCI203</Text>
          </Box>
          <Box w='15%' display="flex" alignItems="center">
            <Text>Data Structures and Algorithms</Text>
          </Box>
          <Box w='7%' display="flex" alignItems="center">
            <Text>Thursday</Text>
          </Box>
          <Box w='8%' display="flex" alignItems="center">
            <Text>13:30</Text>
          </Box>
          <Box w='8%' display="flex" alignItems="center">
            <Text>15:30</Text>
          </Box>
          <Box w='5%' display="flex" alignItems="center">
            <Text>5.11</Text>
          </Box>
          <Box w='10%' display="flex" alignItems="center">
            <Text>Computer Lab</Text>
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
    )
  }