import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import "./Styles/registration.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAuth } from "../Auth/context/authContext/Index";
import { ref } from "firebase/database";
import { update } from "firebase/database";
import { database } from "../Auth/firebase/auth";
import { useGlobalStats } from "../GlobelStats/GlobelStats";
import MenuItem from "@mui/material/MenuItem";
import { countryList } from "../Helper/countries";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function RegistrationStepper() {
  const theme = useTheme();
  const {
    userData,
    setFetchData,
    bloodCompatibility,
    activeStep,
    setActiveStep,
  } = useGlobalStats();
  const navigate = useNavigate();

  // console.log(userData);
  const [formData, setFormData] = React.useState({
    country: "Pakistan",
    city: "",
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
        city: userData.city || "",
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

  // function showSuccessAlert() {
  //   Swal.fire({
  //     title: 'Success!',
  //     text: 'Your operation was successful!',
  //     icon: 'success',
  //     confirmButtonText: 'Great!'
  //   });
  // }

  // function showErrorAlert() {
  //   Swal.fire({
  //     title: 'Error!',
  //     text: 'Something went wrong!',
  //     icon: 'error',
  //     confirmButtonText: 'Try Again'
  //   });
  // }
  const isStepValid = () => {
    // Check if the donor and recipient blood types are incompatible
    const checkCompatibility = (donorBlood, recipientBlood) => {
      return bloodCompatibility[donorBlood]?.includes(recipientBlood);
    };

    switch (activeStep) {
      case 0:
        return formData.country.trim() !== "";
      case 1:
        return formData.city.trim() !== "";
      case 2:
        return formData.patientName.trim() !== "";
      case 3:
        return formData.patientAge.trim() !== "";
      case 4:
        return formData.bloodType.trim() !== "";
      case 5:
        return formData.patientTissueType.trim() !== "";
      case 6:
        return formData.donorReletaion.trim() !== "";
      case 7:
        return formData.donorAge.trim() !== "";
      case 8:
        // Check if blood types are incompatible
        if (checkCompatibility(formData.donorBloodGroup, formData.bloodType)) {
          Swal.fire({
            // SweetAlert error message
            title: "Already Compatible",
            text: "This match is already compatible, but you can still register to find an even better match.",
            icon: "success",
            confirmButtonText: "OK",
          });
          return true;
        } else return true;
      case 9:
        return formData.donorTissueType.trim() !== "";
      case 10:
        return formData.highBloodPressure.trim() !== "";
      case 11:
        return formData.diabetes.trim() !== "";
      case 12:
        return formData.message.trim() !== "";
      case 13:
        return formData.email.trim() !== "";
      default:
        return true;
    }
  };

  const { currentUser } = useAuth();

  // Update local state
  const handleInputChange = (field, value) => {
    console.log("VALUE", value);
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

      // Swal.fire({ // SweetAlert success message
      //   title: 'Step Complete!',
      //   text: 'You have successfully completed this step.',
      //   icon: 'success',
      //   confirmButtonText: 'OK'
      // });
    } else {
      Swal.fire({
        // SweetAlert error message
        title: "Incomplete Step!",
        text: "Please fill all  fields for this step.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleComplete = () => {
    if (isStepValid()) {
      updateDatabase(); // Update Firebase before moving to the next step
      setFetchData(true);
      navigate("/home", { state: { congrats: true } });
    } else {
      // alert("Please fill all  fields for this step.");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action of the enter key
      if (activeStep === 14) {
        handleComplete(); // If it's the last step, call handleComplete
      } else {
        handleNext(); // Otherwise, move to the next step
      }
    }
  };

  const handleBack = () => {
    updateDatabase(); // Update Firebase before moving to the previous step
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCountryChange = (field, value) => {
    // setFormData((prev) => ({ ...prev, [field]: value }));
    updateDatabase(); // Update Firebase before moving to the next step
  };
  return (
    <Box className="stepper-container">
      <MobileStepper
        variant="progress"
        steps={14} // Adjust total steps to 8
        position="static"
        activeStep={activeStep}
        sx={{ mx: 0, p: 0 }}
      />
      <Box
        sx={{ pt: 2, pb: 1, mx: "auto" }}
        className="inputs-container width-control"
      >
        {/* TextFields with onChange */}
        {activeStep === 0 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              1. Select your country.
            </p>
            <TextField
              select
              variant="standard"
              fullWidth
              value={formData.country}
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                  lineHeight: "1.1em",
                },
              }}
              onChange={(e) => handleInputChange("country", e.target.value)}
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
              2. What is the name of your city?
            </p>
            <TextField
              fullWidth
              placeholder="Write your answer here . . ."
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              variant="standard"
              onSubmit={handleNext}
              value={formData.city}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                  lineHeight: "1.1em",
                },
              }}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </>
        )}
        {activeStep === 2 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              2. What is the name of the patient?
            </p>
            <TextField
              fullWidth
              placeholder="Write your answer here . . ."
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              variant="standard"
              onSubmit={handleNext}
              value={formData.patientName}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                  lineHeight: "1.1em",
                },
              }}
              onChange={(e) => handleInputChange("patientName", e.target.value)}
            />
          </>
        )}
        {activeStep === 3 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              3. What is patient age?
            </p>
            <TextField
              fullWidth
              onSubmit={handleNext}
              variant="standard"
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              type="number"
              InputProps={{
                inputProps: {
                  min: 0, // Optional: Minimum value
                  max: 80, // Optional: Maximum value
                },
              }}
              placeholder="Write your answer here . . ."
              value={formData.patientAge}
              onChange={(e) => handleInputChange("patientAge", e.target.value)}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                  lineHeight: "1.1em",
                },
              }}
            />
          </>
        )}
        {activeStep === 4 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              4. Select patient blood group.
            </p>
            <TextField
              variant="standard"
              select
              onSubmit={handleNext}
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              fullWidth
              placeholder="Write your answer here . . ."
              value={formData.bloodType}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                  lineHeight: "1.1em",
                },
              }}
              onChange={(e) => handleInputChange("bloodType", e.target.value)}
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="AB">AB</MenuItem>
              <MenuItem value="O">O</MenuItem>
            </TextField>
          </>
        )}

        {activeStep === 5 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              5. Write tissue typing of patient (if not available then write
              "Not Available").
            </p>
            <TextField
              fullWidth
              variant="standard"
              onSubmit={handleNext}
              placeholder="A*02, A*03, B*07, B*08, DRB1*15, DRB1*04"
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              value={formData.patientTissueType}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
              }}
              onChange={(e) =>
                handleInputChange("patientTissueType", e.target.value)
              }
            />
          </>
        )}
        {activeStep === 6 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              6. What is Donor's relation with Patient.
            </p>
            <TextField
              fullWidth
              onSubmit={handleNext}
              variant="standard"
              placeholder="Write your answer here . . ."
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              value={formData.donorReletaion}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
              }}
              onChange={(e) =>
                handleInputChange("donorReletaion", e.target.value)
              }
            />
          </>
        )}
        {activeStep === 7 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              7. What is donor's age ?
            </p>
            <TextField
              fullWidth
              variant="standard"
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              onSubmit={handleNext}
              placeholder="Write your answer here . . ."
              type="number"
              InputProps={{
                inputProps: {
                  min: 16, // Optional: Minimum value
                  max: 60, // Optional: Maximum value
                },
              }}
              value={formData.donorAge}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
              }}
              onChange={(e) => handleInputChange("donorAge", e.target.value)}
            />
          </>
        )}
        {activeStep === 8 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              8. What is donor blood group ?
            </p>
            <TextField
              select
              fullWidth
              onSubmit={handleNext}
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              placeholder="Write your answer here . . ."
              variant="standard"
              value={formData.donorBloodGroup}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                  lineHeight: "1.1em",
                },
              }}
              onChange={(e) =>
                handleInputChange("donorBloodGroup", e.target.value)
              }
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="AB">AB</MenuItem>
              <MenuItem value="O">O</MenuItem>
            </TextField>
          </>
        )}
        {activeStep === 9 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              9. Write tissue typing of donor (if not available then write "Not
              Available").
            </p>
            <TextField
              fullWidth
              onSubmit={handleNext}
              onKeyDown={handleKeyDown} // Add the onKeyDown event handler
              placeholder="A*02, A*03, B*07, B*08, DRB1*15, DRB1*04"
              variant="standard"
              value={formData.donorTissueType}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
                "& .MuiInputBase-input": {
                  color: "#f85c70",
                  fontSize: "1.8rem",
                },
              }}
              onChange={(e) =>
                handleInputChange("donorTissueType", e.target.value)
              }
            />
          </>
        )}
        {activeStep === 10 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              10. Does the donor have high blood pressure?
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleNext}
                onKeyDown={handleKeyDown} // Add the onKeyDown event handler
                variant="standard"
                placeholder="Write your answer here . . ."
                select
                value={formData.highBloodPressure}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                    lineHeight: "1.1em",
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
        {activeStep === 11 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              11. Does the donor have Diabetic?
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleNext}
                onKeyDown={handleKeyDown} // Add the onKeyDown event handler
                variant="standard"
                placeholder="Write your answer here . . ."
                value={formData.diabetes}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                    lineHeight: "1.1em",
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
        {activeStep === 12 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              12. Any additional information you want to share?
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleNext}
                onKeyDown={handleKeyDown} // Add the onKeyDown event handler
                variant="standard"
                placeholder="Write your answer here . . ."
                multiline
                // rows={4}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                    lineHeight: "1.1em",
                  },
                }}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </React.Fragment>
          </>
        )}
        {activeStep === 13 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              13. What is contact email address ?
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleNext}
                onKeyDown={handleKeyDown} // Add the onKeyDown event handler
                variant="standard"
                placeholder="Write your answer here . . ."
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                    lineHeight: "1.1em",
                  },
                }}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </React.Fragment>
          </>
        )}
        {activeStep === 14 && (
          <>
            <p sx={{ mx: 2 }} className="questions">
              14. What is your phone number ? (Optional)
            </p>
            <React.Fragment>
              <TextField
                fullWidth
                onSubmit={handleComplete}
                onKeyDown={handleKeyDown} // Add the onKeyDown event handler
                variant="standard"
                placeholder="Write your answer here . . ."
                value={formData.contactNumber}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f85c70",
                    fontSize: "1.8rem",
                    lineHeight: "1.1em",
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
        sx={{ display: "flex", m: "auto", justifyContent: "left" }}
        className="width-control"
      >
        <Button
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
          variant="contained"
          sx={{ mr: 1 }}
        >
         Back
        </Button>
        <Button
          size="small"
          onClick={activeStep === 14 ? handleComplete : handleNext}
          variant="contained"
          color={activeStep === 14 ? "success" : "primary"}
        >
          {activeStep === 14 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}