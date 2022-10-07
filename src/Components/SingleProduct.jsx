import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
  import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { MdLocalShipping } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
  
  export  const SingleProduct=()=>{
  const navigate= useNavigate()
    let [productdata,setProductdata]=useState([])
    const [already,setAlready]=useState(false)
    const {id}=useParams()
    console.log(id)


   const displayData=()=>{
  
    axios.get(`http://localhost:5000/product/${id}`).then((res)=>{
        setProductdata(res.data)
    })
    .catch((error)=>{
        console.log({err:error.message})
    })
   }    

   
    let userData=JSON.parse(localStorage.getItem('login')) || []
    console.log(userData, "p[{}}{")
    console.log(productdata);
   if(userData.length!==0)
   {
           var obj={...productdata, "userId": userData.user._id};
   } 
  
    const handleChange=()=>
    {
              axios.get(`http://localhost:5000/cart/${productdata._id}`)
                   .then((r)=>{
                       setAlready(true);
                   })
     
      if(userData.length==0)
      {
       alert("please login for shopping")
        navigate('/login' ,{required:true})
      }
      
      else{
        if(already==true)
        {
          alert("ALready added to the cart")
        }
        {
        axios.post('http://localhost:5000/cart',obj)
         .then((r)=>{
            console.log(r);
            alert('added to Cart')         
         })
         .catch((err)=>{
            console.log({err:err.message})
        })
      }
    }

            
    }

    useEffect(() => {
      
    displayData()
    
    }, [already])

    return (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={
                productdata.image
            }
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {productdata.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
               ₹ {productdata.salePrice}
              </Text>
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
    
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Features
                </Text>
  
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2} alignContent={'left'}>
                    <ListItem>Shipping: {productdata.shipping}</ListItem>
                    <ListItem>Category: {productdata.categories}</ListItem>{' '}
                    <ListItem>Manufacturer: {productdata.manufacturer}</ListItem>
                    <ListItem>Best Selling Rank: {productdata.bestSellingRank}</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>Anti‑magnetic</ListItem>
                    <ListItem>Chronometer</ListItem>
                    <ListItem>Small seconds</ListItem>
                  </List>
                 
                </SimpleGrid>
              
              </Box>
            </Stack>
  
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              onClick={handleChange}
              >
              Add to cart
             
            </Button>
            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }