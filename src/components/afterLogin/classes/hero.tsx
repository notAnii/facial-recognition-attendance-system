import React, { useState } from 'react'
import { 
  Box, 
  Text, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spacer,
  IconButton,
  Link,
  HStack,
  Center,
  VStack,} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon,} from '@chakra-ui/icons'
import { BsFilterLeft } from 'react-icons/bs';
import Card from './card'
//import Hero from "../startAttend/hero"

type Props = {}

const Hero = (props: Props) => {
    const [week, setWeek] = useState(1);
  
  function rgba(arg0: number, arg1: number, arg2: number, arg3: number) {
    throw new Error('Function not implemented.')
  }

  function createBoxes(numberOfBoxes: number) {
    const boxes = [];
    for (let i = 0; i < numberOfBoxes; i++) {
      boxes.push(<Card/>);
    }
    return boxes;
  }

  function displayWeek() {
    var weekMessage;
    if (week <= 10 && week > 0){
        weekMessage = <Text textAlign={"center"} paddingLeft={1} paddingRight={1}>Week {week}</Text>;
    }
    else if (week <= 0){
        setWeek(1);
    }
    else{
        setWeek(10);
    }
    return weekMessage;
  }

  return (
    <Box //Whole page box excluding the tast bar
      h="100vh" 
      bg="white">
      <Box //Top of page space
        h="5%" 
        display="flex" 
        alignItems="right">
      </Box>
      <Box //box that holds teachers name, filter button, classes list, and weeks
        h="85%" 
        m={5} 
        bg="#ECECEC" 
        borderRadius={30} 
        border={"1px"} 
        borderColor={"Black"}>
        <Box //top bar of the box with the teachers name and filter button
          h="12%" 
          display="flex" 
          alignItems="center" 
          borderRadius={10}>
          <Box //Box thhat has the teachers name
            w="50%" 
            h="100%" 
            display="flex" 
            alignItems="center" 
            borderRadius={10} 
            paddingLeft="2%">
            <Text fontSize="2xl">Hammood Teacher</Text>
            <Box //Box that has the filter button
              w="30%" 
              h="100%" 
              display="flex" 
              alignItems="center"
              marginLeft={'1%'} 
              borderRadius={10}>
              <IconButton 
                aria-label='Filter' 
                color="black" 
                size="sm"
                icon={<BsFilterLeft />} px={4} 
                fontSize='25px'
                variant={"ghost"}
                borderRadius={13}
                _hover={{
                  bgColor: "#ECECEC",
                  color: "#818589",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box //Box that holds the table
          h="76%" 
          borderRadius={10} 
          overflowY="auto" 
          overflowX="auto" 
          sx={{
            '&::-webkit-scrollbar': {
              width: '16px',
              borderRadius: '8px',
              backgroundColor: `rgba(0, 0, 0, 0.10)`,
          },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '8px',
              backgroundColor: `rgba(0, 0, 0, 0.10)`,
          },
        }}>

          <Box paddingLeft="2%" h="10%" display="flex" position='sticky' top={0} bg="#ECECEC" zIndex={1}>            
            <Box w='10%' display="flex" alignItems="center">
              <Text>Subject Code</Text>
            </Box>
            <Box w='15%' display="flex" alignItems="center">
              <Text>Subject Name</Text>
            </Box>
            <Box w='7%' display="flex" alignItems="center">
              <Text>Day</Text>
            </Box>
            <Box w='8%' display="flex" alignItems="center">
              <Text>Start Time</Text>
            </Box>
            <Box w='8%' display="flex" alignItems="center">
              <Text>End Time</Text>
            </Box>
            <Box w='5%' display="flex" alignItems="center">
              <Text>Room</Text>
            </Box>
            <Box w='10%' display="flex" alignItems="center">
              <Text>Class Type</Text>
            </Box>
            <Box w='13%' display="flex" alignItems="center"/>  
            <Box w='13%' display="flex" alignItems="center"/>
          </Box>

          
          <>
            {createBoxes(25)}
          </>
          
                      
        </Box>
        <Box //Box under the table that has the weeks
            h="12%" 
            w="14%" 
            display="flex" 
            alignItems="center"
            justifyContent="center">
            <IconButton 
                aria-label='Go To Previous Week' 
                backgroundColor="#818589" 
                color="white" 
                size='sm'
                icon={<ArrowBackIcon />}
                fontSize={'sm'} 
                variant={"ghost"}
                bgColor={"#818589"}
                borderRadius={13}
                onClick={() => setWeek(week - 1)}
                _hover={{
                    bgColor: "#ECECEC",
                    color: "#818589",
                }}
            />
            <>
              {displayWeek()}
            </>
            <IconButton 
                aria-label='Go To Next Week' 
                backgroundColor="#818589" 
                color="white" 
                size='sm'
                icon={<ArrowForwardIcon />}
                fontSize={'sm'} 
                variant={"ghost"}
                bgColor={"#818589"}
                borderRadius={13}
                onClick={() => setWeek(week + 1)}
                _hover={{
                    bgColor: "#ECECEC",
                    color: "#818589",
                }}
            />
        </Box>
      </Box>
    </Box>
  )
}

export default Hero