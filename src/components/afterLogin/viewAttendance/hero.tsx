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
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { BsFilter, BsFilterLeft } from 'react-icons/bs';
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
        h="5%" 
        display="flex" 
        alignItems="right">
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
                w="30%" 
                h="100%" 
                display="flex" 
                alignItems="center"
                justifyContent="center" 
                borderRadius={10}>
                <Text fontSize="2xl" paddingLeft={3}>CSCI203 Tuturial Attendance List</Text>
            </Box>
            <Spacer/>
            <Box 
                w="30%" 
                h="100%" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                borderRadius={10}>
                <Text fontSize="2xl">Thursday 13:30-15:30</Text>
            </Box>
        </Box>
        <Box 
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
        <Table 
            maxWidth="100%" 
            variant='striped' 
            colorScheme="blackAlpha">
            <Thead 
                position="sticky" 
                top={0} 
                bg="#ECECEC">
                <Tr>
                    <Th>Student ID</Th>
                    <Th>Student Name</Th>
                    <Th>Week</Th>
                    <Th>Date</Th>
                    <Th>Attendance Percentage</Th>
                    <Th>Attendance Status</Th>
                    <Th>Unexcused Absences
                    <IconButton 
                        aria-label='Filter' 
                        color="black" 
                        size="sm"
                        icon={<BsFilter />} 
                        px={4} 
                        fontSize='25px'
                        variant={"ghost"}
                        borderRadius={13}
                        _hover={{
                        bgColor: "#ECECEC",
                        color: "#818589",
                        }}
                    />
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
                <Tr>
                    <Td>6616781</Td>
                    <Td>Oscar Chu</Td>
                    <Td>Week 10</Td>
                    <Td>12/23/22</Td>
                    <Td>66.67%</Td>
                    <Td>Present</Td>
                    <Td>1/3</Td>
                </Tr>
            </Tbody>
        </Table>
        </Box>
        <Box 
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
                _hover={{
                    bgColor: "#ECECEC",
                    color: "#818589",
                }}
            />
            <Text 
                textAlign={"center"} 
                paddingLeft={1} 
                paddingRight={1}
                >
                Week 10
            </Text>
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