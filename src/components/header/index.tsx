import { Box, Container } from "@chakra-ui/react";

import Logo from "../logo";
import Navbar from "./navbar";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import "nprogress/nprogress.css";

const Header = () => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
    return () => {
      router.events.off("routeChangeStart", () => {});
    };
  }, []);
  return (
    <Box
      color="white"
      fontSize="18px"
      pos={"fixed"}
      w={"100%"}
      zIndex={9}
      py={[8]}
      top={0}
      bgColor={"black"}
    >
      <Container maxW={"7xl"}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mx="auto"
          h="4rem"
        >
          <Logo />
          <Navbar />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
