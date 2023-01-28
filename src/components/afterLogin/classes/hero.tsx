import React from 'react'
import { Box, Text, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,} from '@chakra-ui/react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <Box h="100vh" bg="green">
      <Box h="8%" bg="red">
        #this will have the year and month (idek why we have it)
      </Box>
      <Box h="85%" m={5} bg="blue">
        <Box h="10%" bg="red" display="flex" alignItems="center">
          <Box w="20%" h="100%" bg="pink" display="flex" alignItems="center">
            <Text>Hammood Teacher</Text>
            <Box w="40%" h="100%" bg="purple" display="flex" alignItems="center">
              <Text>Filter Icon</Text>
            </Box>
          </Box>
        </Box>
        <Box h="90%" w="100%" bg="cyan">
          <TableContainer w="100%">
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Subject Code</Th>
                  <Th>Subject Name</Th>
                  <Th>Name</Th>
                  <Th>Class Start Time</Th>
                  <Th>Class End Time</Th>
                  <Th>Room</Th>
                  <Th>Class Type</Th>
                  <Th>View Attendance</Th>
                  <Th>Start Attendance</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>CSCI203</Td>
                  <Td>Data Structures and Algorithms</Td>
                  <Td>Thursday</Td>
                  <Td>13:30</Td>
                  <Td>15:30</Td>
                  <Td>5.11</Td>
                  <Td>Computer Lab</Td>
                  <Td>View Attendance</Td>
                  <Td>Start Attendance</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  )
}

export default Hero