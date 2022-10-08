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
import { Link, ScrollRestoration } from 'react-router-dom'
import axios from 'axios'
import './product.css'
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

    axios.get('http://localhost:5001/product').then((res) => {
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
  console.log(userData)


  const handlechange = (e) => {
    setName(e.target.value)
  }

  const handleC = (e) => {
    setSort(e.target.value)
  }

  useEffect(() => {

    displayData(name, sort)

  }, [name, sort])


  return (

    <Box className='outercontainer' width={"80%"} margin="auto">
      <Box className='fixeditem'>
        <Box>
          Filter by Category
          <br /><br />
          <CheckboxGroup colorScheme='green' >
            <Stack spacing={[1, 1]} direction={['column']}>
              <Checkbox value='Samsung' onChange={handle}>Samsung</Checkbox>
              <Checkbox value='Webroot' onChange={handle}>Webroot</Checkbox>
              <Checkbox value='Kaspersky' onChange={handle}>Kaspersky</Checkbox>
              <Checkbox value='Trend' onChange={handle}>Trend</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
      </Box>
      <Box className='products'>
        <Box className='divider'>
          <Box></Box>
          <Box>
            <select name="name" onChange={handleC}>
              <option >Sort by Price</option>
              <option value="">sort by Relevence</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </Box>
        </Box>
        <div className='outerbox'>

          {data.map((e) => {
            return (
              <div className='product' onClick={handlechange} key={e.id}>
                <Link to={`/product/${e._id}`}>
                  <Image src={e.image} alt='image' height={200} width={200} />
                  <h3>{e.name}</h3>
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