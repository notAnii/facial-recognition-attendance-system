import { Box, Container, Text, Stack, VStack, Avatar, HStack, 
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,} from '@chakra-ui/react'
import React, { useState } from 'react'
import "@fontsource/open-sans"
import Chart from './chart'

type Props = {}

const Hero = (props: Props) => {
  const [classes,setClasses] = useState([
    {}
  ]);
  return (
    <Container 
    h="100vh" 
    display={"flex"} 
    maxW={"7xl"}
    justifyContent={"center"}
    >
      
      <Box 
      backgroundColor={"white"} 
      h="85%" 
      w="100%"
      maxW="8xl"
      m={1}
      marginTop={10}
      borderRadius={40}
      border='1px' 
      borderColor='black'
      overflowY="auto" 
      overflowX="auto" 
      >
        
      <Stack 
      direction={'row'} 
      spacing='4px' 
      mt={5} 
      mr={3}   
      >
      
      <Box //Left Box
      w="90vh"
      ml={"2vh"}
      >
        <VStack 
        paddingTop={35} 
        spacing={73}
        >

        <Box //inside left box
         w="100%"
         
         >

        <HStack>
          
        <Box //AVATAR
         marginLeft={23}
         w="15%"
         display={"flex"}
         justifyContent="center"
         paddingTop={4}
         >

        <Avatar
              
              size={'md'}
              src={
                "/avatar.jpg"}
              css={{
                border: '2px solid white',
              }}
            />
        </Box>

        <Box //Name and stuff
         w="100%"
         display={"flex"}
         paddingTop={4}
         overflowY="auto" 
         overflowX="auto" 
         >

          <Table 
          width={"100%"}
          maxWidth={"50vh"}
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
                  Mr. Ismail Hussein
                </Th>
                <Th        
                textAlign="left"
                fontFamily={"Open Sans"}
                fontWeight={"light"}
                >
                  Professor
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
                  FEIS</Td>
                
              </Tr>
              <Tr>
                <Td 
                isNumeric 
                textAlign="left"
                fontFamily={"Open Sans"}
                fontWeight={"bold"}
                >
                  Class times
                  </Td>
                <Td 
                textAlign="left"
                fontFamily={"Open Sans"}
                fontWeight={"light"}
                >
                  08:30 - 17:00
                  </Td>
                
               
                
              </Tr>
            </Tbody>
          </Table>
       
          </Box>  
          </HStack>            
        </Box>

        <Box //Graph
         w="100%"
         >
          <VStack 
          paddingRight={90}
         // paddingLeft={10}
          >
          <Text 
          fontFamily={"Open Sans"}
          paddingRight={56}
          paddingBottom={25}
          fontWeight="bold"
          
          >
            2022 Class attendance
            </Text>

        <Chart/>
        </VStack>
        </Box>
        </VStack>
        </Box>

      <Box //Right Box
      backgroundColor={"white"} 
      h="78vh" 
      w="45vh"
      borderRadius={40}
      border='1px' 
      borderColor='black'
      >
        <Text
        fontFamily={"Open Sans"}
        paddingTop={17}
        paddingLeft={{ base: 6, md: 7, lg: 8 }}
        fontWeight="bold"
        fontSize={{ base: '10px', md: '10px', lg: '14px' }}
        >UPCOMING CLASSES</Text>
      <VStack>

      </VStack>
      </Box>
      </Stack>

      </Box>
      </Container>
      
      
    
  )
}

export default Hero