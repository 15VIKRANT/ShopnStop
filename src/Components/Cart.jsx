import {
  Box,
  Center,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  Stack,
  
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import './cart.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdSmartDisplay } from 'react-icons/md';
import { useParams } from 'react-router-dom';

export const Cart=()=>{
    const [cartdata, setCartdata]=useState([])
    
    let userData=JSON.parse(localStorage.getItem('login'))
    let id=userData.user._id;
  
    const Display=()=>{
        axios.get(`http://localhost:5000/cart/${id}`)
        .then((r)=>{   

           setCartdata(r.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    console.log(cartdata)
    useEffect(()=>{
        Display()
    },[])

  return (
      <Flex>
      
      <Box className='leftbox'>
                 {cartdata?.map((e)=>{
            
            return (
                <>
                <Box className='cart'>
            <Box>
            <Image src={e.image}/>
            <h3>{e.name}</h3>
              </Box>
              <Box className='counter'>
            <Button>+</Button>
            <p>1</p>
            <Button>-</Button>
            </Box>
            </Box>
                 </>
                 )
         })}
         </Box>
         <Box>
One two ka four
      </Box>
      </Flex>
  );
}