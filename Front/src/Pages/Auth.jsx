import React, { useState } from 'react';
import axios from 'axios';
import { Box, Alert, Image,AlertIcon, Input, Button, FormControl, FormLabel, Heading, Text } from '@chakra-ui/react';
import Iconn from "../Images/iss.png"
const Auth = ({ handleLogin }) => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterChange = e => {
    const { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLoginChange = e => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegisterSubmit = async e => {
    setError('');
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1000/register', registerData);
      console.log(response.data);
      // Handle success, maybe redirect to login page
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed');
      }
    }
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:1000/login', loginData);
      console.log(response.data);
      // Call handleLogin function with true if login is successful
      handleLogin(true);
      // Store the token in localStorage or state
      localStorage.setItem('token', response.data.idToken);
      // Handle success, maybe redirect to another page
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed');
      }
    }
  };

  const toggleForm = () => {
    setShowRegister(prevState => !prevState);
  };

  return (
    <Box maxW="400px" m="auto" mt="50px">
        <Image ml={14} src={Iconn}/>
      <Heading mb="4">{showRegister ? 'Register' : 'Login'}</Heading>
      {error && (
        <Alert status="error" mb="4">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {showRegister ? (
        <>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleRegisterSubmit}>Register</Button>
          <Text mt="2">Already have an account? <Button variant="link" color="blue" onClick={toggleForm}>Sign in</Button></Text>
        </>
      ) : (
        <>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleLoginSubmit}>Login</Button>
          <Text mt="2">Don't have an account? <Button variant="link" color="blue" onClick={toggleForm}>Register</Button></Text>
        </>
      )}
    </Box>
  );
};

export default Auth;
