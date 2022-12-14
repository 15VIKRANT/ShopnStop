import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
 Center,
  VStack,
  Heading,
  Stack,
} from '@chakra-ui/react';
import './Navbar.css'
import { ImCart } from "react-icons/im"
import { BsFillPersonFill } from "react-icons/bs"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export const Navbar = () => {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart, setCart] = useState([])
  let userData = JSON.parse(localStorage.getItem('login')) || [];

  const handledelete = () => {
    localStorage.removeItem('login');
    window.location.reload()
    navigate('/')
  }
  

  const Display =()=> {
    if(userData.length!==0)
    { 
    axios
      .get(`https://myshop-backend-556t.onrender.com/cart/${userData.user._id}`)
      .then((r) => {
        setCart(r.data);      
      })
      .catch((err) => {
        console.log(err);
      });
    }
   
  };


   var sum=0;

    if(userData.length!==0)
    { 
        if(cart.length!==0)
        {
            cart.forEach((e)=>{ 
              sum+=e.count})
        }
    }

   const handlecart=()=>{
    if(userData.length===0)
    {
      alert("please login to Shop");
    }
   }

  useEffect(() => {
    Display()
  }, [cart])


  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} width={"80%"} margin="auto">
          <Link to='/'>
            <Box>
              <img src="https://prodstatic.shoppersstop.com/_ui/updated_path/images/rectangle_logo_black.svg" alt="LOGO" />
            </Box>
          </Link>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={4} >
              <Link to='/product'>
                <Heading as='h5' size='sm' marginTop={"4px"}>
                  Products
                </Heading>
              </Link>
              <Link to='/contactus'>
                <Heading as='h5' size='sm' marginTop={"4px"}>
                  Contact
                </Heading>
              </Link>
              <Link to={userData.length==0 ? "/login" :"/cart"}>
                <Box className='outer' onClick={handlecart}>
                  <ImCart size='22px' />
                  <Box className='jadu'>
                    {cart.length!==0 ? sum: 0}
                  </Box>
                </Box>
              </Link>
              <Button onClick={toggleColorMode} size="25px">
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <BsFillPersonFill size="25px" />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'}
                    />
                  </Center>
                  <br />
                  <Center>
                    {userData.length !== 0 ?
                      <>
                        {userData.user.role == "admin" ? <Link to='/dashboard'>Admin Dashboard</Link> :
                          <><VStack><h2>Welcome, {userData.user.firstname}</h2>
                            <br />
                            <Link to='/userdetail'>Profile</Link>
                          </VStack></>}
                      </> : <></>}
                  </Center>
                  <br />
                  <MenuDivider />
                  {userData.length == 0 ?
                    <Link to='/login'><MenuItem>Login</MenuItem>
                    </Link>
                    : <Button onClick={handledelete}>Logout</Button>}

                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}