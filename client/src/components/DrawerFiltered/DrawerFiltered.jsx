import {
  Box,
  Button,
  Drawer,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import SlidingIcons from "../SlidingIcon/SlidingIcon";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import Filtered from "../Filtered1/Filtered";
import Sort from "../Sort/Sort";
import { useSelector } from "react-redux";

function DrawerFiltered() {
  const { appliedSortLabel } = useSelector((state) => state);
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
        {appliedSortLabel ? (
          <Button
            startIcon={<SlidingIcons />}
            onClick={() => toggleDrawer(true)}
          >
            Filters
          </Button>
        ) : (
          <Skeleton variant="rounded" width={160} height={30} />
        )}
        <Sort />
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {}}
        PaperProps={{
          sx: {
            width: 300,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.01)", // modo dark
            // borderRight: "1px solid rgba(255, 255, 255, 0.01)",
            // boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          },
        }}
      >
        <Box
          sx={{
            width: 300,
            padding: "20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            backgroundColor: "rgba(255, 255, 255, 0.01)", // compatible con modo dark
            // borderRight: "1px solid rgba(255, 255, 255, 0.1)",
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
