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
import React from 'react'
import "@fontsource/open-sans"
import Chart from './chart'

type Props = {}

const Hero = (props: Props) => {
  return (
    <Container 
    h="100vh" 
    display={"flex"} 
    maxW={"7xl"}
    justifyContent={"center"}
    >
      
      <Box 
      backgroundColor={"white"} 
      h="85vh"
      w={"135vh"}
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
         justifyContent="center"
         paddingTop={4}
         overflowY="auto" 
         overflowX="auto" 
         paddingRight={23}
         >

          <Table 
          variant="unstyled" 
          size={"sm"}    
          >
            <Thead>
              <Tr>
                <Th 
                fontSize={"10px"}
                textAlign="center"
                fontFamily={"Open Sans"}
                >
                  Mr. Ismail Hussein
                </Th>
                <Th 
                fontSize={"10px"} 
                textAlign="center"
                fontFamily={"Open Sans"}
                >
                  Department
                  </Th>
                <Th 
                isNumeric 
                fontSize={"10px"} 
                textAlign="center"
                fontFamily={"Open Sans"}
                >
                  Class times
                  </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td 
                textAlign="center"
                fontFamily={"Open Sans"}
                >
                  Professor
                  </Td>
                <Td 
                textAlign="center"
                fontFamily={"Open Sans"}
                >
                  FEIS</Td>
                <Td 
                isNumeric 
                textAlign="center"
                fontFamily={"Open Sans"}
                >8:30-17:30
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

      </Box>
      </Stack>

      </Box>
      </Container>
      
      
    
  )
}

export default Hero