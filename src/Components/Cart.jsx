import { Box, Image, Input, Flex, Button, SimpleGrid, HStack, Center, Text, Heading } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import "./cart.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdSmartDisplay } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiCoupon3Fill } from "react-icons/ri"
export const Cart = () => {
  const [cartdata, setCartdata] = useState([]);
  const [coupon, setCoupon] =useState("");
  const navigate = useNavigate()
  let userData = JSON.parse(localStorage.getItem("login"));
  let id = userData.user._id;

  const Display=()=>{
    axios
      .get(`https://myshop-backend-556t.onrender.com/${id}`)
      .then((r) => {
        setCartdata(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increment = (e) => {
    axios
      .patch(
        `https://myshop-backend-556t.onrender.com/${e._id}`, { count: e.count + 1 },
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log({ err: err.message });
      });

    console.log(e._id);
  };



 
  const decrement = (e) => {
    axios
      .patch(
        `https://myshop-backend-556t.onrender.com/cart/${e._id}`,
        { count: e.count - 1 },
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log({ err: err.message });
      });

    console.log(e._id);
  };
  let sum = 0;
  cartdata.forEach((e) => {
    sum += e.salePrice * e.count;
  });

  let GST = 0;
  cartdata.forEach((e) => {
    GST += e.salePrice * (18 / 100) * e.count;
  });

  var total = (Number(sum.toFixed(2)) + Number(GST.toFixed(2))).toFixed(2);

  const submitcoupon=()=>{
    console.log(coupon)
    if(coupon=="shopnstop")
    {   
              total=total*(50/100);
            }
       }
          


  const handleDelete = (e) => {
    axios
      .delete(`https://myshop-backend-556t.onrender.com/cart/${e._id}`)
      .then((res) => {
        console.log(res, "deleted");
      })
      .catch((err) => {
        console.log({ err: err.message });
      });
  };

  useEffect(() => {
    Display();
  }, [cartdata]);



  const paymentHandler = async (e) => {

    axios.post(`https://myshop-backend-556t.onrender.com/orders`,cartdata)
    .then((res)=>{
      console.log(res.data , "added to orders succesfully")
    })
    .catch((err)=>{
      console.log({err: err.message})
    })
    
    alert("Your order is placed successfully")
    axios.delete(`https://myshop-backend-556t.onrender.com/cart/deleteall/${id}`)
      .then((r) => console.log(r))
      .catch((e) => console.log({ error: e.message }))
    navigate("/")
  };


  
  return (
    <Box width={"80%"} display="flex" margin={"auto"}>
      <Box width={"50%"} >
        <Box>
          {cartdata.length!==0 ? <Box>
            {cartdata?.map((e) => {
            return (
              <SimpleGrid key={e._id} columns={[2, null, 5]} spacing='10px' mt={"20px"}>
                <Center>
                  <Box  >
                    <Image className="image" src={e.image}></Image>
                  </Box>
                </Center>
                <Center>
                  <Box fontFamily={"cursive"}>{e.name}</Box>
                </Center>
                <Center>
                  <Box fontFamily={"cursive"}>₹{e.salePrice}</Box>
                </Center>
                <Center>
                  <Box  >
                    <Button value="inc" disabled={e.count == 5} onClick={() => increment(e)}> + </Button>
                    <p>{e.count}</p>
                    <Button value="inc" disabled={e.count == 1} onClick={() => decrement(e)}> - </Button>
                  </Box>
                </Center>
                <Center>
                  <Box>
                    <Button onClick={() => handleDelete(e)}>
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Center>
              </SimpleGrid>
            );
          })}
          </Box>:
           <Box>
            <Heading>
            Your Cart is Empty!! 
            </Heading>
            <Link to='/product'>
              <Heading>
              Click Here to Continue
              </Heading>
             </Link>
             </Box>}
         
        </Box>
      </Box>
      <Box width={"50%"}>
        <Box width={"70%"} m={"auto"}>
          <Box maxW='32rem'>
            <Heading mb={4} >Modern online and offline payments for India</Heading>
            <Text fontSize='xl'>
              Paystack helps User in India get paid by anyone, anywhere in the
              world
            </Text>
          </Box>
          <Box border={"1px solid black"} mt={"10px"} display={"flex"} justifyContent={"space-around"}>
            <RiCoupon3Fill size={"30px"} />
            <Text fontSize='xl' >Apply for coupon</Text>
            <input type="text" onChange={(e)=>{setCoupon(e.target.value)}} placeholder="Enter coupon" />
          
          </Box>
          <Box border={"1px solid black"} mt={"10px"}>
            <Box mt={"10px"} fontSize='xl'>
              Cart value : {sum.toFixed(2)}
            </Box>
            <Box mt={"10px"} fontSize='xl'>
              GST : {GST.toFixed(2)}
            </Box>
            <Box mt={"10px"} fontSize='xl'>
              Retail Discount : 10%
            </Box>
            <Box mt={"10px"} fontSize='xl'>
              Delivery & Assembly Charges Extra. Enter Pincode To Know
            </Box>
            <input type="text" placeholder="Enter Your City Pincode" />
            <Box border={"1px solid black"} mt={"20px"} fontSize='xl'>
              Total :{total}
            </Box>
          </Box>
          <Box mt={"10px"}>
            <Button onClick={paymentHandler} bg={"rgb(157,172,204)"} width={"100%"}>Checkout</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
