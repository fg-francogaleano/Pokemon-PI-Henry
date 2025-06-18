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
      {appliedSortLabel ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            padding: "10px",
          }}
        >
          <Button
            size="small"
            startIcon={<SlidingIcons />}
            onClick={() => toggleDrawer(true)}
          >
            Filters
          </Button>

          <Sort />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            padding: "10px",
          }}
        >
          <Skeleton
            variant="rounded"
            width={90}
            height={40}
            sx={{
              borderRadius: "100px",
              padding: "4px 5px",
            }}
          />

          <Skeleton
            variant="rounded"
            width={160}
            height={40}
            sx={{
              borderRadius: "100px",
              padding: "4px 5px",
            }}
          />
        </Box>
      )}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {}}
        // PaperProps={{
        //   sx: {
        //     width: 300,
        //     backdropFilter: "blur(12px)",
        //     WebkitBackdropFilter: "blur(12px)",
        //     backgroundColor: "rgba(255, 255, 255, 0.01)",
        //   },
        // }}
      >
        <Box
          sx={{
            width: 300,
            padding: "20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // backdropFilter: "blur(5px)",
            // WebkitBackdropFilter: "blur(5px)",
            // backgroundColor: "rgba(255, 255, 255, 0.01)",
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
