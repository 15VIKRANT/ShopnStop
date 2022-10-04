import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { CaptionCarousel } from './carousel'
import Footer from './Footer'

export const Home = () => {
  return (
    <div>
      <Flex justifyContent={'space-around'}>
      <Box>
    <Box width={200} height={200}>
      <Image src='https://mern-store-80202.herokuapp.com/images/banners/banner-2.jpg'/>
    </Box>
    <Box width={200} height={150}>
    <Image src='https://mern-store-80202.herokuapp.com/images/banners/banner-5.jpg'/>
    </Box>
        </Box>
    <CaptionCarousel/>
    <Box>
    <Box width={200} height={200}>
    <Image src='https://mern-store-80202.herokuapp.com/images/banners/banner-2.jpg'/>
    </Box>
    <Box width={200} height={150}>
    <Image src='https://mern-store-80202.herokuapp.com/images/banners/banner-5.jpg'/>
    </Box>
    </Box>
      </Flex>
    <Footer/>
    </div>

  )
}
