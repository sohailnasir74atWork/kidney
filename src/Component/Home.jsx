import React, { useEffect, useState } from "react";
import "./Styles/home.css";
import Button from "@mui/material/Button";
import { Box, Divider, Grid } from "@mui/material";
import { useGlobalStats } from "../GlobelStats/GlobelStats";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Congratulations from "../Helper/congrats";
import { useAuth } from "../Auth/context/authContext/Index";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Home = () => {
  const { userData, matchedUser, setActiveStep } = useGlobalStats();
  const navigate = useNavigate();
  const location = useLocation();
  const { congrats } = location.state || {}; // Ensure to provide a fallback if state is undefined
  // useEffect(()=>{console.log('new data')},[userData])
  const handleupdate = () => {
    navigate("/registration");
    setActiveStep(0);
  };
  return (
    <>
      <Congratulations congrats={congrats} />
      <Box className="home-container">
        <h2>My Profile</h2>
        <Divider />
        <div className="flex">
          <div className="w-25">
            <h4>Patient Information</h4>
            <ul className="green">
              <li>
                <span>Patient Country </span>
              </li>
              <li>{userData?.country ? userData.country : "Not Available"}</li>
              <li>
                <span>Patient City</span>
              </li>
              <li>{userData?.city ? userData.city : "Not Available"}</li>
              <li>
                <span>Patient Name</span>
              </li>
              <li>
                {userData?.patientName ? userData.patientName : "Not Available"}
              </li>
              <li>
                <span>Patient Age </span>
              </li>
              <li>
                {userData?.patientAge ? userData.patientAge : "Not Available"}
              </li>
              <li>
                <span>Patient Blood Group </span>
              </li>
              <li>
                {userData?.bloodType ? userData.bloodType : "Not Available"}
              </li>
              <li>
                <span>Patient Tissue Type </span>
              </li>
              <li>
                {userData?.patientTissueType
                  ? userData?.patientTissueType
                  : "Not Available"}
              </li>
            </ul>
          </div>
          <div className="w-25">
            <h4>Doner Information</h4>
            <ul className="green">
              <li>
                <span>Doner Relation </span>
              </li>
              <li>
                {userData?.donorReletaion
                  ? userData.donorReletaion
                  : "Not Available"}
              </li>
              <li>
                <span>Doner Age </span>
              </li>
              <li>
                {userData?.donorAge ? userData.donorAge : "Not Available"}
              </li>
              <li>
                <span>Doner Blood Group </span>
              </li>
              <li>
                {userData?.donorBloodGroup
                  ? userData.donorBloodGroup
                  : "Not Available"}
              </li>

              <li>
                <span>Doner Tissue Type</span>{" "}
              </li>
              <li>
                {userData?.donorTissueType
                  ? userData.donorTissueType
                  : "Not Available"}
              </li>
              <li>
                <span>Doner has Hypertension</span>
              </li>
              <li>
                {userData?.highBloodPressure
                  ? userData.highBloodPressure
                  : "Not Available"}
              </li>
              <li>
                <span>Doner is Diabetic</span>
              </li>
              <li>
                {userData?.diabetes ? userData.diabetes : "Not Available"}
              </li>
            </ul>
          </div>
          <div className="w-50">
            <h4>Contact Information</h4>
            <ul>
              <li className="green">
                <span>Message</span>
              </li>
              <li>{userData?.message ? userData.message : "Not Available"}</li>

              <li className="green">
                <span>Email</span>
              </li>
              <li>{userData?.email ? userData.email : "Not Available"}</li>

              <li className="green">
                <span>Phone Number</span>
              </li>

              <li>
                {userData?.contactNumber
                  ? userData.contactNumber
                  : "Not Available"}
              </li>

              <br />
              <Button variant="contained" size="small" onClick={handleupdate}>
                Update Profile
              </Button>
            </ul>
          </div>
        </div>
        <br />
        <Divider />
        <br />
        <br />
        <h2>Matched Profiles</h2>
        <Box className="card-screen" >
  {matchedUser.length === 0 ? (
    <Typography variant="subtitle1" sx={{ m: 2 }}>
      No matched profile available yet ☹️
    </Typography>
  ) : (
    matchedUser.map((user, index) => (
      <>
      <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}a-content`}
          id={`panel${index}a-header`}
          sx={{backgroundColor:'#f85c70', color:'white'}}
        >
          <Typography>{`Matched Profile ${index + 1}` || "Profile"}</Typography> {/* Display user name or a default string */}
        </AccordionSummary>
                <AccordionDetails>
                <div className="flex">
          <div className="w-25">
            <h4>Patient Information</h4>
            <ul className="blue">
              <li>
                <span>Patient Country </span>
              </li>
              <li>{user?.country ? user.country : "Not Available"}</li>
              <li>
                <span>Patient City</span>
              </li>
              <li>{user?.city ? user.city : "Not Available"}</li>
              <li>
                <span>Patient Name</span>
              </li>
              <li>
                {user?.patientName ? user.patientName : "Not Available"}
              </li>
              <li>
                <span>Patient Age </span>
              </li>
              <li>
                {user?.patientAge ? user.patientAge : "Not Available"}
              </li>
              <li>
                <span>Patient Blood Group </span>
              </li>
              <li>
                {user?.bloodType ? user.bloodType : "Not Available"}
              </li>
              <li>
                <span>Patient Tissue Type </span>
              </li>
              <li>
                {user?.patientTissueType
                  ? user?.patientTissueType
                  : "Not Available"}
              </li>
            </ul>
          </div>
          <div className="w-25">
            <h4>Doner Information</h4>
            <ul className="blue">
              <li>
                <span>Doner Relation </span>
              </li>
              <li>
                {user?.donorReletaion
                  ? user.donorReletaion
                  : "Not Available"}
              </li>
              <li>
                <span>Doner Age </span>
              </li>
              <li>
                {user?.donorAge ? user.donorAge : "Not Available"}
              </li>
              <li>
                <span>Doner Blood Group </span>
              </li>
              <li>
                {user?.donorBloodGroup
                  ? user.donorBloodGroup
                  : "Not Available"}
              </li>

              <li>
                <span>Doner Tissue Type</span>{" "}
              </li>
              <li>
                {user?.donorTissueType
                  ? user.donorTissueType
                  : "Not Available"}
              </li>
              <li>
                <span>Doner has Hypertension</span>
              </li>
              <li>
                {user?.highBloodPressure
                  ? user.highBloodPressure
                  : "Not Available"}
              </li>
              <li>
                <span>Doner is Diabetic</span>
              </li>
              <li>
                {user?.diabetes ? user.diabetes : "Not Available"}
              </li>
            </ul>
          </div>
          <div className="w-50">
            <h4>Contact Information</h4>
            <ul>
              <li className="blue">
                <span>Message</span>
              </li>
              <li>{user?.message ? user.message : "Not Available"}</li>

              <li className="blue">
                <span>Email</span>
              </li>
              <li>{user?.email ? user.email : "Not Available"}</li>

              <li className="blue">
                <span>Phone Number</span>
              </li>

              <li>
                {user?.contactNumber
                  ? user.contactNumber
                  : "Not Available"}
              </li>

              <br />
                         </ul>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
      <br/>
      </>
    ))
  )}
</Box>


      </Box>
    </>
  );
};

export default Home;
