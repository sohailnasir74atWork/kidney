import React, { useEffect, useState } from "react";
import "./Styles/home.css";
import Button from "@mui/material/Button";
import { Box, Divider, Grid } from "@mui/material";
import { useGlobalStats } from "../GlobelStats/GlobelStats";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Congratulations from "../Helper/congrats";
import { useAuth } from "../Auth/context/authContext/Index";

const Home = () => {
  const { userData, setStarted, matchedUser } = useGlobalStats();
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  const location = useLocation();
  const { congrats } = location.state || {}; // Ensure to provide a fallback if state is undefined
  useEffect(()=>{console.log('new data')},[userData])
  const handleupdate= ()=>{
    navigate('/registration')
    setStarted(true)

  }
  return (
    <>
    <Congratulations congrats={congrats}/>
    <Box className="home-container">
      <h2>My Profile</h2>
      <Divider/>
      <div className="flex">
        <div className="w-25">
            <h4>Patient Information</h4>
            <ul>
                <li>Patient Country: <br/><span>{userData?.country ? userData.country : 'Not Available' }</span></li>
                <li>Patient Name: <br/><span>{userData?.patientName ? userData.patientName : 'Not Available'}</span></li>
                <li>Patient Age: <br/><span>{userData?.patientAge ? userData.patientAge : 'Not Available'}</span></li>
                <li>Patient Blood Group: <br/><span>{userData?.bloodType ? userData.bloodType : 'Not Available'}</span></li>
                <li>Patient Tissue Type:<br/><span>{userData?.patientTissueType ? userData?.patientTissueType : 'Not Available'}</span></li>
            </ul>
        </div>
        <div className="w-25">
        <h4>Doner Information</h4>
        <ul>
        <li>Doner Relation: <br/><span>{userData?.donorReletaion ? userData.donorReletaion : 'Not Available'}</span></li>
<li>Doner Age: <br/><span>{userData?.donorAge ? userData.donorAge : 'Not Available'}</span></li>
<li>Doner Blood Group: <br/><span>{userData?.donorBloodGroup ? userData.donorBloodGroup : 'Not Available'}</span></li>
<li>Doner Tissue Type: <br/><span>{userData?.donorTissueType ? userData.donorTissueType : 'Not Available'}</span></li>
<li>Doner has Hypertension: <br/><span>{userData?.highBloodPressure ? userData.highBloodPressure : 'Not Available'}</span></li>
<li>Doner is Diabetic: <br/><span>{userData?.diabetes ? userData.diabetes : 'Not Available'}</span></li>


            </ul>
        </div>
        <div className="w-50">
        <h4>Contact Information</h4>
        <ul>
        <li>Message: <br/><span>{userData?.message ? userData.message : 'Not Available'}</span></li>
<li>Email: <br/><span>{userData?.email ? userData.email : 'Not Available'}</span></li>
<li>Phone Number: <br/><span>{userData?.contactNumber ? userData.contactNumber : 'Not Available'}</span></li>

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
    
    </Box></>
  );
};

export default Home;
