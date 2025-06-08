import { Box, Button } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";
import fondo from "../../assets/Fondo_landing.jpg"; // asegúrate de la ruta correcta

function Landing() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <img
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

      {/* Contenido encima de la imagen */}
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
