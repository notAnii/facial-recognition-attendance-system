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
          maxW={'160px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'50px'}
            w={'full'}
            src={
              "/cardBack.png"
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'md'}
              src={
                "/avatar.jpg"
              }
             
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={5}>
            <Stack spacing={0} align={'center'} mb={1}>
              <Heading fontSize={'16px'} fontWeight={500} fontFamily={'body'}>
                Ismail Hussein
              </Heading>
              
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}
                backgroundColor="#7ADEE4"
                padding={1}
                borderRadius={100}
                >66.67%</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Semester
                </Text>

              </Stack>
            
            </Stack>
              
            <Box
              w={'full'}
              mt={4}
              color={'black'}
              borderColor={"black"}
              borderRadius={23}
              border='1px' 
              >
                <Text
                paddingLeft={35}
                >
                  13:44
                </Text>
              
            </Box>
            
          </Box>
        </Box>
      </Center>
    );
  }