import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "./Styles/registration.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAuth } from "../Auth/context/authContext/Index";
import { get, getDatabase, onValue, push, ref, set } from "firebase/database";
import { update } from "firebase/database";
import { database } from "../Auth/firebase/auth";
import { useGlobalStats } from "../GlobelStats/GlobelStats";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { countryList } from "../Helper/countries";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
export default function RegistrationStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const { userData, setFetchData, fetchData } = useGlobalStats();
  const navigate = useNavigate();

  console.log(userData);
  const [formData, setFormData] = React.useState({
    country: "Pakistan",
    patientName: "",
    contactNumber: "",
    patientAge: "",
    bloodType: "",
    patientTissueType: "", // Six markers for patient
    donorReletaion: "",
    donorAge: "",
    donorBloodGroup: "",
    donorTissueType: "", // Six markers for donor
    highBloodPressure: "",
    diabetes: "",
    message: "",
    email: "",
  });
  React.useEffect(() => {
    if (userData) {
      setFormData({
        country: userData.country || "",
        patientName: userData.patientName || "",
        patientAge: userData.patientAge || "",
        bloodType: userData.bloodType || "",
        patientTissueType: userData.patientTissueType || "",
        donorReletaion: userData.donorReletaion || "",
        donorAge: userData.donorAge || "",
        contactNumber: userData.contactNumber || "",
        donorBloodGroup: userData.donorBloodGroup || "",
        donorTissueType: userData.donorTissueType || "",
        highBloodPressure: userData.highBloodPressure || "",
        diabetes: userData.diabetes || "",
        message: userData.message || "",
        email: userData.email || "",
      });
    }
  }, [userData]); // Ensure userData is a dependency here
  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.country.trim() !== "";
      case 1:
        return formData.patientName.trim() !== "";
      case 2:
        return formData.patientAge.trim() !== "";
      case 3:
        return formData.bloodType.trim() !== "";
      // case 4:
      //   return formData.patientTissueType.trim() !== "";
      case 5:
        return formData.donorReletaion.trim() !== "";
      case 6:
        return formData.donorAge.trim() !== "";
      // case 7:
      //   return formData.donorBloodGroup.trim() !== "";
      // case 8:
      //   return formData.donorTissueType.trim() !== "";
      case 9:
        return formData.highBloodPressure.trim() !== "";
      case 10:
        return formData.diabetes.trim() !== "";
      case 11:
        return formData.message.trim() !== "";
      case 12:
        return formData.email.trim() !== "";
        case 7: // Check on the step where donor blood group is selected
        return formData.donorBloodGroup.trim() !== "" && formData.donorBloodGroup !== formData.bloodType;
      default:
        return true; // Assuming that there are no validations needed beyond step 8
    }
  };

  const { currentUser } = useAuth();

  // Update local state
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Update Firebase
  const updateDatabase = () => {
    const userRef = ref(database, `users/${currentUser.uid}`);
    update(userRef, formData);
  };

  // Navigate steps
  const handleNext = () => {
    if (isStepValid()) {
        updateDatabase(); // Update Firebase before moving to the next step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 7 && formData.donorBloodGroup === formData.bloodType) {
        alert("The donor's blood group cannot be the same as the patient's blood group.");
    } else {
        alert("Please fill all required fields for this step.");
    }
};

  const handleComplete = () => {
    if (isStepValid()) {
      updateDatabase(); // Update Firebase before moving to the next step
      setFetchData(true);
      navigate("/home", { state: { congrats: true } });
    } else {
      alert("Please fill all required fields for this step.");
    }
  };

  const handleBack = () => {
    updateDatabase(); // Update Firebase before moving to the previous step
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCountryChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <Box className="stepper-container">
      <MobileStepper
        variant="progress"
        steps={13} // Adjust total steps to 8
        position="static"
        activeStep={activeStep}
        sx={{ mx: 0, p: 0 }}
      />
      <Box
        sx={{ pt: 2, pb: 1,  mx: "auto" }}
        className="inputs-container width-control"
      >
        {/* TextFields with onChange */}
        {activeStep === 0 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              1. Select your conutry.
            </p>
            <TextField
              required
              select
              variant="standard"
              fullWidth
              value={formData.country}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                  lineHeight:'1.1em'

                },
              }}
              onChange={(e) => handleCountryChange("country", e.target.value)}
            >
              {countryList.map((country, index) => (
                <MenuItem key={index} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}
        {activeStep === 1 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              2. What is the name of the patient?
            </p>
            <TextField
              required
              fullWidth
              placeholder="Write your answer here . . ."
              variant="standard"
              onSubmit={handleNext}
              value={formData.patientName}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                  lineHeight:'1.1em'

                },
              }}
              onChange={(e) => handleInputChange("patientName", e.target.value)}
            />
          </>
        )}
        {activeStep === 2 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              3. What is patient age?
            </p>
            <TextField
              required
              fullWidth
              onSubmit={handleNext}
              variant="standard"
              placeholder="Write your answer here . . ."
              value={formData.patientAge}
              onChange={(e) => handleInputChange("patientAge", e.target.value)}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                  lineHeight:'1.1em'

                },
              }}
            />
          </>
        )}
        {activeStep === 3 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              4. Select patient blood group.
            </p>
            <TextField
              variant="standard"
              select
              required
              onSubmit={handleNext}
              fullWidth
              placeholder="Write your answer here . . ."
              value={formData.bloodType}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                  lineHeight:'1.1em'

                },
              }}
              onChange={(e) => handleInputChange("bloodType", e.target.value)}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </TextField>
          </>
        )}

        {activeStep === 4 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              5. Write tissue typing of patient (if available).
            </p>
            <TextField
              fullWidth
              variant="standard"
              onSubmit={handleNext}
              placeholder="Write your answer here . . ."
              value={formData.patientTissueType}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                },
              }}
              onChange={(e) =>
                handleInputChange("patientTissueType", e.target.value)
              }
            />
          </>
        )}
        {activeStep === 5 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              6. What is Donor's relation with Patient.
            </p>
            <TextField
              fullWidth
              onSubmit={handleNext}
              required
              variant="standard"
              placeholder="Write your answer here . . ."
              value={formData.donorReletaion}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                },
              }}
              onChange={(e) =>
                handleInputChange("donorReletaion", e.target.value)
              }
            />
          </>
        )}
        {activeStep === 6 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              7. Waht is donor's age ?
            </p>
            <TextField
              fullWidth
              variant="standard"
              onSubmit={handleNext}
              placeholder="Write your answer here . . ."
              value={formData.donorAge}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                },
              }}
              onChange={(e) => handleInputChange("donorAge", e.target.value)}
            />
          </>
        )}
        {activeStep === 7 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              8. What is donor blood group ?
            </p>
            <TextField
              select
              required
              fullWidth
              onSubmit={handleNext}
              placeholder="Write your answer here . . ."
              variant="standard"
              value={formData.donorBloodGroup}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                  lineHeight:'1.1em'

                },
              }}
              onChange={(e) =>
                handleInputChange("donorBloodGroup", e.target.value)
              }
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </TextField>
          </>
        )}
        {activeStep === 8 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              9. Write tissue typing of donor (if available).
            </p>
            <TextField
              fullWidth
              onSubmit={handleNext}
              required
              placeholder="Write your answer here . . ."
              variant="standard"
              value={formData.donorTissueType}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "red",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "red",
                  fontSize: "1.8rem",
                },
              }}
              onChange={(e) =>
                handleInputChange("donorTissueType", e.target.value)
              }
            />
          </>
        )}
        {activeStep === 9 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              10. Does the donor have high blood pressure?
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleNext}
                variant="standard"
                placeholder="Write your answer here . . ."
                select
                value={formData.highBloodPressure}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "red",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "red",
                    fontSize: "1.8rem",
                    lineHeight:'1.1em'

                  },
                }}
                onChange={(e) =>
                  handleInputChange("highBloodPressure", e.target.value)
                }
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </TextField>
            </React.Fragment>
          </>
        )}
        {activeStep === 10 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              11. Does the donor have Diabetic?
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleNext}
                variant="standard"
                placeholder="Write your answer here . . ."
                required
                value={formData.diabetes}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "red",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "red",
                    fontSize: "1.8rem",
                    lineHeight:'1.1em'
                  },
                }}
                select
                onChange={(e) => handleInputChange("diabetes", e.target.value)}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </TextField>
            </React.Fragment>
          </>
        )}
        {activeStep === 11 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              12. Any additional information you want to share?
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleNext}
                variant="standard"
                placeholder="Write your answer here . . ."
                multiline
                // rows={4}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "red",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "red",
                    fontSize: "1.8rem",
                    lineHeight:'1.1em'

                  },
                }}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </React.Fragment>
          </>
        )}
        {activeStep === 12 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              13. What is contact email address ?
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleNext}
                variant="standard"
                placeholder="Write your answer here . . ."
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "red",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "red",
                    fontSize: "1.8rem",
                    lineHeight:'1.1em'
                  },
                }}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </React.Fragment>
          </>
        )}
        {activeStep === 13 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              14. What is your phone number ? (Optional)
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleComplete}
                variant="standard"
                placeholder="Write your answer here . . ."
                value={formData.contactNumber}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "red",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "red",
                    fontSize: "1.8rem",
                    lineHeight:'1.1em'
                  },
                }}
                onChange={(e) =>
                  handleInputChange("contactNumber", e.target.value)
                }
              />
            </React.Fragment>
          </>
        )}
      </Box>
      <Box
        sx={{ display: "flex",  m: "auto", justifyContent: "left" }} className='width-control'
      >
        <Button
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
          variant="contained"
          sx={{ mr: 1 }}
        >
          {/* {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )} */}
          Back
        </Button>
        <Button
          size="small"
          onClick={activeStep === 13 ? handleComplete : handleNext}
          variant="contained"
          color={activeStep === 13 ? "success" : "primary"}
        >
          {activeStep === 13 ? "Finish" : "Next"}
          {/* {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )} */}
        </Button>
      </Box>
    </Box>
  );
}
