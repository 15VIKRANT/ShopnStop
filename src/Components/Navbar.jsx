
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
  Heading,
} from '@chakra-ui/react';
import './Navbar.css'
import { ImCart } from "react-icons/im"
import { FaUserCircle } from "react-icons/fa"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, Navigate, useNavigate } from 'react-router-dom'
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
  let userData = JSON.parse(localStorage.getItem('login')) || [];

  //console.log(userData.user.role)

  const handledelete = () => {
    localStorage.removeItem('login');
    window.location.reload()
    navigate('/')
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} width={"80%"} margin="auto">
          <Link to='/'>
            <Box>
              <img src="https://prodstatic.shoppersstop.com/_ui/updated_path/images/rectangle_logo_black.svg" alt="LOGO" />
            </Box>
          </Link>

          <Input placholder="Search for product name" height={50} width={200} />
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={4} >
              <Link to='/product'>
                <Heading as='h5' size='sm' marginTop={"4px"}>
                  Products
                </Heading>
              </Link>
              <Link to='/cart'>
                <Box className='outer'>
                  <ImCart size='22px' />
                  <Box className='jadu'>0</Box>
                </Box>
              </Link>
              <Button onClick={toggleColorMode} size="25px">
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <FaUserCircle color='black' size="25px" />
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