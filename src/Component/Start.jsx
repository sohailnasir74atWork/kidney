import React, { useEffect } from 'react';
import "./Styles/registration.css"
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { doSignInWithGoogle } from '../Auth/firebase/firebase';
import { useAuth } from '../Auth/context/authContext/Index';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to '/go' if the user is logged in
    
    if (userLoggedIn) {
      navigate('registration');
    }
  }, [userLoggedIn]);
  return (
    <Box  sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Adjust the height of the container as needed
    }}>
      <Button variant='contained' onClick={doSignInWithGoogle}>Start</Button>
    </Box>
  );
};

export default Start;
