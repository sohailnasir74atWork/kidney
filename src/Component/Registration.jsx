import React, { useEffect, useState } from 'react';
import "./Styles/registration.css"
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import RegistrationStepper from './RegistrationStepper';

const Registration = () => {
  return (
    <Box        className='registration-container'    
    sx={{
      display: 'flex',
      justifyContent: 'center',
       minHeight: 'calc(100vh - 70px)', // Adjust the height of the container as needed
    }}>
      <RegistrationStepper/>   </Box>
  );
};

export default Registration;
