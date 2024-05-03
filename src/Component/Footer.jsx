import React, { useEffect } from 'react';
import "./Styles/footer.css"
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useAuth } from '../Auth/context/authContext/Index';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate()

  
  return (
    <Box className="footer">
       <span>All rights Reserved</span>
    </Box>
  );
};

export default Footer;
