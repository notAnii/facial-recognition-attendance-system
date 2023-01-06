import { Box, Button } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import React from "react";
import Hero from "../components/login/hero";

type Props = {};

const Login = (props: Props) => {
  return (
    <Box h={"100vh"} pos={"relative"}>
      <NextSeo title="Log-in" />
      <Image
        src={"/back4.jpg"}
        alt={""}
        width={700}
        height={700}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          zIndex: -1,
        }}
      />


      <Hero />
      
    </Box>
  );
};

export default Login;
