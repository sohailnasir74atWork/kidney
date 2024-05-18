import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/context/authContext/Index';
import { useGlobalStats } from '../GlobelStats/GlobelStats';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularColor from '../Helper/Loader';
import logo from "./../Assets/logo2.webp";
import { auth } from "./../Auth/firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo
} from "firebase/auth";

const Start = () => {
  const { isLoading, error } = useGlobalStats();
  const [newUser, setNewUser] = useState(null); // Change initial state to null
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (!isLoading && !error) {
      if (userLoggedIn) {
        if (newUser === 'new') {
          navigate('/registration');
        } else if (newUser === 'old') {
          navigate('/home');
        }
      } else {
        // User is not logged in, handle accordingly (e.g., display login button or redirect to login page)
      }
    }
  }, [newUser, userLoggedIn, isLoading, error, navigate]);

  const handleLogin = async () => {
    try {
      await doSignInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  if (isLoading) {
    return <CircularColor />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const additionalUserInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalUserInfo.isNewUser;
      setNewUser(isNewUser ? 'new' : 'old'); // Update newUser state based on whether the user is new or old
    } catch (error) {
      console.error("Error with Google sign-in: ", error);
      throw error;
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      height: isMobile ? '100%' : '100vh',
      marginTop: isMobile ?  '150px' : ''
    }}>
      <img src={logo} alt='logo' className='fade-in-out' />
      <Button variant='contained' onClick={handleLogin}>Dashboard with One Click</Button>
    </Box>
  );
};

export default Start;
