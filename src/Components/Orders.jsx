import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Heading, Image } from '@chakra-ui/react';
import {
  Box,
  Center,
  useColorModeValue,
  // Heading,
  Text,
  Stack,
  // Image,
} from '@chakra-ui/react';
const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export const Orders = () => {
  const color = useColorModeValue('white', 'gray.800')
  const [orderdetails, setOrderdetails] = useState([]);
  const { id } = useParams();
  const [isOrderupdate, setIsOrderupdate] = useState(false);
  let userData = JSON.parse(localStorage.getItem('login')) || [];
  const orderList = () => {
    axios.get(`https://myshop-backend-556t.onrender.com/orders/${id}`)
      .then((res) => {
        setOrderdetails(res.data)
      })
      .catch((err) => {
        console.log({ err: err.message })
      })
  }

  const handleDispatch = (e) => {

    e.preventDefault()
    axios.patch(`https://myshop-backend-556t.onrender.com/orders/updateorder/${e.target.value}`, { orderStatus: "Dispatch" })
      .then((res) => {

        setIsOrderupdate(!isOrderupdate)
      })
      .catch((error) => {
        console.log({ error: error.message })
      })
  }

  const handleDelivery = (e) => {
    e.preventDefault()
    axios.patch(`https://myshop-backend-556t.onrender.com/orders/updateorder/${e.target.value}`, { orderStatus: "Delivery" })
      .then((res) => {

        setIsOrderupdate(!isOrderupdate)
      })
      .catch((error) => {
        console.log({ error: error.message })
      })
  }

  const handleDelivered = (e) => {
    e.preventDefault()
    axios.patch(`https://myshop-backend-556t.onrender.com/orders/updateorder/${e.target.value}`, { orderStatus: "Delivered" })
      .then((res) => {
        setIsOrderupdate(!isOrderupdate)
      })
      .catch((error) => {
        console.log({ error: error.message })
      })
  }
  useEffect(() => {
    orderList()
  }, [isOrderupdate])

  return (
    <div>
      {userData.length !== 0 && userData.user.role == "admin" ?
        <div>
          {orderdetails?.map((e) => {
            return (
              <div style={{ border: "1px solid black", margin: "2px", textAlign: "center" }}>
                <Center py={12}>
                  <Box
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={color}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>
                    <Box
                      rounded={'lg'}
                      mt={-12}
                      pos={'relative'}
                      // height={'230px'}
                      _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${e.image})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: 'blur(20px)',
                        },
                      }}>
                      <Image
                        rounded={'lg'}
                        margin="auto"
                        marginTop={"10px"}
                        width={150}
                        objectFit={'cover'}
                        src={e.image}
                      />
                    </Box>
                    <Stack pt={10} align={'center'}>
                      <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {e.name}
                      </Text>
                      <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {e.shortDescription}
                      </Heading>
                      <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                          ₹{e.salePrice}
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Center>
                <Button margin={2} value={e._id} onClick={handleDispatch}>Update to Dispatch</Button>
                <Button margin={2} value={e._id} onClick={handleDelivery}>Update to Out for Delivery</Button>
                <Button margin={2} value={e._id} onClick={handleDelivered}>Update to Delivered</Button>
              </div>
            )
          })}
        </div>
        : <div>
          {orderdetails?.map((e) => {
            return (
              <div style={{ border: "1px solid black", margin: "2px", textAlign: "center" }}>
                <Heading width={500} fontSize={15}>{e.name}</Heading>
                <h4>{e.shortDescription}</h4>
                <h4>{e.salePrice}</h4>
                <h4>Quantity :{e.count}</h4>
                <h4>Current State: {e.orderStatus == "Dispatch" ? <h4>Your Parcel is dispatched from our center it will be delivered within 2-3 business days</h4> : <h4></h4>}
                  {e.orderStatus == "Delivery" ? <h4>Your Order is out for delivery you can expect your order by the end of the day</h4> : <h4></h4>}
                  {e.orderStatus == "Delivered" ? <h4>Your Order is Sucessfully Delivered Mr.{userData.user.firstname}!! Feel free to give feedback, Happy Shopping</h4> : <h4></h4>}</h4>
                <Image src={e.image} />
              </div>
            )
          })}
        </div>
      }


      {orderdetails.length == 0 ? <h2>No Orders exists for this user</h2> : <></>}


    </div>
  )


  // name
  // "Webroot SecureAnywhere AntiVirus 2014 - Mac/Windows"
  // shortDescription
  // "Protect all of your Macs and PCs with one multilayered security soluti…"
  // bestSellingRank
  // 2561
  // thumbnailImage
  // "http://img.bbystatic.com/BestBuy_US/images/products/1704/1704023_54x10…"
  // salePrice
  // 39.99

}


