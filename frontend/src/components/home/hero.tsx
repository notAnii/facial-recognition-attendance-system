import { Box, Container, VStack, Text, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";

type Props = {};

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
          spacing={4}
          maxW="xl"
          alignItems="start"
          ml={10}
          mt={55}
          pb={10}
        >
          <Heading color="white" size="3xl">
            Automated Attendance System (AAS){" "}
          </Heading>

          <Text color="white" size="sm">
            AAS is an automated attendance web app for educational institutions.
            It utilizes facial recognition technology to record student
            attendance seamlessly. Students just have to walk in front of the
            camera and their attendance is marked. AAS reduces workload for
            teachers and staff while improving accuracy. It's easy to integrate
            into existing school systems and offers a reliable and secure way of
            tracking attendance. AAS is a user-friendly solution that saves time
            and effort for both students and educators. Overall, AAS is an
            efficient and innovative attendance system for schools and
            universities.{" "}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero;
