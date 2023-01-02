import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <Container
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      maxW={"7xl"}
      h={"100%"}
    >
      <Box
        bgColor={"white"}
        p={10}
        borderRadius={"3xl"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Image src={"/flower.webp"} alt={""} width={150} height={150} />
        <Heading mt={4}>Sign In</Heading>
        <VStack spacing={4} mt={8} mb={10}>
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
        <Button
          variant={"ghost"}
          bgColor={"black"}
          _hover={{
            bgColor: "unset",
            color: "black",
            border: "2px solid black",
          }}
        >
          Log In
        </Button>
      </Box>
      {/* <Image src={reactLogo} alt="React logo" /> */}
    </Container>
  );
};

export default Hero;
