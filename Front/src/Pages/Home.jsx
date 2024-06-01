import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Image,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import satelliteImage from '../Images/iss.png';  // Adjust the path according to your project structure

const Home = () => {
  return (
    <Box bg="gray.50" minH="100vh" p={8}>
      <VStack spacing={10} textAlign="center">
        <Flex justify="center" align="center" direction="column" mb={10}>
          <Image src={satelliteImage} boxSize="150px" mb={5} />
          <Heading size="2xl" color="teal.500">
            Welcome to Satellite Tracker
          </Heading>
          <Text fontSize="lg" color="gray.700" mt={4} maxW="2xl">
            Track and explore information about various satellites orbiting the Earth. Stay updated with the latest data and monitor the skies above you in real-time.
          </Text>
          <Button as={RouterLink} to="/tracker/3565" colorScheme="teal" size="lg" mt={6}>
            Start Tracking
          </Button>
        </Flex>

        <Divider />

        <Flex justify="center" wrap="wrap" spacing={10} mt={10}>
          <Box
            bg="white"
            boxShadow="md"
            borderRadius="md"
            p={6}
            m={4}
            textAlign="left"
            maxW="sm"
            flex="1"
          >
            <Heading size="md" color="teal.500" mb={4}>
              Track Satellites
            </Heading>
            <Text color="gray.600" mb={4}>
              Track the current position and trajectory of various satellites in real-time.
            </Text>
            <Button as={RouterLink} to="/tracker/3565" colorScheme="teal">
              Go to Tracker
            </Button>
          </Box>
          <Box
            bg="white"
            boxShadow="md"
            borderRadius="md"
            p={6}
            m={4}
            textAlign="left"
            maxW="sm"
            flex="1"
          >
            <Heading size="md" color="teal.500" mb={4}>
              Satellite Information
            </Heading>
            <Text color="gray.600" mb={4}>
              Browse detailed information about satellites, including their status and catalog names.
            </Text>
            <Button as={RouterLink} to="/satellites" colorScheme="teal">
              View Satellites
            </Button>
          </Box>
          <Box
            bg="white"
            boxShadow="md"
            borderRadius="md"
            p={6}
            m={4}
            textAlign="left"
            maxW="sm"
            flex="1"
          >
            <Heading size="md" color="teal.500" mb={4}>
              About Us
            </Heading>
            <Text color="gray.600" mb={4}>
              Learn more about our mission and the team behind the Satellite Tracker project.
            </Text>
            <Button as={RouterLink} to="/about" colorScheme="teal">
              About Us
            </Button>
          </Box>
        </Flex>

        <Divider />

        <Box textAlign="center" mt={10}>
          <Text color="gray.500">
            &copy; {new Date().getFullYear()} Satellite Tracker. All rights reserved 2024.
          </Text>
          <HStack spacing={4} justify="center" mt={4}>
            <Button as={RouterLink} to="/contact" variant="link" colorScheme="teal">
              Contact
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
