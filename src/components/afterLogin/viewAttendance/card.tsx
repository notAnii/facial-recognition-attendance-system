import {
  Box,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Hero: React.FC = () => {
  const [data, setData] = useState<Array<{ 
    id: number; 
    title: string; 
    userId: number 
  }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://jsonplaceholder.typicode.com/posts',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      {data.map((item) => (  
        <Box paddingLeft="2%" h="13%" display="flex" key={item.id}>  
                
          <Box w='10%' display="flex" alignItems="center">
            <Text>{item.id}</Text>
          </Box>
          <Box w='13%' display="flex" alignItems="center">
            <Text>{item.userId}</Text>
          </Box>
          <Box w='7%' display="flex" alignItems="center">
            <Text>{item.title}</Text>
          </Box>
          <Box w='8%' display="flex" alignItems="center">
            <Text>{item.id}</Text>
          </Box>
          <Box w='15%' display="flex" alignItems="center">
            <Text>{item.id}</Text>
          </Box>
          <Box w='15%' display="flex" alignItems="center">
            <Text>{item.id}</Text>
          </Box>
          <Box w='15%' display="flex" alignItems="center">
            <Text>Count</Text>
          </Box>
          
        </Box>
      ))}
    </>
  );
};

export default Hero;
