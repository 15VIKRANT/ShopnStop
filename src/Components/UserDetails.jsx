import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack, 
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import { FaUserEdit } from "react-icons/fa";
import axios from 'axios';
  
  export const UserDetails=()=>{
    const [users, setUsers] =useState([]);
    const [isupdate, setIsupdate] =useState(false)
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
        axios.patch(`http://localhost:5100/updateuser/${userData.user._id}`,data)
        .then((res)=>{
              setIsupdate(!isupdate)
        })
        .catch((error)=>{
            console.log({error:error.message})
        })
   }
   
   const getUsers = () =>{
     axios.get(`http://localhost:5100/users/${userData.user._id}`)
     .then((res)=>{
       setUsers(res.data)
       
      }) 
      .catch((err)=>{
        console.log({err:err.message})
      })
    }
    
    
useEffect(()=>{
  getUsers()
  
}, [isupdate])


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
                    <FaUserEdit/>
                    <FormLabel>First Name</FormLabel>
                    <Text type="text">{users.firstname}  {users.lastname}</Text>
                  </FormControl>
                </Box>
                <Box>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Text type="text">{users.email}</Text>
              </FormControl>


            <FormControl id="firstName" isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input type="text" placeholder={users.address} name="address" onChange={handle}/>  
                  </FormControl> 


               
                
              <FormControl id="Phone" isRequired>
                    <FormLabel>Phone Nos</FormLabel>
                    <Input type="text"  placeholder={users.Phone} name="Phone" onChange={handle}/>
                    </FormControl> 
                  
                 
             
              
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
  