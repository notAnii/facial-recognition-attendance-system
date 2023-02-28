import { Box, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
      zIndex="overlay"
      opacity={0.7}
    >
      <Spinner size="xl" color="black" thickness="7px" />
    </Box>
  );
};

export default LoadingSpinner;
