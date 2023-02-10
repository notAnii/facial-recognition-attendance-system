import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function SocialProfileWithImage() {
    return (
      <Center py={3}>
        <Box
          w={"270px"}
          bg={'#333333'}
          boxShadow={'2xl'}
          borderRadius={30}
          overflow={'hidden'}
          paddingLeft={3}
          >
      
          <Box p={5}>
            <Stack 
            spacing={0} 
            align={'left'} 
            mb={1}>

              <Heading 
              fontSize={'20px'} 
              fontWeight={550} 
              fontFamily={"Open Sans"}
              color="white"
              >
                CSIT226
              </Heading>
              
            </Stack>
  
            <Stack 
            direction={'row'} 
            justify={'left'} 
            spacing={6} 
            >
              <Stack 
              spacing={0} 
              align={'left'}
              >
               
                <Text 
                fontSize={'sm'} 
                color="white"
                fontFamily={"Open Sans"}
                fontWeight={450} 
                >
                Human Computer Interaction
                </Text>
                <Text 
                fontSize={'sm'} 
                color="gray.300"
                fontFamily={"Open Sans"}
                >
                Room : 5.11
                </Text>
                <Text 
                fontSize={'sm'} 
                color="gray.300"
                fontFamily={"Open Sans"}
                fontWeight="thin"
                >
                Timing: 15:30 - 17:30
                </Text>
              </Stack>
            </Stack>
              
            
            
          </Box>
        </Box>
      </Center>
    );
  }