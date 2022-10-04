
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
} from '@chakra-ui/react';
import './Navbar.css'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {Link} from  'react-router-dom'
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
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let userData=JSON.parse(localStorage.getItem('login'))
  console.log(userData)


  const handledelete=()=>{
          localStorage.removeItem('login');
          window.location.reload()
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
         <Input placholder="search for product name" height={50} width={200}/>
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
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    {userData ? <p>{userData.user.firstname}</p> : <p>username</p>}
                    
                  </Center>
                  <br />
                  <MenuDivider />
                  {!userData ? 
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