import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Progress({ stat }) {
  const [progress, setProgress] = useState(0);
  //   console.log(`progress: ${progress}`, `stat:${stat}`);

  useEffect(() => {
    if (progress < stat && progress < 100) {
      setTimeout(() => {
        setProgress((prev) => (prev += 1));
      }, 10);
    }
  }, [progress, stat]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgress value={progress} variant="determinate" />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {progress < 100 ? Math.round(progress) : "+100"}
        </Typography>
      </Box>
    </>
  );
}

export default Progress;
