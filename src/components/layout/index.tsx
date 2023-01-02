import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Box as="main">{children}</Box>
  </>
);

export default Layout;
