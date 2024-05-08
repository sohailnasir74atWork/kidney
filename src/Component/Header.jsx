import React from 'react';
import './Styles/header.css'
import { AppBar, Box, IconButton } from '@mui/material';
import { useGlobalStats } from '../GlobelStats/GlobelStats';
import { auth } from '../Auth/firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { doSignOut } from '../Auth/firebase/firebase';
import { useAuth } from '../Auth/context/authContext/Index';

const Header = () => {
    const { currentUser } = useAuth();
    const handleLogout = async () => {
        try {
            await doSignOut(); // Ensure sign out is completed before navigating
            window.location.href = "https://go.aspireai.io/"; // Redirect to external URL after successful sign out
            console.log("Logged out successfully.");
        } catch (error) {
            console.error("Failed to log out:", error);
            // Optionally handle errors, e.g., show an error message to the user
        }
    }

    return (
        <div className='header-container'>
            <Box className="content">
                <div className='home-nav'>
                    <a href='https://go.aspireai.io/'>Home</a>
                </div>
                <div>
                    <span>
                        {currentUser?.email}
                        <IconButton onClick={handleLogout}>
                            <LogoutIcon fontSize="medium" />
                        </IconButton>
                    </span>
                </div>
            </Box>
        </div>
    );
};

export default Header;
