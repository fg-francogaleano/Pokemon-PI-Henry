import React from "react";
import { useSelector } from "react-redux";
import { useUpdateUrl } from "../../utils/url.Utils";
import { Box, Pagination as MyPagination } from "@mui/material";

function Pagination() {
  const { totalPages } = useSelector((state) => state);
  const { updateUrl } = useUpdateUrl();

  const searchParams = new URLSearchParams(window.location.search);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const handleChange = (event, value) => {
    // console.log(value);

    event.preventDefault();
    updateUrl({ page: value });
    window.location.reload();
  };

  return (
    <Box sx={{ mb: "20px" }}>
      <MyPagination
        count={totalPages}
        variant="outlined"
        color="secondary"
        onChange={handleChange}
        page={page}
      />
    </Box>
  );
}

export default Pagination;
