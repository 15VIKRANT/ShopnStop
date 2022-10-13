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
  import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios' 
import './dashboard.css'
import { MdPowerSettingsNew } from 'react-icons/md';
  const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';
  
   const Dashboard=()=>{
    
    const [product , setProduct] = useState(true)
   const [data,setData]=useState([]);
   const[name,setName]=useState("");
   const [newdata,setNewdata] = useState(false);
   const [user, setUser]=useState(false);
   const handle=(e)=>{
         setName(e.target.value)
    }
    
   const displayData=(name,sort)=>{

    axios.get('https://stopnshops.herokuapp.com/product').then((res)=>{
      var array=res.data;
      var array = array.filter((e) =>
      e.manufacturer.includes(name)
    );
      setData(array);  
    })
    .catch((error)=>{
        console.log({err:error.message})
    })

   }    
   
   let userData=JSON.parse(localStorage.getItem('login'))

   const handlechange=(e)=>{
    setName(e.target.value)
   }
   
   useEffect(() => {
      
    displayData(name)
      
    }, [name])
    

  const handleUsers=(e)=>{
     setProduct(false)
    
     setNewdata(false)
     setUser(true)
  }

  
  const handleProduct=(e)=>{
    setProduct(true)
    setNewdata(false)
    setUser(false)
 }
 
 const handleOrder=(e)=>{
  setProduct(false)
  setNewdata(false)
  setUser(false)
}

const handleNew=(e)=>{
  setProduct(false)
  setNewdata(true)
  setUser(false)
}
    return (
            <div className='innerbox'>
                <Box className='sidebar'>
                <Button  onClick={handleUsers}>Users</Button>
                <Button  onClick={handleProduct}>Products</Button>
                <Button  onClick={handleNew}>Add New Product</Button>
            </Box>
            <Box className='rightbox'>
              
              {user ? <Users/> :<></>}
              {newdata ? <NewData/>: <></>}
              {}
              {product ?  
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
       </Box> : <></>}
      
       </Box>
      
      </div>

      
      
    );
  }

  export default Dashboard

  const Users=()=>{
      const [userlist,setUserlist]=useState([]);
     
      const displayusers=()=>{
      axios.get('https://stopnshops.herokuapp.com/user')
        .then((res)=>{
          setUserlist(res.data.user)
            //console.log(userlist, "userlist");
        })
        .catch((err)=>{
           console.log({err:err.message})
        })  
    }
 

    useEffect((e)=>{

        displayusers()
        })

        return (
          <Box >         
           {userlist?.map((e)=>{

            return (
              <Box className='userlist' border={'2px'} width={'950px'} key={e._id}>
                <h3>{e.firstname}</h3>
                <h4>{e.lastname}</h4>
                <h4>{e.email}</h4>
                <Link to={`/orders/${e._id}`}>Orders</Link>
              </Box>
            )
           })}
          </Box>

        )
 }




 const NewData=()=>{
    return(
       <Box>
       Mythbuster 
    </Box>
    )
 }