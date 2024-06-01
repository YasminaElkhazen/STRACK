import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import AboutUs from './Pages/About';
import ContactUs from './Pages/Contact';
import Satellites from './Pages/Satellites';
import Tracker from './Pages/Tracker';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (isAuthenticated) => {
    setIsLoggedIn(isAuthenticated);
  };
  return (
    <div className="App">
      {isLoggedIn && <Navbar />} 
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/about" element={isLoggedIn ? <AboutUs /> : <Navigate to="/auth" />} />
        <Route path="/contact" element={isLoggedIn ? <ContactUs /> : <Navigate to="/auth" />} />
        <Route path="/satellites" element={isLoggedIn ? <Satellites /> : <Navigate to="/auth" />} />
        <Route path="/tracker/:id" element={isLoggedIn ? <Tracker /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!isLoggedIn ?<Auth handleLogin={handleLogin}/>: <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
