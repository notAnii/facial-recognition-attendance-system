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
import axios from 'axios';
import { useEffect, useState } from 'react';
  
  const Hero: React.FC = () => {

    //here you list down the json titles you want to list for example: 
    //Id, title, and userId (should be written exactly like the json file)
  
    const [data, setData] = useState<Array<{ 
      session_number: number; 
      subject_name: string; 
      room: string 
    }>>([]);
  
    //make a GET request to the https://jsonplaceholder.typicode.com/posts API endpoint 
    //to retrieve a list of posts. (this will allow table to automatically increment rows)
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('http://127.0.0.1:5000/api/test/classes');
  
        setData(result.data);
      };
  
      fetchData();
    }, []);

    return (
      <>
      {data.map((item) => (

      <Center py={3}>
        <Box 
          w={"150px"}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'50px'}
            w={'100%'}
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
              {item.subject_name}
              </Heading>
              
            </Stack>
  
            <Stack 
            direction={'row'} 
            justify={'center'} 
            spacing={6}
            >
              <Stack 
              spacing={0} 
              align={'center'}
              >
                <Text 
                fontWeight={600}
                backgroundColor="#7ADEE4"
                padding={1}
                borderRadius={100}
                >
                  {item.session_number}
                </Text>

                <Text 
                fontSize={'sm'} 
                color={'gray.500'}
                >
                {item.room}
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
      ))}
      </>
      
    );
  };

  export default Hero;