import React, { useEffect } from 'react';
import "./Styles/profilecard.css"
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useAuth } from '../Auth/context/authContext/Index';
import { useNavigate } from 'react-router-dom';
import { useGlobalStats } from '../GlobelStats/GlobelStats';

const ProfileCard = ({user}) => {
    const { userLoggedIn, currentUser } = useAuth();
    const navigate = useNavigate()

  
  return (
    <Box className="card">
        <ul>
        <li>Patient Name: <br/><span>{user.patientName}</span></li>
        <li>Pateint Blood Group: <br/><span>{user.bloodType}</span></li>
        <li>Donor Blood Group:<br/> <span>{user.donorBloodGroup}</span></li></ul>
        <br/>
     <Button variant='contained' size='small'>View Details</Button>
    </Box>
  );
};

export default ProfileCard;
