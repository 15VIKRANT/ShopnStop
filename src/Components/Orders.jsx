import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Image } from '@chakra-ui/react';
export const Orders = () => {

        const [orderdetails, setOrderdetails] =useState([]);
        const {id}=useParams();

         const orderList=()=>{
           axios.get(`http://localhost:5100/orders/${id}`)
           .then((res)=>{
             setOrderdetails(res.data)     
           })
           .catch((err)=>{
              console.log({err:err.message})
           }) 
          }
    
        

        useEffect(()=>{
            orderList()
        },[])

        return (
            <div>
                {orderdetails.length==0 ? <h2>No Orders exists for this user</h2> :<></>}
                {orderdetails ? <>{orderdetails?.map((e)=>{
                 return (
                     <div>
                     <h2>{e.name}</h2>
                     <h4>{e.shortDescription}</h4>
                     <Image src={e.image}/>
                     <Button>Update to Dispatch</Button>
                     <Button>Update to Delivered</Button>
                     </div>
                 )
             })}</>: <> 
                <h1> No Order Exists for this user</h1> 
                </>}
             
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
        

