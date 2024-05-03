import React, { useEffect, useState } from 'react';
import "./Styles/registration.css"
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import RegistrationStepper from './RegistrationStepper';
import { useGlobalStats } from '../GlobelStats/GlobelStats';

const Registration = () => {
  const  {setStarted, started}= useGlobalStats()
  return (
    <Box  sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 70px)', // Adjust the height of the container as needed
    }}>
{    !started &&  <Button variant='contained' onClick={()=>setStarted(true)}>Start Registration</Button>
}      {started && <RegistrationStepper/>}
    </Box>
  );
};

export default Registration;
