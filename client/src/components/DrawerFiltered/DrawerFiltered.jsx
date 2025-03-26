import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import SlidingIcons from "../SlidingIcon/SlidingIcon";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import Filtered from "../Filtered1/Filtered";
import Sort from "../Sort/Sort";
// import FunnelIcon from "../Funnel/FunnelIcon";

function DrawerFiltered() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        <Button startIcon={<SlidingIcons />} onClick={() => toggleDrawer(true)}>
          Filters
        </Button>
        <Sort />
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={() => {}}>
        <Box
          sx={{
            width: 300,
            padding: "20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Filter Pokémon</Typography>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Filtered />
        </Box>
      </Drawer>
    </>
  );
}

export default DrawerFiltered;
