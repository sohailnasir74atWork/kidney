import React, { useEffect, useContext } from 'react';
import "./Styles/registration.css";  // Make sure the path to the CSS file is correct
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/context/authContext/Index';  // Adjust the import path as necessary
import { doSignInWithGoogle } from '../Auth/firebase/firebase';  // Adjust the import path as necessary
import { useGlobalStats } from '../GlobelStats/GlobelStats';
import CircularColor from '../Helper/Loader';
import logo from "./../Assets/logo2.png"
const Start = () => {
  const { userLoggedIn } = useAuth();
  const { userData, isLoading, error, } = useGlobalStats()
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !error) {
      if (userLoggedIn && userData) {
        navigate('/home');  // Navigate to the Home page if user data is loaded
      } else if (userLoggedIn && !userData) {
        navigate('/registration');  // Navigate to the Registration page if user data is not available
      }
    }
  }, [userLoggedIn, userData, isLoading, error, navigate]);

  const handleLogin = async () => {
    try {
      await doSignInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  if (isLoading) {
    return <CircularColor/>;  // Show a loading message while data is loading
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Show an error message if there is an error
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection:'column',
      alignItems: 'center',
      height: '100vh',  // Adjust the height of the container as needed
    }}>
      <img src={logo} alt='logo' className='fade-in-out'/>
      <Button variant='contained' onClick={handleLogin}>Login with One Click</Button>
    </Box>
  );
};

export default Start;
