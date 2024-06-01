import React from 'react'
import {Image, Box, Heading, Text, VStack ,Icon} from '@chakra-ui/react';
import {Link} from "react-router-dom"
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import Aboutus from "../Images/aboutus.jpg"
const About= () => {
    return (
      <Box p={8}>
        <VStack spacing={8} align="center">
       <Image src={Aboutus} alt="about us"  boxSize="350px" borderRadius="50" /> 
          <Heading as="h1" size="xl">
            About Us
          </Heading>
          <Text fontSize="lg">
            Welcome to our website! We are dedicated to providing you with the
            latest information about satellites in Earth's orbit.
          </Text>
          <Text fontSize="lg">
            Our mission is to make satellite tracking accessible to everyone. Whether
            you're an enthusiast, a researcher, or just curious about what's above
            us, we're here to help.
          </Text>
          <Text fontSize="lg">
            Feel free to explore our website and discover the fascinating world of
            satellites. If you have any questions or suggestions, don't hesitate
            to <Link to="/contact" color="teal.300" _hover={{ color: 'Blue.700' }}>
            contact us
            <Icon as={BsArrowUpRightCircleFill} ml={1} />
          </Link>.
          </Text>
        </VStack>
      </Box>
    );
  }

export default About