import { Box, LinearProgress, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
        <Box sx={{ width: "100%" }}>
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
        </Box>
      </Tooltip>
    </>
  );
}

export default Progress;
