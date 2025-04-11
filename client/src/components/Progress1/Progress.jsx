import { Box, LinearProgress, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Progress({ stat, value }) {
  const [progress, setProgress] = useState(0);
  //   console.log(`progress: ${progress}`, `stat:${stat}`);

  useEffect(() => {
    if (progress < value && progress < 100) {
      setTimeout(() => {
        setProgress((prev) => (prev += 1));
      }, 10);
    }
  }, [progress, value]);

  return (
    <>
      <Tooltip title={value} placement="right">
        {/* <Box display={"flex"}> */}
        {/* <Typography variant="subtitle1">
            {stat?.replace(/^\w/, (c) => c.toUpperCase())}
          </Typography> */}
        <Box sx={{ width: "100%" }}>
          <LinearProgress value={progress} variant="determinate" />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          {progress < 100 ? Math.round(progress) : "+100"}
        </Typography>
        {/* </Box> */}
      </Tooltip>
    </>
  );
}

export default Progress;
