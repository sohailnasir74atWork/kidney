import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#f85c70", // main primary color
            light: "#ff8f9d", // lighter shade
            dark: "#f85c70", // darker shade
            contrastText: "#ffffff" // text color on primary
          },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: "0.9rem",
          },
        },
      },
    },
  });