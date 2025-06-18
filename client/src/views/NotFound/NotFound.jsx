import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import notFoundGif from "../../assets/NotFound.gif";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        gap: "20px",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: "4rem", sm: "6rem", md: "8rem" } }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
      >
        Looks like you're lost.
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, fontSize: { xs: "1rem", sm: "1.1rem" } }}
      >
        The page you're looking for doesn't exist.
      </Typography>

      <Box
        component="img"
        src={notFoundGif}
        alt="Page Not Found"
        sx={{
          maxWidth: { xs: "80%", sm: "50%", md: "30%" },
          height: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          mb: 4,
        }}
      />

      <Button
        component={Link}
        to="/home"
        variant="contained"
        color="primary"
        size="large"
      >
        Go to Home
      </Button>
    </Box>
  );
}

export default NotFound;
