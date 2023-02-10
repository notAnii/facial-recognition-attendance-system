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
            <Text>6616781</Text>
          </Box>
          <Box w='13%' display="flex" alignItems="center">
            <Text>Oscar Chu</Text>
          </Box>
          <Box w='7%' display="flex" alignItems="center">
            <Text>Week 10</Text>
          </Box>
          <Box w='8%' display="flex" alignItems="center">
            <Text>12/23/22</Text>
          </Box>
          <Box w='15%' display="flex" alignItems="center">
            <Text>66.67%</Text>
          </Box>
          <Box w='15%' display="flex" alignItems="center">
            <Text>Present</Text>
          </Box>
          <Box w='15%' display="flex" alignItems="center">
            <Text>1/3</Text>
          </Box>
        </Box>
    )
  }