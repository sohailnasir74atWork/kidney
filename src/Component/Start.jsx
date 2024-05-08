import React, { useEffect, useContext, useState } from 'react';
import "./Styles/registration.css";  // Make sure the path to the CSS file is correct
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/context/authContext/Index';  // Adjust the import path as necessary
import { useGlobalStats } from '../GlobelStats/GlobelStats';
import CircularColor from '../Helper/Loader';
import logo from "./../Assets/logo2.png"
import { auth } from "./../Auth/firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo
} from "firebase/auth";

const Start = () => {
  const { isLoading, error, } = useGlobalStats()
  const [newUser, setNewUser] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !error) {
      if (newUser  == 'old') {
        navigate('/home');  // Navigate to the Home page if user data is loaded
        console.log('delayed console happened')
      } else if(newUser == 'new') {
        navigate('/registration');  // Navigate to the Registration page if user data is not available
      }
    }
  }, [newUser]);

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
  const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Complete sign-in result:", result); // Log the complete result
      const additionalUserInfo = getAdditionalUserInfo(result)
      const isNewUser = additionalUserInfo.isNewUser
       if(isNewUser){setNewUser("new")}
      else {setNewUser("old")}
      console.log("Is new user based on time comparison:", isNewUser);
  
      return {
        user: result.user,
      };
    } catch (error) {
      console.error("Error with Google sign-in: ", error);
      throw error;
    }
  };
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