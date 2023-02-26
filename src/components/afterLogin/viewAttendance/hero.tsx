import React, { useContext } from 'react'
import { 
  Box, 
  Text, 
  Spacer,
  IconButton,
  Input,} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { BsFilter, BsFilterLeft } from 'react-icons/bs';
import Card from './card'
import { useState } from 'react';
import { WeekContext } from '../../context';

//import Hero from "../startAttend/hero"

type Props = {}

const Hero = (props: Props) => {
  const {weekNumber, setWeekNumber} = useContext(WeekContext);

  function rgba(arg0: number, arg1: number, arg2: number, arg3: number) {
    throw new Error('Function not implemented.')
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
      <Box //Whole box that has subject name, time, table, and weeeks at the bottom
        h="85%" 
        m={5} 
        bg="#ECECEC" 
        borderRadius={30} 
        border={"1px"} 
        borderColor={"Black"}>
        <Box //Top part that has subject name and time
            h="15%" 
            display="flex" 
            alignItems="center"
            paddingLeft="2%" 
            borderRadius={10}>
            <Box //Box that has the Subject code and name
                w="30%" 
                h="100%"
                display="flex" 
                alignItems="center"
                borderRadius={10}>
                <Text fontSize="2xl">CSCI203 Tuturial Attendance List</Text>
            </Box>
            <Box display="flex" alignItems="center" width='40%'>
                <Input 
                placeholder='Search' 
                size='sm' 
                variant='filled' 
                bg='#F0F0F0' 
                borderRadius={30} 
                border={"1px"} 
                borderColor={"Black"}/>        
            </Box>
            <Box //Box that has filter button
                w="4%" h="100%" display="flex" alignItems="center" justifyContent="center">
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
            
            <Spacer/>
            <Box //Box that has day and time
                w="30%" 
                h="100%" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                borderRadius={10}>
                <Text fontSize="2xl">Thursday 13:30-15:30</Text>
            </Box>
        </Box>
        <Box //Box that holds the table
          h="77%" 
          w="100%" 
          maxHeight="100%" 
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
                    <Text>Student ID</Text>
                </Box>
                <Box w='13%' display="flex" alignItems="center">
                    <Text>Student Name</Text>
                </Box>
                <Box w='7%' display="flex" alignItems="center">
                    <Text>Week</Text>
                </Box>
                <Box w='8%' display="flex" alignItems="center">
                    <Text>Date</Text>
                </Box>
                <Box w='15%' display="flex" alignItems="center">
                    <Text>Attendance Percentage</Text>
                </Box>
                <Box w='15%' display="flex" alignItems="center">
                    <Text>Attendance Status</Text>
                </Box>
                <Box w='15%' display="flex" alignItems="center">
                    <Text>Unexcused Absences</Text>
                </Box>
            </Box>

            <Card week={weekNumber}/>

        </Box>
        <Box //Box under the table that has the weeks
            h="8%" 
            w="15%" 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            paddingBottom={1}
            >
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
                onClick={() => {if (weekNumber > 1) setWeekNumber(weekNumber-1)}}
                _hover={{
                    bgColor: "#ECECEC",
                    color: "#818589",
                }}
            />
            <>
                {`Week ${weekNumber}`}
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
                onClick={() => {if (weekNumber < 10) setWeekNumber(weekNumber+1)}}
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