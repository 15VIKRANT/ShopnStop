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
  Divider,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, Select
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, ScrollRestoration } from 'react-router-dom'
import axios from 'axios'
import './product.css'
import Images_Corolse from './Images_Corolse';
const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export const Products = () => {

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [sort, setSort] = useState("");

  const handle = (e) => {
    //e.preventDefault();
    setName(e.target.value)

  }
  console.log(name)

  const displayData = (name, sort) => {

    axios.get('https://stopnshops.herokuapp.com/product').then((res) => {
      var array = res.data;
      var array = array.filter((e) =>
        e.manufacturer.includes(name)
      );
      if (sort == "asc") {
        array.sort((a, b) => a.salePrice - b.salePrice)
        setData(array)
      }
      else if (sort == "desc") {
        array.sort((a, b) => b.salePrice - a.salePrice)
        setData(array)
      }
      else {
        setData(array);
      }
    })
      .catch((error) => {
        console.log({ err: error.message })
      })
  }

  let userData = JSON.parse(localStorage.getItem('login'))

  const handlechange = (e) => {
    setName(e.target.value)
  }

  const handleC = (e) => {
    setSort(e.target.value)
  }

  useEffect(() => {
    displayData(name, sort)
  }, [name, sort])

  // console.log(data);

  return (

    <Box className='outercontainer' width={"80%"} margin="auto" >
      <Box className='fixeditem' width={"20%"} >
        <Breadcrumb fontWeight='medium' fontSize='sm' mt={"10px"}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Products</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box mt={"10px"}>
          <Heading as='h6' size='xs' mb={"10px"}>
            Filter
          </Heading>
          <Divider />
          <CheckboxGroup colorScheme='green'>
            <text>CATEGORIES</text>
            <Stack spacing={[1, 1]} direction={['column']}>
              <Checkbox value='Samsung' onChange={handle}>Samsung</Checkbox>
              <Checkbox value='Webroot' onChange={handle}>Webroot</Checkbox>
              <Checkbox value='Kaspersky' onChange={handle}>Kaspersky</Checkbox>
              <Checkbox value='Trend' onChange={handle}>Trend</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
      </Box>
      <Box className='products' width={"80%"} mt={"20px"}>
        <Box className='divider' mb={"20px"}>
          <Box>
            <Select placeholder='Select option' name="name" onChange={handleC}>
              <option value=''>Sort by Relevence</option>
              <option value='asc'>Low to High</option>
              <option value='desc'>High to Low</option>
            </Select>
          </Box>
        </Box>
        <div className='outerbox' >
          {data.map((e) => {
            return (
              <div className='product' onClick={handlechange} key={e._id} >
                <Link to={`/product/${e._id}`}>
                  <Center h='210px' color='white'>
                    <Image src={e.image} alt='image' />
                    {/* <Images_Corolse image1={e.image} image2={e.thumbnailImage} /> */}
                  </Center>
                  <Heading as='h6' size='xs' >
                    {e.name}
                  </Heading>
                  <h3>₹ {e.salePrice}</h3>
                </Link>
              </div>
            )
          })}

        </div>
      </Box>
    </Box>

  );
}