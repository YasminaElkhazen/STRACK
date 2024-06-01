// ContactPage.js
import React from 'react';
import { Box, Heading, Text, Flex, Image, VStack } from '@chakra-ui/react';
import Imagee from "../Images/yasmina.PNG"
const Contact = () => {
  return (
    <Flex justifyContent="center" alignItems="center" >
      <Box
        bg="gray.100"
        p={8}
        mt={50}
        borderRadius="lg"
        boxShadow="lg"
        transition="transform 0.3s ease-in-out"
        _hover={{ transform: 'translateY(-5px)' }}
      >
        <Flex direction={{ base: 'column', md: 'row' }} alignItems="center">
          <Image src={Imagee} alt="Yasmina"  boxSize="350px" borderRadius="50" />
          <VStack ml={{ base: 0, md: 4 }} mt={{ base: 0, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
            <Heading as="h2" size="lg">Yasmina Elkhazen</Heading>
            <Text mt={2} fontSize="lg">Engineering Student</Text>
            <Box
              bg="gray.300"
              p={2}
              borderRadius={5}
            >
              <Text  fontSize="lg">yasmina.elkhazen@outlook.com</Text>
            </Box>
            <Text mt={2}>
                Applied Mathematics and Modelling Engineering Student
            </Text>
          </VStack>
        </Flex>
      </Box>
      <Box
        bg="gray.100"
        p={8}
        mt={50}
        ml={20}
        borderRadius="lg"
        boxShadow="lg"
        transition="transform 0.3s ease-in-out"
        _hover={{ transform: 'translateY(-5px)' }}
      >
        <Flex direction={{ base: 'column', md: 'row' }} alignItems="center">
          <Image  alt="Binoma image"  boxSize="350px" borderRadius="50" />
          <VStack ml={{ base: 0, md: 4 }} mt={{ base: 0, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
            <Heading as="h2" size="lg">binoma</Heading>
            <Text mt={2} fontSize="lg">Engineering Student</Text>
            <Box
              bg="gray.300"
              p={2}
              borderRadius={5}
            >
              <Text  fontSize="lg">flena@benfaltena.com</Text>
            </Box>
            <Text mt={2}>
                Applied Mathematics and Modelling Engineering Student
            </Text>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Contact;
