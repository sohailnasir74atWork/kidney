import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signin from "../../Assets/signin.webp";
import "./auth.css";
import { ImportStats } from "../GlobelStats/GlobelStats";
import { doPasswordReset } from "./firebase/firebase";
import { useAuth } from "./context/authContext/Index";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://generateqrcode.io/">
        Generate QR Code
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function ForgetPassword() {
  const { isMobile } = ImportStats();
  const [email, setEmail] = React.useState("");
  const { userLoggedIn, currentUser } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter an email address.");
      return;
    }

    try {
      await doPasswordReset(email);
      console.log(
        "If an account with the provided email exists, a password reset link has been sent."
      );
      setErrorMessage(""); // Clear any existing error message
      setAlert(true);
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
      console.log(error.message);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {" "}
      {userLoggedIn && navigate("/create")}
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: { my: 2, md: 2 },
                mx: { xs: 2, md: 2 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="text-fields-container">
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Recovered Password
                </Typography>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit} // Add onSubmit handler to the form
                  sx={{ mt: 1 }}
                >
                  {alert && (
                    <Alert
                      icon={false}
                      severity="success"
                      sx={{
                        minHeight: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        flexDirection: "column",
                      }}
                    >
                      If an account with the provided email exists, a password
                      reset link has been sent.
                      <br />
                      <MarkEmailReadIcon />
                    </Alert>
                  )}
                  {!alert && (
                    <>
                      {" "}
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        error={!!errorMessage}
                        helperText={errorMessage}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "50px", // Set border-radius to 50px
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: "50px", py: 1.5 }}
                      >
                        Send Email
                      </Button>
                    </>
                  )}
                  <Button
                    type="button" // Change type to "button" to prevent form submission
                    fullWidth
                    size="large"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, borderRadius: "50px", py: 1.5 }}
                    onClick={()=>{navigate('/signin')}}
                  >
                    Back
                  </Button>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </div>
            </Box>
          </Grid>
          {!isMobile && (
            <Grid
              item
              xs={false}
              sm={6}
              md={6}
              sx={{
                backgroundColor: "#5956D6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100vh",
                }}
              >
                <img src={signin} alt="signin" height="auto" width="60%" />
              </div>
            </Grid>
          )}
        </Grid>
      </ThemeProvider>
    </>
  );
}
