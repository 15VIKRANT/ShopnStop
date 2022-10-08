
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
  Stack,
  useColorMode,
  Input
 , Center,
 VStack,
} from '@chakra-ui/react';
import './Navbar.css'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {Link, Navigate, useNavigate} from  'react-router-dom'
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

export  const Navbar=()=> {
  const navigate= useNavigate()
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let userData=JSON.parse(localStorage.getItem('login')) || [];
  
  //console.log(userData.user.role)

  const handledelete=()=>{
          localStorage.removeItem('login');
          window.location.reload()
          navigate('/')
  }
  
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link to='/'>
          <Box>Logo</Box>
          </Link>
          <Link to='/product'>
             <Box>Products</Box>
          </Link>

   
     
     
        
          <Link to='/cart'>
            <Box className='outer'>
             <Box>Cart</Box>
             <Box className='jadu'>0</Box>
            </Box>
          </Link>
         <Input placholder="Search for product name" height={50} width={200}/>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'}
                  />
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
       {userData.length!==0 ?
                 <>
         {userData.user.role=="admin" ? <Link to='/dashboard'>Admin Dashboard</Link>:
         <><VStack><h2>Welcome, {userData.user.firstname}</h2>
           <br/>
           <Link to='/userdetail'>Profile</Link>
           </VStack></>}
                  </> : <></> }
                  </Center>
                  <br />
                  <MenuDivider />
                  {userData.length==0? 
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