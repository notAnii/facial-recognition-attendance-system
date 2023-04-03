import { Box } from "@chakra-ui/react";
import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {

  
  return(
    <Box as="main">{children}</Box>
)};

export default Layout;
