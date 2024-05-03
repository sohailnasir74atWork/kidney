import React, { useEffect } from 'react';
import "./Styles/registration.css"
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { doSignInWithGoogle } from '../Auth/firebase/firebase';
import { useAuth } from '../Auth/context/authContext/Index';
import { useNavigate } from 'react-router-dom';
import { useGlobalStats } from '../GlobelStats/GlobelStats';

const Start = () => {
    const { userLoggedIn, currentUser } = useAuth();
    const {userData} = useGlobalStats()
  const navigate = useNavigate()

  useEffect(() => {  
    if (userLoggedIn && userData ) {
      navigate('/home');
    } else       
    if(userLoggedIn && !userData ) navigate('/registration');

  }, [userLoggedIn, userData]);
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
