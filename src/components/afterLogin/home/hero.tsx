import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'
import "@fontsource/open-sans"

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
      h="80vh" //w="130vh" 
      w={{ base: "100vh", md: "130vh" }}
      marginTop={10}
      borderRadius={40}
      border='1px' 
      borderColor='black'
      >
        
        <Box //Right Box
      backgroundColor={"white"} 
      h="73vh"
      mt={{ base: 15, md: 5 }} 
      ml={["5%", "63%", "62%", "62%"]}
      mr={{ base: 3, md: 4 }}
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
      
      <Box //Left Box
      backgroundColor={"white"} 
      h="73vh"
      mt={{ base: -430.5, md: -439 }} 
      ml={{ base: "2vh", md: "2vh", }}
      mr={["5%", "38%", "39%", "39%"]}
      borderRadius={40}
      border='1px' 
      borderColor='black'
      >
        
      </Box>
          
      </Box>
      

      </Container>
      
      
    
  )
}

export default Hero