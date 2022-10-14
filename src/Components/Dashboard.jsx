import {
  Box,
  Center,
  // useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  GridItem,
  Flex,
  Button,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  // Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './dashboard.css'
import { MdPowerSettingsNew } from 'react-icons/md';
const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

const Dashboard = () => {

  const [product, setProduct] = useState(true)
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [newdata, setNewdata] = useState(false);
  const [user, setUser] = useState(false);
  const handle = (e) => {
    setName(e.target.value)
  }

  const displayData = (name, sort) => {

    axios.get('https://stopnshops.herokuapp.com/product').then((res) => {
      var array = res.data;
      var array = array.filter((e) =>
        e.manufacturer.includes(name)
      );
      setData(array);
    })
      .catch((error) => {
        console.log({ err: error.message })
      })

  }

  let userData = JSON.parse(localStorage.getItem('login'))

  const handlechange = (e) => {
    setName(e.target.value)
  }

  useEffect(() => {

    displayData(name)

  }, [name])


  const handleUsers = (e) => {
    setProduct(false)
    setNewdata(false)
    setUser(true)
  }


  const handleProduct = (e) => {
    setProduct(true)
    setNewdata(false)
    setUser(false)
  }

  const handleOrder = (e) => {
    setProduct(false)
    setNewdata(false)
    setUser(false)
  }

  const handleNew = (e) => {
    setProduct(false)
    setNewdata(true)
    setUser(false)
  }
  return (
    <div className='innerbox'>
      <Box className='sidebar'>
        <Button onClick={handleUsers} mt={"10px"}>Users</Button>
        <Button onClick={handleProduct} mt={"10px"}>Products</Button>
        <Button onClick={handleNew} mt={"10px"}>Add New Product</Button>
      </Box>
      <Box className='rightbox'>

        {user ? <Users /> : <></>}
        {newdata ? <NewData /> : <></>}

        {product ?
          <Box>
            {data.map((e) => {
              return (
                <Box className='boxer'>
                  <SimpleGrid columns={[2, null, 4]} spacing='40px'>
                    <Center>
                      <Box><img src={e.image} /></Box>
                    </Center>
                    <Center>
                      <Box>{e.name}</Box>
                    </Center>
                    <Center>
                      <Box fontSize={"2xl"}>Rs:{e.salePrice}</Box>
                    </Center>
                    <Center>
                      <Box><Button>Edit</Button></Box>
                    </Center>
                  </SimpleGrid>
                </Box>
              )
            })}
          </Box> : <></>}

      </Box>

    </div>



  );
}

export default Dashboard

const Users = () => {
  const [userlist, setUserlist] = useState([]);
  const color = useColorModeValue('gray.50', 'gray.900')

  const displayusers = () => {
    axios.get('https://stopnshops.herokuapp.com/user')
      .then((res) => {
        setUserlist(res.data.user)

      })
      .catch((err) => {
        console.log({ err: err.message })
      })
  }


  useEffect((e) => {
    displayusers()
  })

  return (
    <Box >
      {userlist?.map((e) => {

        return (

          <Box className='userlist' border={'2px'} key={e._id}>
            <Center py={6}>
              <Box
                maxW={'330px'}
                w={'full'}
                bg={color}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Stack
                  textAlign={'center'}
                  p={6}
                  color={color}
                  align={'center'}>
                  <Text
                    fontSize={'sm'}
                    fontWeight={500}
                    bg={color}
                    p={2}
                    px={3}
                    color={'green.500'}
                    rounded={'full'}>
                    Shop&Stop
                  </Text>
                  <Stack direction={'row'} align={'center'} justify={'center'}>
                    <Text fontSize={'3xl'}>$</Text>
                    <Text color={'gray.500'} fontSize={'6xl'} fontWeight={800}>
                      {e.firstname}
                    </Text>
                    <Text color={'gray.500'}>{e.lastname}</Text>
                  </Stack>
                </Stack>

                <Box bg={color} px={6} py={10}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="green.400" />
                      {e.email}
                    </ListItem>
                  </List>
                  <Link to={`/orders/${e._id}`}>
                    <Button
                      mt={10}
                      w={'full'}
                      bg={'green.400'}
                      color={'white'}
                      rounded={'xl'}
                      boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                      _hover={{
                        bg: 'green.500',
                      }}
                      _focus={{
                        bg: 'green.500',
                      }}>
                      Check Order
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Center>
          </Box>

        )
      })}

    </Box>

  )
}




const NewData = () => {
  return (
    <Box>
      Mythbuster
    </Box>
  )
}



