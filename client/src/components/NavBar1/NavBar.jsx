import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import Typography from "@mui/material/Typography";
// import Badge from "@mui/material/Badge";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar1/SearchBar";
import Image from "../../assets/icon.png";

function NavBar() {
  const navItems = ["Home", "Create"];
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {navItems.map((item) => (
        <MenuItem key={item} onClick={handleMobileMenuClose}>
          <Link key={item} to={"/" + item.toLowerCase()}>
            {item}
          </Link>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar component="div" position="sticky" sx={{ height: "65px" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* MENU BURGER - VERSION MÓVIL */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* LOGO */}
        <Box sx={{ marginRight: "20px" }}>
          <img src={Image} alt="" width="35px" height="35px" />
        </Box>

        {/* CENTRO - SEARCH BAR */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <SearchBar />
        </Box>

        {/* NAVLINK - VERSION WEB */}
        <Box component="nav" sx={{ display: { xs: "none", md: "flex" } }}>
          {navItems.map((item) => (
            <Link key={item} to={"/" + item.toLowerCase()}>
              <Button sx={{ color: "#fff" }}>{item}</Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
      {renderMobileMenu}
    </AppBar>
  );
}

export default NavBar;
