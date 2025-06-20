import {
  Box,
  Typography,
  Link,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles"; // Importa useTheme

function Footer() {
  const theme = useTheme(); // Hook para acceder al tema

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        color: "white",
        py: 4,
        mt: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 8 }, mb: 4 }}>
        {/* PERSONAL INFO*/}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Contact Info
          </Typography>
          {/* MAIL */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <MailOutlineIcon sx={{ mr: 1 }} />
            <Typography variant="body2">fg.francogaleano@gmail.com</Typography>
          </Box>
          {/* PHONE */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PhoneIphoneIcon sx={{ mr: 1 }} />
            <Typography variant="body2">+54 9 11 5471- 8471</Typography>
          </Box>
          {/* SOCIAL MEDIA */}
          <Box>
            <IconButton
              component={Link}
              href="https://www.linkedin.com/in/fran-galeano/"
              target="_blank"
              rel="noopener"
              color="inherit"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component={Link}
              href="https://www.instagram.com/your_instagram_profile/" // Replace with your Instagram URL
              target="_blank"
              rel="noopener"
              color="inherit"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* ABOUT PROJECT*/}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            About This Project
          </Typography>
          <Typography variant="body2">
            This web application serves as a demonstration project showcasing a
            full-stack architecture built with modern web technologies. The
            frontend leverages React for an interactive user interface, Redux
            for state management, and Material-UI for responsive styling. On the
            backend, Node.js and Express handle server-side logic, while Pokémon
            data is stored in a PostgreSQL database and primarily retrieved from
            the PokeAPI.
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mb: 3 }} />

      {/* SECTION COPYRIGHT*/}
      <Typography
        variant="caption"
        align="center"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        Copyright © 2025 Pokémon | Made with
        <FavoriteIcon sx={{ color: "red" }} />
        by Franco Galeano
      </Typography>
    </Box>
  );
}

export default Footer;
