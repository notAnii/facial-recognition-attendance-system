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
      subject_code: string; 
      subject_name: string; 
      room: string;
      start_time: number; 
      end_time: number; 
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
                {item.subject_code}
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
                {item.subject_name}
                </Text>
                <Text 
                fontSize={'sm'} 
                color="gray.300"
                fontFamily={"Open Sans"}
                >
                {item.room}
                </Text>
                <Text 
                fontSize={'sm'} 
                color="gray.300"
                fontFamily={"Open Sans"}
                fontWeight="thin"
                >
                Timing: {item.start_time} - {item.end_time}
                </Text>
              </Stack>
            </Stack>
              
            
            
          </Box>
        </Box>
      </Center>
       ))}
       </>
    );
  };
  
  export default Hero;