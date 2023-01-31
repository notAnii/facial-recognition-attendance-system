import React from 'react'
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

const Hero = (props: Props) => {
  return (
    
    <Container 
    h="100vh" 
    display={"flex"} 
    maxW={"7xl"}
    //justifyContent={"center"}
    backgroundColor="#E5E5E5"
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

      <Box //Cards Here
      h="39vh"
      overflowX={"auto"}
      marginTop={13.3}
      sx={{
        '&::-webkit-scrollbar': {
          width: '16px',
          borderRadius: '8px',
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '8px',
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
      }}
      >
        <Grid 
        paddingLeft={5}
        borderRadius={40}
        paddingRight={5}
        templateColumns='repeat(5, 1fr)' 
        gap={6} 
        >

        <GridItem w='100%'>
        <Card/>
        </GridItem>
        <GridItem w='100%'>
        <Card/>
        </GridItem>
        <GridItem w='100%'>
        <Card/>
        </GridItem>
        <GridItem w='100%'>
        <Card/>
        </GridItem>
        <GridItem w='100%'>
        <Card/>
        </GridItem>
        <GridItem w='100%'>
        <Card/>
        </GridItem>
        <GridItem w='100%'>
        <Card/>
        </GridItem>
        
        </Grid>
      </Box>

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
        >Date</Th>
        <Th 
        fontFamily={"Open sans"} 
        color="#4F4747"
        isNumeric
        >Time</Th>
      </Tr>
    </Thead>

    <Tbody //DATA INSIDE THE TABLE
    >
      <Tr>
        <Td>5570</Td>
        <Td>Ismail Hussein</Td>
        <Td>BCS</Td>
        <Td>07/12/22</Td>
        <Td isNumeric>13:31</Td>
      </Tr>
      <Tr>
        <Td>5590</Td>
        <Td>Yassin Akkad</Td>
        <Td>BCS</Td>
        <Td>07/12/22</Td>
        <Td isNumeric>13:33</Td>
      </Tr>
      <Tr>
        <Td>5510</Td>
        <Td>Layton Chetty</Td>
        <Td>BCS</Td>
        <Td>07/12/22</Td>
        <Td isNumeric>13:39</Td>
      </Tr>
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