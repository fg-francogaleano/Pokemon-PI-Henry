import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useUpdateUrl } from "../../utils/url.Utils";
import { useSelector } from "react-redux";

// const sortOptions = [
//   { label: "A - Z", icon: "bi bi-sort-alpha-down", value: "sort-alpha-down" },
//   { label: "Z - A", icon: "bi bi-sort-alpha-up", value: "sort-alpha-up" },
//   { label: "ID ASC", icon: "bi bi-sort-numeric-up", value: "sort-numeric-up" },
//   {
//     label: "ID DESC",
//     icon: "bi bi-sort-numeric-down",
//     value: "sort-numeric-down",
//   },
// ];

const sortOptions = [
  { label: "A-Z", value: { sort: "name", order: "ASC" } },
  { label: "Z-A", value: { sort: "name", order: "DESC" } },
  { label: "ID ASC", value: { sort: "id", order: "ASC" } },
  { label: "ID DESC", value: { sort: "id", order: "DESC" } },
];

function Sort() {
  const { updateUrl } = useUpdateUrl();
  const { appliedSortLabel } = useSelector((state) => state);
  const [selectedOption, setSelectedOption] = useState(sortOptions[2].label);

  useEffect(() => {
    if (appliedSortLabel) {
      setSelectedOption(appliedSortLabel);
    }
  }, [appliedSortLabel]);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  //   const handleMenuClose = (option) => {
  //     console.log(option);

  //     if (typeof option === "object") {
  //       setSelectedOption(option); // Solo actualizar si es un string válido
  //     }
  //     setMenuAnchor(null);
  //   };

  const handleMenuClose = (option) => {
    if (option) {
      // setSelectedOption(option);
      // console.log("Opción seleccionada:", option.value);
      // console.log(option);

      updateUrl(option.value);
    }
    setMenuAnchor(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button endIcon={<ExpandMoreIcon />} onClick={handleMenuOpen}>
          <Typography component="span" sx={{ color: "primary.main" }}>
            Sort:
          </Typography>
          <Typography
            component="span"
            sx={{ color: "black", margin: "0 10px" }}
          >
            {selectedOption.label || selectedOption}
          </Typography>
          {/* <i className={selectedOption.icon}></i> */}
        </Button>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => handleMenuClose()}
        >
          {sortOptions
            .filter((option) => option.label !== selectedOption.label) // Oculta la opción seleccionada
            .map((option, index) => (
              <MenuItem
                key={`${option.label}-${index}`}
                onClick={() => handleMenuClose(option)}
              >
                {option.label}
              </MenuItem>
            ))}
        </Menu>
      </Box>
    </>
  );
}

export default Sort;
