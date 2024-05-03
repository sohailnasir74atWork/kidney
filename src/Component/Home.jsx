import React, { useEffect, useState } from "react";
import "./Styles/home.css";
import Button from "@mui/material/Button";
import { Box, Divider, Grid } from "@mui/material";
import { useGlobalStats } from "../GlobelStats/GlobelStats";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";

const Home = () => {
  const { userData, setStarted, matchedUser } = useGlobalStats();
  const navigate = useNavigate()
  useEffect(()=>{console.log('new data')},[userData])
  const handleupdate= ()=>{
    navigate('/registration')
    setStarted(true)

  }
  return (
    <Box className="home-container">
      <h2>My Profile</h2>
      <Divider/>
      <div className="flex">
        <div className="w-25">
            <h4>Patient Information</h4>
            <ul>
                <li>Patient Country: <br/><span>{userData?.country}</span></li>
                <li>Patient Name: <br/><span>{userData?.patientName}</span></li>
                <li>Patient Age: <br/><span>{userData?.patientAge}</span></li>
                <li>Patient Blood Group: <br/><span>{userData?.bloodType}</span></li>
                <li>Patient Tissue Type:<br/><span>{userData?.patientTissueType}</span></li>
            </ul>
        </div>
        <div className="w-25">
        <h4>Doner Information</h4>
        <ul>
                <li>Doner Relation: <br/><span>{userData?.donorReletaion}</span></li>
                <li>Doner Age: <br/><span>{userData?.donorAge}</span></li>
                <li>Doner Blood Group: <br/><span>{userData?.donorBloodGroup}</span></li>
                <li>Doner Tissue Type: <br/><span>{userData?.donorTissueType}</span></li>
                <li>Doner has Hypertention: <br/><span>{userData?.highBloodPressure}</span></li>
                <li>Doner is Diabatic: <br/><span>{userData?.diabetes}</span></li>

            </ul>
        </div>
        <div className="w-50">
        <h4>Contact Information</h4>
        <ul>
                <li>Message: <br/><span>{userData?.message}</span></li>
                <li>Email: <br/><span></span></li>
                <li>Phone Number: <br/><span>{userData?.contactNumber}</span></li>
                <br/>
                <Button variant="contained" size="small" onClick={handleupdate}>Update Profile</Button>

        </ul>
        </div>
      </div>
      <br/>
      <Divider/>
      <br/>
      <br/>
      <h2>Matched Profiles</h2>
      {matchedUser.length === 0  && <span>No matched profile available yet ☹️</span>}
{matchedUser.length > 0 && matchedUser.map(user => (
  <div key={user.id} className="card-container">
    <ProfileCard user={user} />
  </div>
))}
    
    </Box>
  );
};

export default Home;
