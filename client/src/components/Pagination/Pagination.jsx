import React from "react";
import { useSelector } from "react-redux";
import { useUpdateUrl } from "../../utils/url.Utils";
import { Pagination as MyPagination } from "@mui/material";

function Pagination() {
  const { totalPages } = useSelector((state) => state);
  const { updateUrl } = useUpdateUrl();

  const searchParams = new URLSearchParams(window.location.search);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const handleChange = (event, value) => {
    event.preventDefault();
    updateUrl({ page: value });
    window.location.reload();
  };

  return (
    <>
      <MyPagination
        count={totalPages}
        variant="outlined"
        color="secondary"
        onChange={handleChange}
        page={page}
      />
    </>
  );
}

export default Pagination;
