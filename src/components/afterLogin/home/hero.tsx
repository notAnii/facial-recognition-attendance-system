import { Box, Container, Text, Stack } from '@chakra-ui/react'
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
      h="80vh"
      w={{ base: "100vh", md: "130vh" }}
      marginTop={10}
      borderRadius={40}
      border='1px' 
      borderColor='black'
      >
        
      <Stack 
      direction={'row'} 
      spacing='4px' 
      mt={{ base: 15, md: 5 }} 
      mr={{ base: 3, md: 3 }} >
      
      <Box //Left Box
      backgroundColor={"white"} 
      h="73vh" w="90vh"
      ml={{ base: "2vh", md: "2vh", }}
      borderRadius={40}
      border='1px' 
      borderColor='black'
      />

      <Box //Right Box
      backgroundColor={"white"} 
      h="73vh" w="45vh"
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