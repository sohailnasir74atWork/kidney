import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
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
export default function RegistrationStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const { userData, setFetchData, fetchData } = useGlobalStats();
  const navigate = useNavigate()

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
    email:""
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
      case 4:
        return formData.patientTissueType.trim() !== "";
      case 5:
        return formData.donorReletaion.trim() !== "";
      case 6:
        return formData.donorAge.trim() !== "";
      case 7:
        return formData.donorBloodGroup.trim() !== "";
      case 8:
        return formData.donorTissueType.trim() !== "";
      case 9:
        return formData.highBloodPressure.trim() !== "";
      case 10:
        return formData.diabetes.trim() !== "";
      case 11:
        return formData.message.trim() !== "";
      case 12:
        return formData.email.trim() !== "";
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
    } else {
      alert("Please fill all required fields for this step.");
    }
  };

  const handleComplete = () => {
    if (isStepValid()) {
        updateDatabase(); // Update Firebase before moving to the next step
        setFetchData(true)
        navigate('/home', { state: { congrats: true } });
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
    <Box sx={{ display: "flex", flexDirection: "column", width: 800 }}>
      <MobileStepper
        variant="progress"
        steps={13} // Adjust total steps to 8
        position="static"
        activeStep={activeStep}
        sx={{ mx: 1 }}
      />
      <Box sx={{ p: 2 }}>
        {/* TextFields with onChange */}
        {activeStep === 0 && (
          <TextField
            label="Select Country"
            required
            select
            fullWidth
            value={formData.country}
            sx={{ my: 4.3 }}
            onChange={(e) => handleCountryChange("country", e.target.value)}
          >
            {countryList.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        )}
        {activeStep === 1 && (
          <TextField
            label="Name of Patient"
            required
            fullWidth
            value={formData.patientName}
            sx={{ my: 4.3 }}
            onChange={(e) => handleInputChange("patientName", e.target.value)}
          />
        )}
        {activeStep === 2 && (
          <TextField
            label="Patient Age"
            required
            fullWidth
            value={formData.patientAge}
            sx={{ my: 4.3 }}
            onChange={(e) => handleInputChange("patientAge", e.target.value)}
          />
        )}
        {activeStep === 3 && (
          <TextField
            select
            required
            label="Choose Blood Type"
            fullWidth
            value={formData.bloodType}
            sx={{ my: 4.3 }}
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
        )}

        {activeStep === 4 && (
          <TextField
            label="Tissue Typing of Patient"
            fullWidth
            required
            multiline
            rows={4}
            value={formData.patientTissueType}
            onChange={(e) =>
              handleInputChange("patientTissueType", e.target.value)
            }
          />
        )}
        {activeStep === 5 && (
          <TextField
            label="Relation of Donor"
            fullWidth
            required
            value={formData.donorReletaion}
            sx={{ my: 4.3 }}
            onChange={(e) =>
              handleInputChange("donorReletaion", e.target.value)
            }
          />
        )}
        {activeStep === 6 && (
          <TextField
            label="Donor Age"
            fullWidth
            required
            value={formData.donorAge}
            sx={{ my: 4.3 }}
            onChange={(e) => handleInputChange("donorAge", e.target.value)}
          />
        )}
        {activeStep === 7 && (
          <TextField
            select
            required
            label="Choose Donner Blood Type"
            fullWidth
            value={formData.donorBloodGroup}
            sx={{ my: 4.3 }}
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
        )}
        {activeStep === 8 && (
          <TextField
            label="Donor Tissue Typing"
            fullWidth
            required
            multiline
            rows={4}
            value={formData.donorTissueType}
            onChange={(e) =>
              handleInputChange("donorTissueType", e.target.value)
            }
          />
        )}
        {activeStep === 9 && (
          <React.Fragment>
            <TextField
              label="Does the donor have high blood pressure?"
              fullWidth
              required
              select
              value={formData.highBloodPressure}
              sx={{ my: 4.3 }}
              onChange={(e) =>
                handleInputChange("highBloodPressure", e.target.value)
              }
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </TextField>
          </React.Fragment>
        )}
        {activeStep === 10 && (
          <React.Fragment>
            <TextField
              label="Does the donor have diabetes?"
              fullWidth
              required
              value={formData.diabetes}
              sx={{ my: 4.3 }}
              select
              onChange={(e) => handleInputChange("diabetes", e.target.value)}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </TextField>
          </React.Fragment>
        )}
        {activeStep === 11 && (
          <React.Fragment>
            <TextField
              label="Additional Information"
              fullWidth
              required
              multiline
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
            />
          </React.Fragment>
        )}
        {activeStep === 12 && (
          <React.Fragment>
            <TextField
              label="Contact Email"
              fullWidth
              sx={{ my: 4.3 }}
              value={formData.email}
              onChange={(e) =>
                handleInputChange("email", e.target.value)
              }
            />
          </React.Fragment>
        )}
        {activeStep === 13 && (
          <React.Fragment>
            <TextField
              label="Contact Number (Optional)"
              fullWidth
              sx={{ my: 4.3 }}
              value={formData.contactNumber}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
            />
          </React.Fragment>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: 2 }}>
        <Button
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
          variant="contained"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
        <Button
          size="small"
          onClick={activeStep === 13 ? handleComplete : handleNext}
          variant="contained"
          color={activeStep === 13 ? "success" : "primary"}
        >
          {activeStep === 13 ? "Finish" : "Next"}
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      </Box>
    </Box>
  );
}