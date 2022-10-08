import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
  
  export const UserDetails=()=>{
    const [showPassword, setShowPassword] = useState(false);
    let userData=JSON.parse(localStorage.getItem('login')) || [];
   const [data, setData] =useState({
    address:"",
      Phone:""
   })


    let name, value
   const handle=(e)=>{
       name=e.target.name
       value=e.target.value 
       
       setData({...data, [name]:value})
   }

 const update=(e)=>{
    e.preventDefault()
        axios.patch(`http://localhost:5001/updateuser/${userData.user._id}`,data)
        .then((res)=>{
              console.log(res)
        })
        .catch((error)=>{
            console.log({error:error.message})
        })
   }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
               User Profile
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Text type="text">{userData.user.firstname}  {userData.user.lastname}</Text>
                  </FormControl>
                </Box>
                <Box>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Text type="text">{userData.user.email}</Text>
              </FormControl>

            {/* .......................... */}

              {/* <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Text type="text">{userData.user.firstname}  {userData.user.lastname}</Text>
                  </FormControl> */}

            {/* ......................... */}

             {userData.user.address  ? <FormControl id="firstName" isRequired>
                    <FormLabel>Address</FormLabel>
                    <Text type="text">Address: {userData.user.address} </Text>
                   
                  </FormControl> 
                  
                  
                  :  <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                
                  <Input type='text' placeholder='Add Address' name="address" onChange={handle}/>
                
              </FormControl>}

              {userData.user.Phone  ? <FormControl id="firstName" isRequired>
                    <FormLabel>Phone Nos</FormLabel>
                    <Text type="text">Phone: {userData.user.Phone} </Text>
                    </FormControl> 
                  : <FormControl>
                  <FormLabel>Phone Number</FormLabel>  
                    <Input type='number' placeholder='Add Number' name="Phone" onChange={handle}/>
                  
                </FormControl>}
             
              
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}  onClick={update}>
                 Update User Profile
                </Button>
              </Stack>
             
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  