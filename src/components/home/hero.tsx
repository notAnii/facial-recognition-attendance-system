import { Box, Container, VStack, Text, Heading} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Head from "next/head";

type Props = {}

const Hero = (props: Props) => {
  return (
    <Box h="100vh">

        <Head>
        <title>Landing Page</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

        <Image
        src={"/back4.jpg"}
        alt={""}
        width={1000}
        height={1000}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          zIndex: -1,
        }}
      />
    
    <Container 
    maxW="7xl"
    pt={32} //Response always put that plz
    >
        <VStack
        spacing={4} maxW="xl" alignItems="start" ml={10} mt={55} pb={10}>

        <Heading color='white' size="3xl">The Automated Attendance System </Heading>
         
        <Text color='white' size="sm">The automated attendance system allows a students attendance to be recorded on a particular day. The student needs to go through facial recognition to mark the attendance. 
        Once facial recognition is done, the details of ID number, date and in-time are saved in the database. 
        The information will be stored in a cloud that forms a connection with the system and server through 
        the internet. The system will consist of a GUI where additional information about the student will be
         present. </Text>
         
        
        </VStack>
    </Container>
    </Box>
    
  )
}

export default Hero