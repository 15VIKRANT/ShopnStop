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
  Text,
  useColorModeValue,

} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

export const Signup = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  let name, value
  const handle = (e) => {
    name = e.target.name
    value = e.target.value
    setData({ ...data, [name]: value })
  }

  const submit = (e) => {
    console.log(data)
    axios.post('https://myshop-backend-556t.onrender.com/register', data)
      .then((r) => {
        alert('signup Succesfull')
        navigate('/login')
      })
      .catch((err) => {
        console.log({ err: err.message })
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
          <Box>
            <img src="https://prodstatic.shoppersstop.com/_ui/updated_path/images/rectangle_logo_black.svg" alt="LOGO" />
          </Box>
          <Text fontSize={'lg'} color={'gray.600'} fontFamily={"cursive"}>
            To get most of great deals and latest fashion
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
                  <FormLabel fontFamily={"cursive"}>First Name</FormLabel>
                  <Input type="text" name="firstname" onChange={handle} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel fontFamily={"cursive"}>Last Name</FormLabel>
                  <Input type="text" name="lastname" onChange={handle} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel fontFamily={"cursive"}>Email address</FormLabel>
              <Input type="email" name="email" onChange={handle} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontFamily={"cursive"}>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name="password" onChange={handle} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                onClick={submit}
                _hover={{
                  bg: 'blue.500',
                }} fontFamily={"cursive"}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'} fontFamily={"cursive"} >
                Already a user? <Link color={'blue.400'} to='/login'>
                  Login
                </Link>
              </Text>
              <Text align={'center'} fontFamily={"cursive"}>
                Admin? <Link color={'blue.400'} to='/Adminlogin'>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}