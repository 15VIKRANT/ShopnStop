import {
  Box,
  Center,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  Stack,
  Badge,
  Avatar,
  useColorModeValue,
  Spacer,
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

    const increment=(e)=>{
          axios.patch(`http://localhost:5000/cart/${e._id}`,{"count":e.count+1},
          {
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
          .then((res)=>{
            console.log(res)
          })
          .catch((err)=>{
            console.log({err:err.message}
              )});

              console.log(e._id)
        
    }

    const decrement=(e)=>{
      
      
          axios.patch(`http://localhost:5000/cart/${e._id}`,{"count":e.count-1},
          {
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
          .then((res)=>{
            console.log(res)
          })
          .catch((err)=>{
            console.log({err:err.message}
              )});

              console.log(e._id)
        
    }
    let sum = 0;
    cartdata.forEach((e)=>{
      sum+=e.salePrice * e.count;
    })

    const handleDelete=(e)=>{
      axios.delete(`http://localhost:5000/cart/${e._id}`)
      .then((res)=>{
        console.log(res, "deleted")
      })
      .catch((err)=>{
        console.log({err:err.message}
          )});

    }
    

    useEffect(()=>{
        Display()
    },[cartdata])

  return (
      <Box className='Outercontainer'>
        <Box>      
  {
     cartdata?.map((e)=>{
    return(
      <div className="app">
       <Box className='outer'>
        <Flex alignItems={'center'}>
          <Button onClick={()=>handleDelete(e)}>Delete</Button> 
        </Flex>
        <Flex>
          <Box>
            <Image className='image' src={e.image}></Image></Box>  
        </Flex>
        <Flex>
        <Box className='dataname'>{e.name}</Box>
        <Box className='dataname'>{e.salePrice}</Box>
        </Flex>
        <Box>
          <Button value="inc" disabled={e.count==5}  onClick={()=>increment(e)}>+</Button>
          <p>{e.count}</p>
          <Button value="inc" disabled={e.count==1}  onClick={()=>decrement(e)}>-</Button>
        </Box>
       </Box> 
    </div>
    )
  })}
  </Box>
 
 <Box className='rightcontainer'>
  Total Sum: {sum}
 </Box>
  </Box>
  );
}


