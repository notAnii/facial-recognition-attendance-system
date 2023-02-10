import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Box, 
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
  TableContainer, } from '@chakra-ui/react'
 
import "@fontsource/open-sans"
import Card from './card'
import Webcam from "react-webcam";

type Props = {}

const Hero: React.FC = () => {

  //here you list down the json titles you want to list for example: 
  //Id, title, and userId (should be written exactly like the json file)

  const [data, setData] = useState<Array<{ 
    id: number; 
    title: string; 
    userId: number 
  }>>([]);

  //make a GET request to the https://jsonplaceholder.typicode.com/posts API endpoint 
  //to retrieve a list of posts. (this will allow table to automatically increment rows)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://jsonplaceholder.typicode.com/posts',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    
    <Container 
    h="100vh" 
    display={"flex"} 
    maxW={"7xl"}
    //justifyContent={"center"}
    backgroundColor="#E5E5E5"
    overflow={"hidden"}
    >
      <VStack 
      spacing={2}
      align='stretch' paddingTop={7}>

      <Box //Text Here
      h="7vh"
      w="100%"
      borderRadius={40}
      >
        <HStack paddingTop={5} paddingLeft={5}>
        <Text 
        fontFamily={"Open Sans"}
        fontWeight="bold"
        paddingRight={594}
        >
          Recently Marked
          </Text>

          <Text 
        fontFamily={"Open Sans"}
        fontWeight="bold"
        paddingLeft={103}
        >
          Thursday 13:30-15:30</Text>
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
          '&::-webkit-scrollbar': {
            width: '16px',
            borderRadius: '6px',
            backgroundColor: `rgba(0, 0, 0, 0.10)`,
        },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '6px',
            backgroundColor: `rgba(0, 0, 0, 0.10)`,
        },
      }}>

        
        <Card/>
        
        
        <Card/>
       
       
        <Card/>
        
        
        <Card/>
        
        
        <Card/>
        
      
        <Card/>
        
        
        <Card/>

        <Card/>
        <Card/>
        
        
        </HStack>
      

      <HStack>

      <Box //Table
      
      backgroundColor={"white"} 
      h="45vh"
      w="100%"
      borderRadius={40}
      border='1px' 
      borderColor='black'
      >
        <VStack maxW={"100%"} paddingTop={3}>
        <Box //Title
        h="4vh"
        w="100%"
        textAlign="center"
      >
        <Text
         fontFamily={"Open Sans"}
         fontWeight="bold"
        >
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
  <Table size='sm' variant='striped' colorScheme="blackAlpha">
    <Thead>
      <Tr //COLUMN NAMES
      >
        <Th 
        fontFamily={"Open sans"} 
        color="#4F4747"
        >Student Number</Th>
        <Th 
        fontFamily={"Open sans"} 
        color="#4F4747"
        >Student Name</Th>
        <Th 
        fontFamily={"Open sans"} 
        color="#4F4747"
        >Program</Th>
        <Th 
        fontFamily={"Open sans"} 
        color="#4F4747"
        isNumeric
        >Time</Th>
      </Tr>
    </Thead>

    <Tbody //DATA INSIDE THE TABLE (it will auto increment)
    >
       {data.map((item) => (
      <Tr key={item.id}>
        <Td>{item.id}</Td>
        <Td>{item.userId}</Td>
        <Td>{item.title}</Td>
        <Td isNumeric>13:31</Td>
      </Tr>
      ))}
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
      border='1px' 
      borderColor='black'
      padding={3}
      paddingTop={5}
      >
        <Webcam width={450} height={450}/>
        
      </Box>

      </HStack>

      </VStack>
     
      
    </Container>
  )
}

export default Hero