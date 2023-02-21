import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <Container //Response always put that plz
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      maxW={"7xl"}
      h={"100%"} //to determine center of the page
    >

      <Box  //bos = dev
        bgColor={"white"}
        p={6}
        borderRadius={"3xl"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Image src={"/logo.png"} alt={""} width={150} height={150} />
        <Heading mt={4}>Log In</Heading>
        <VStack spacing={2} mt={8} mb={10}>
          <Box>
            <Text>Username </Text>
            <Input border={"2px solid black"} borderRadius={"xl"} />
          </Box>
          <Box>
            <Text>Password </Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              type="password"
            />
          </Box>
        </VStack>
        <Link href='/afterLogin/home' style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Button
          marginBottom={2}
          variant={"ghost"}
          bgColor={"black"}
          color="white"
          _hover={{
            bgColor: "unset",
            color: "black",
            border: "2px solid black",
          }}
          onClick={async () => {
            const data = {
              username: '123',
              password: 'abshir'
            };
            const response = await axios.post('http://127.0.0.1:5000/api/v1/login', data, {withCredentials: true});
            if (response.status === 200) {
              console.log(response.data);
            }
          }}
        >
          Log In
        </Button>
    </Link>
 

  <Link href="/" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    <Button
          variant={"ghost"}
          bgColor={"black"}
          color="white"
          _hover={{
            bgColor: "unset",
            color: "black",
            border: "2px solid black",
          }}
        >
          Go Back
        </Button>
    </Link>
  

        
      </Box>
     
    </Container>
  );
};

export default Hero;
