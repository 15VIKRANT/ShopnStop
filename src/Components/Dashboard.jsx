import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    GridItem,
    Flex,
    Button,
    Checkbox,
    CheckboxGroup,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {Link, ScrollRestoration} from 'react-router-dom'
import axios from 'axios' 
import './dashboard.css'
  const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';
  
   const Dashboard=()=>{
  
    const [data,setData]=useState([]);
    const[name,setName]=useState("");
    const [sort , setSort]=useState("");
    
    const handle=(e)=>{
         //e.preventDefault();
         setName(e.target.value)

    }
    console.log(name)

   const displayData=(name,sort)=>{
  
    axios.get('http://localhost:5000/product').then((res)=>{
      var array=res.data;
      var array = array.filter((e) =>
      e.manufacturer.includes(name)
    );
    if(sort=="asc")
    {
      array.sort((a,b)=>a.salePrice -b.salePrice)
      setData(array)
    }
    else if(sort=="desc")
    {
      array.sort((a,b)=>b.salePrice - a.salePrice)
      setData(array)
    }
    else{
      setData(array);
    }
    })
    .catch((error)=>{
        console.log({err:error.message})
    })

   }    
   
   let userData=JSON.parse(localStorage.getItem('login'))
    console.log(userData)


   const handlechange=(e)=>{
    setName(e.target.value)
   }
   
   const handleC=(e)=>{
    setSort(e.target.value)
   }
   
    useEffect(() => {
      
    displayData(name,sort)
      
    }, [name,sort])
    

    return (
       
      
        <div className='innerbox'>
            
            <Box className='sidebar'>
                <Box>Users</Box>
                <Box>Products</Box>
                <Box>Orders</Box>
                <Box>Add New Product</Box>
            </Box>
            <Box>
       {data.map((e)=>{
        return(
            <Box className='boxer'>
                <Box>{e.name}</Box>
                <Box>Rs {e.salePrice}</Box>
                <img src={e.image} />
                <Button>Edit</Button>
            </Box>
        )
       })}
       </Box>
      
      </div>

      
      
    );
  }


  export default Dashboard



  const Users=()=>{
     
    const [user,setUser]=useState([])
      const displayusers=()=>{
      
        axios.get('http://localhost:5000/user')
        .then((res)=>{
            setUser(res.data.user)
            console.log(user)
        })
        .catch((err)=>{
           console.log({err:err.message})
        })  
    }

    

  
    useEffect((e)=>{

        displayusers()
        })
 }