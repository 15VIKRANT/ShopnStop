import { Box, Image, Input, Flex, Button, SimpleGrid, HStack, Center, Text, Heading } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import "./cart.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdSmartDisplay } from "react-icons/md";
import { useParams } from "react-router-dom";
import { RiCoupon3Fill } from "react-icons/ri"
export const Cart = () => {
  const [cartdata, setCartdata] = useState([]);

  let userData = JSON.parse(localStorage.getItem("login"));
  let id = userData.user._id;

  const Display = () => {
    axios
      .get(`http://localhost:8000/cart/${id}`)
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
        `http://localhost:8000/cart/${e._id}`,
        { count: e.count + 1 },
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
        `http://localhost:8000/cart/${e._id}`,
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

  let total = (Number(sum.toFixed(2)) + Number(GST.toFixed(2))).toFixed(2);

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:8000/cart/${e._id}`)
      .then((res) => {
        console.log(res, "deleted");
      })
      .catch((err) => {
        console.log({ err: err.message });
      });
  };

  const Coupon = "code";

  useEffect(() => {
    Display();
  }, [cartdata]);

  const handlecode = (e) => {
    if (e.key === "enter") {
      if (e.target.value === "code") {
        total = total - total * (20 / 100);
      }
    }
  };

  const paymentHandler = async (e) => {
    const API_URL = "http://localhost:8000/";
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await axios.get(orderUrl);
    const { data } = response;
    const options = {
      key: "rzp_test_UWWM0EkZk45wcb",
      name: "shopNstop",
      description: "Aapka cut Chuka Hai",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          const captureResponse = await axios.post(url, {});
          console.log("data",captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    // <Box className="Outercontainer">
    //   <Box>
    //     {cartdata?.map((e) => {
    //       return (
    //         <div className="app">
    //           <Box className="outer" display={"flex"}>
    //             <Image className="image" src={e.image}></Image>
    //             <Box>{e.name}</Box>
    //             <Box>{e.salePrice}</Box>
    //             <Box>
    //               <Button value="inc" disabled={e.count == 5} onClick={() => increment(e)}> + </Button>
    //               <p>{e.count}</p>
    //               <Button value="inc" disabled={e.count == 1} onClick={() => decrement(e)}> - </Button>
    //             </Box>
    //             <Button onClick={() => handleDelete(e)}>
    //               <DeleteIcon />
    //             </Button>
    //           </Box>
    //         </div>
    //       );
    //     })}
    //   </Box>
    //   <Box className="rightcontainer">
    //     <Box>SubTotal :{sum.toFixed(2)}</Box>
    //     <Box>GST: {GST.toFixed(2)}</Box>
    //     <Flex>
    //       <Box>Add Coupon</Box>
    //       <Box>
    //         {" "}
    //         <Input placeholder="Enter Code" onKeyPress={handlecode} />
    //       </Box>
    //     </Flex>
    //     <Box>Total :{total}</Box>
    //     <Button onClick={paymentHandler}>Checkout</Button>
    //   </Box>
    // </Box>

    <Box width={"80%"} display="flex" margin={"auto"}>
      <Box width={"50%"} >
        <Box>
          {cartdata?.map((e) => {
            return (
              <SimpleGrid columns={[2, null, 5]} spacing='10px' mt={"20px"}>
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
            <input type="text" placeholder="Enter coupon" />
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
              Total :{GST + (sum.toFixed(2) - 13)}
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
