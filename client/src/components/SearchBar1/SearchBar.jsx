import React, { useEffect, useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import { useUpdateUrl } from "../../utils/url.Utils";
import axios from "axios";
import qs from "qs";

const SearchContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
    marginLeft: theme.spacing(3),
  },
}));

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  paddingLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(0.5em + ${theme.spacing(0.5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function SearchBar() {
  const { updateUrl } = useUpdateUrl();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOnClick = (value = searchTerm) => {
    updateUrl({ q: value });
    window.location.reload();
  };

  const handleOnKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
      setSearchTerm(suggestions[highlightedIndex + 1].name);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (event.key === "Enter") {
      if (highlightedIndex >= 0) {
        handleOnClick(suggestions[highlightedIndex].name);
      } else {
        handleOnClick();
      }
      setIsFocused(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        const params = { q: searchTerm };
        const queryString = qs.stringify(params, {
          arrayFormat: "brackets",
        });

        try {
          const res = await axios.get(
            `http://localhost:3001/pokemons?${queryString}`
          );
          setSuggestions(res.data.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <SearchContainer>
      <Search
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          // Delay to allow click on suggestion before hiding
          setTimeout(() => setIsFocused(false), 100);
        }}
      >
        <IconButton
          aria-label="search"
          color="inherit"
          onClick={() => handleOnClick()}
        >
          <SearchIcon />
        </IconButton>

        <StyledInputBase
          inputRef={inputRef}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleOnKeyDown}
        />
      </Search>

      {searchTerm && isFocused && suggestions.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <List>
            {suggestions.slice(0, 10).map((suggestion, index) => (
              <ListItem
                key={index}
                button
                selected={index === highlightedIndex}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={() => handleOnClick(suggestion.name)}
              >
                <ListItemText primary={suggestion.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </SearchContainer>
  );
}

export default SearchBar;
