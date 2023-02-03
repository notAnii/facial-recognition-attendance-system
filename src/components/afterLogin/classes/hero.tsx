import React from 'react'
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
  Link,} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon,} from '@chakra-ui/icons'
import { BsFilterLeft } from 'react-icons/bs';
//import Hero from "../startAttend/hero"

type Props = {}

const Hero = (props: Props) => {
  function rgba(arg0: number, arg1: number, arg2: number, arg3: number) {
    throw new Error('Function not implemented.')
  }

  return (
    <Box 
      h="100vh" 
      bg="white">
      <Box 
        h="8%" 
        display="flex" 
        alignItems="right">
        <Spacer/>
        <Box 
          w="15%" 
          h="130%" 
          display="flex" 
          alignItems="center">
          <IconButton 
            aria-label='Go To Previous Week' 
            backgroundColor="#818589" 
            color="white" 
            size="sm"
            icon={<ArrowBackIcon />} px={4} 
            fontSize={'sm'} 
            variant={"ghost"}
            bgColor={"#818589"}
            borderRadius={13}
            _hover={{
              bgColor: "#ECECEC",
              color: "#818589",
            }}
          />
          <Text 
            textAlign={"center"} 
            paddingLeft={1} 
            paddingRight={1}>
              Week 10
          </Text>
          <IconButton 
            aria-label='Go To Next Week' 
            backgroundColor="#818589" 
            color="white" 
            size="sm"
            icon={<ArrowForwardIcon />}
            fontSize={'sm'} 
            variant={"ghost"}
            bgColor={"#818589"}
            borderRadius={13}
            _hover={{
              bgColor: "#ECECEC",
              color: "#818589",
            }}
          />
        </Box>
      </Box>
      <Box 
        h="85%" 
        m={5} 
        bg="#ECECEC" 
        borderRadius={30} 
        border={"1px"} 
        borderColor={"Black"}>
        <Box 
          h="15%" 
          display="flex" 
          alignItems="center" 
          borderRadius={10}>
          <Box 
            w="50%" 
            h="100%" 
            display="flex" 
            alignItems="center" 
            borderRadius={10} 
            paddingLeft="2%">
            <Text fontSize="2xl">Hammood Teacher</Text>
            <Box 
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
        <Box 
          h="85%" 
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
          <Table 
            maxWidth="100%" 
            variant='striped' 
            colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Subject Code</Th>
                <Th>Subject Name</Th>
                <Th>Name</Th>
                <Th>Start Time</Th>
                <Th>End Time</Th>
                <Th>Room</Th>
                <Th>Class Type</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>CSCI203</Td>
                <Td >Data Structures and Algorithms</Td>
                <Td>Thursday</Td>
                <Td>13:30</Td>
                <Td>15:30</Td>
                <Td>5.11</Td>
                <Td>Computer Lab</Td>
                <Td>
                <Link 
                  href='/afterLogin/viewAttendance' 
                  style={{ textDecoration: 'none' }} 
                  _focus={{ boxShadow: 'none' }}>
                  <Button 
                    px={4} 
                    fontSize={'sm'} 
                    rounded={'full'} 
                    variant={"ghost"}
                    bgColor={"#818589"}
                    color="white"
                    _hover={{
                      bgColor: "white",
                      color: "#818589",
                    }}>
                      View Attendance
                  </Button>
                  </Link>
                </Td>
                <Td>
                <Link 
                  href='/afterLogin/attend' 
                  style={{ textDecoration: 'none' }} 
                  _focus={{ boxShadow: 'none' }}>
                  <Button 
                      px={4} 
                      fontSize={'sm'} 
                      rounded={'full'} 
                      variant={"ghost"}
                      bgColor={"#818589"}
                      color="white"
                      _hover={{
                        bgColor: "white",
                        color: "#818589",
                      }}>
                        Start Attendance
                  </Button>
                </Link>
                </Td>
              </Tr>
              <Tr>
                <Td>CSCI323</Td>
                <Td>Modern Artificial Intelligence</Td>
                <Td>Monday</Td>
                <Td>15:30</Td>
                <Td>17:30</Td>
                <Td>4.42</Td>
                <Td>Tutorial</Td>
                <Td>
                <Button 
                    px={4} 
                    fontSize={'sm'} 
                    rounded={'full'} 
                    variant={"ghost"}
                    bgColor={"#818589"}
                    color="white"
                    _hover={{
                      bgColor: "white",
                      color: "#818589",
                    }}
                  >
                    View Attendance
                  </Button>
                </Td>
                <Td>
                <Link 
                  href='../startAttend/hero' 
                  style={{ textDecoration: 'none' }} 
                  _focus={{ boxShadow: 'none' }}>
                  <Button 
                    px={4} 
                    fontSize={'sm'} 
                    rounded={'full'} 
                    variant={"ghost"}
                    bgColor={"#818589"}
                    color="white"
                    _hover={{
                      bgColor: "white",
                      color: "#818589",
                    }}>
                      Start Attendance
                  </Button>
                </Link>
                </Td>
              </Tr>
              <Tr>
                <Td>CSCI325</Td>
                <Td>Database Systems</Td>
                <Td>Wednesday</Td>
                <Td>10:30</Td>
                <Td>14:30</Td>
                <Td>3.42</Td>
                <Td>Lecture</Td>
                <Td>
                  <Button 
                    px={4} 
                    fontSize={'sm'} 
                    rounded={'full'} 
                    variant={"ghost"}
                    bgColor={"#818589"}
                    color="white"
                    _hover={{
                      bgColor: "white",
                      color: "#818589",
                    }}>
                      View Attendance
                  </Button>
                </Td>
                <Td>
                <Link 
                  href='../startAttend/hero' 
                  style={{ textDecoration: 'none' }} 
                  _focus={{ boxShadow: 'none' }}>
                  <Button 
                    px={4} 
                    fontSize={'sm'} 
                    rounded={'full'} 
                    variant={"ghost"}
                    bgColor={"#818589"}
                    color="white"
                    _hover={{
                      bgColor: "white",
                      color: "#818589",
                    }}>
                      Start Attendance
                  </Button>
                </Link>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  )
}

export default Hero