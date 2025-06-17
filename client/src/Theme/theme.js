import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bfbebe",
      light: "#ffffff",
      dark: "#a8a7a7",
      contrastText: "rgba(8,8,8,0.87)",
    },
    secondary: {
      main: "#474c4e",
    },
    background: {
      default: "#0c0c0c",
      paper: "#1a1a1a",
    },
  },
});

export default theme;
