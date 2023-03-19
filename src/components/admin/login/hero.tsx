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
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const Hero = (props: Props) => {
  // define state hooks for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  // update the data object with state values when button is clicked
  const handleLogin = async () => {
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/admin-login",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.location.href = "/admin/home";
        console.log(response.data);
        toast({
          title: "Logged in successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        console.log(error.response.data);
        toast({
          title: "Admin username or password is incorrect.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log(error.message);
        // display error message using alert or toast
      }
    }
  };

  return (
    <Container //Response always put that plz
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      maxW={"7xl"}
      h={"100%"} //to determine center of the page
    >
       <Head>
        <title>Log In Page</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </Head>

      <Box //bos = dev
        bgColor={"white"}
        p={6}
        borderRadius={"3xl"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Image src={"/logo.png"} alt={""} width={150} height={150} />
        <Heading mt={4}>Admin <br /> Log In</Heading>
        <VStack spacing={2} mt={8} mb={10}>
          <Box>
            <Text>Username </Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box>
            <Text>Password </Text>
            <Input
              border={"2px solid black"}
              borderRadius={"xl"}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </VStack>

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
          onClick={handleLogin}
        >
          Log In
        </Button>

        <Link
          href="/"
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
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
