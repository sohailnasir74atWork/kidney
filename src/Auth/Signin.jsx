import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signin from "../../Assets/signin.webp";
import "./auth.css";
import google from "../../Assets/defaultlogo/logo (8).svg";
import facebook from "../../Assets/defaultlogo/logo (1).svg";
import linkedin from "../../Assets/defaultlogo/logo (10).svg";
import { Chip, Divider } from "@mui/material";
import { ImportStats } from "../GlobelStats/GlobelStats";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "./firebase/firebase";
import { useAuth } from "./context/authContext/Index";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const { isMobile } = ImportStats();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { userLoggedIn, currentUser } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userLoggedIn) {
      await doSignInWithEmailAndPassword(email, password).catch((error) => {
        setErrorMessage(error.message);
      });
    } else {
      setErrorMessage("User is already logged in");
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
                  Sign in
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={()=>{doSignInWithGoogle(isMobile)}}
                  sx={{
                    borderRadius: "50px",
                    display: "flex",
                    my: 2,
                    py: 1.5,
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "tomato", // Apply background color here
                    "&:hover": {
                      // backgroundColor: "red", // Change background color on hover if needed
                    },
                  }}
                  startIcon={<GoogleIcon />}
                >
                  <span>Sign In with Google</span>
                </Button>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <Divider sx={{ my: 2, mx: 2 }}>
                    <Chip label="Or" size="small" />
                  </Divider>
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px", // Set border-radius to 50px
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    error={!!errorMessage}
                    helperText={errorMessage}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px", // Set border-radius to 50px
                      },
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: "50px", py: 1.5 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs onClick={()=>{navigate('/forget-password')}}>
                      <Link href="" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="" variant="body2" onClick={()=>{navigate('/signup')}}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
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
