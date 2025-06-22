import { Box, Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";
import fondo from "../../assets/Fondo_landing.jpg";

function Landing() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={fondo}
        alt="Fondo"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/home">
          <Button
            variant="contained"
            endIcon={<EastIcon />}
            sx={{
              borderRadius: "100px",
            }}
          >
            go
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Landing;
