import {
  Box,
  Center,
  Heading,
  Text,
  Image,
  Input,
  Flex,
  Button,
  Stack,
  Badge,
  Avatar,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons'
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
        axios.get(`http://localhost:5001/cart/${id}`)
        .then((r)=>{   

           setCartdata(r.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const increment=(e)=>{
          axios.patch(`http://localhost:5001/cart/${e._id}`,{"count":e.count+1},
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
      
      
          axios.patch(`http://localhost:5001/cart/${e._id}`,{"count":e.count-1},
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

    let GST=0;
    cartdata.forEach((e)=>{
      GST+=((e.salePrice)*(18/100))*e.count;
    })

    let total=(Number(sum.toFixed(2))+Number(GST.toFixed(2))).toFixed(2)

    const handleDelete=(e)=>{
      axios.delete(`http://localhost:5001/cart/${e._id}`)
      .then((res)=>{
        console.log(res, "deleted")
      })
      .catch((err)=>{
        console.log({err:err.message}
          )});

    }

    const Coupon ='viketan' 

    useEffect(()=>{
        Display()
    },[cartdata])

 const handlecode=(e)=>{
     if(e.key=='enter')
     {
        if(e.target.value =='viketan')
        {        
          total=total - (total*(20/100)) 
        }
     }
 }

  return (
      <Box className='Outercontainer'>
        <Box>      
  {
     cartdata?.map((e)=>{
    return(
      <div className="app">
       <Box className='outer'>
        <Flex alignItems={'center'}>
          <Button onClick={()=>handleDelete(e)}><DeleteIcon/></Button> 
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
  <Box>SubTotal :{sum.toFixed(2)}</Box>
  <Box>GST: {GST.toFixed(2)}</Box>
  <Flex>
   <Box>Add Coupon</Box>
   <Box> <Input placeholder="Enter Code"  onKeyPress={handlecode} /></Box>
  </Flex>
  <Box>Total :{total}</Box> 
 </Box>
  </Box>
  );
}


