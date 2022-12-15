import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { CaptionCarousel } from './carousel'
import Footer from './Footer'

export const Home = () => {
  return (
    <div>
      <Flex justifyContent={'space-around'} width={"80%"} margin={"auto"} mt={"30px"}>
        <Box>
          <Box width={200} height={200}>
            <Image src='https://images.unsplash.com/photo-1583922606661-0822ed0bd916?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>
          </Box>
          <Box width={200} height={150}>
            <Image src='https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>
          </Box>
        </Box>
        <CaptionCarousel />
        <Box>
          <Box width={200} height={200}>
            <Image src='https://images.unsplash.com/photo-1583922606661-0822ed0bd916?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>
          </Box>
          <Box width={200} height={150}>
            <Image src='https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </div>

  )
}
