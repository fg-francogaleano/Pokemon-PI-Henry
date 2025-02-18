import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Typography,
  styled,
  Divider,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2";

const CustomAccordion = styled(Accordion)({
  boxShadow: "none",
  marginBottom: "1px",
  "&:before": {
    display: "none",
  },
  defaultExpanded: true,
});

const Filtered = () => {
  const { types } = useSelector((state) => state);
  const [selectedStats, setSelectedStats] = useState([]);
  const [statRanges, setStatRanges] = useState({});
  const [showAllTypes, setShowAllTypes] = useState(false);

  const statsOptions = ["hp", "attack", "defense", "speed", "weight", "height"];

  const handleStatChange = (event) => {
    const newStat = event.target.value;
    if (!selectedStats.includes(newStat)) {
      setSelectedStats([...selectedStats, newStat]);
      setStatRanges({ ...statRanges, [newStat]: { min: "", max: "" } });
    }
  };

  const handleInputChange = (stat, event) => {
    const { name, value } = event.target;
    setStatRanges((prev) => ({
      ...prev,
      [stat]: { ...prev[stat], [name]: value },
    }));
  };

  const handleRemoveStat = (stat) => {
    setSelectedStats(selectedStats.filter((s) => s !== stat));
    const updatedRanges = { ...statRanges };
    delete updatedRanges[stat];
    setStatRanges(updatedRanges);
  };

  return (
    <>
      {/* TYPES */}
      <CustomAccordion disableGutters defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid2 container spacing={2}>
            {(showAllTypes ? types : types.slice(0, 8)).map((type, index) => (
              <Grid2 xs={6} key={index}>
                <FormControlLabel
                  control={<Checkbox name={type.name} />}
                  label={type.name.replace(/^\w/, (c) => c.toUpperCase())}
                />
              </Grid2>
            ))}
          </Grid2>
          {types.length > 8 && (
            <Button onClick={() => setShowAllTypes(!showAllTypes)}>
              {showAllTypes ? "Ver menos" : "Ver más"}
            </Button>
          )}
        </AccordionDetails>
      </CustomAccordion>

      <Divider />

      {/* SOURCE */}
      <CustomAccordion disableGutters defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Source</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid2 container spacing={2}>
            <Grid2 xs={6}>
              <FormControlLabel
                control={<Checkbox name="created" />}
                label="Created"
              />
            </Grid2>
            <Grid2 xs={6}>
              <FormControlLabel
                control={<Checkbox name="pokeApi" />}
                label="PokeAPI"
              />
            </Grid2>
          </Grid2>
        </AccordionDetails>
      </CustomAccordion>

      <Divider />

      {/* STACTS */}
      <CustomAccordion disableGutters defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Stats</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Select
            value=""
            onChange={handleStatChange}
            displayEmpty
            fullWidth
            variant="standard"
          >
            <MenuItem value="" disabled>
              Select a stat
            </MenuItem>
            {statsOptions.map((stat) => (
              <MenuItem key={stat} value={stat}>
                {stat.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </AccordionDetails>
      </CustomAccordion>

      <Divider />
      {/* DYNAMIC ACCORDION RENDERING FOR EACH SELECTED STAT */}
      {selectedStats.map((stat) => (
        <div key={stat}>
          <CustomAccordion disableGutters defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                display="flex"
                justifyContent="start"
                width="100%"
                alignItems="center"
              >
                <Typography>{stat.toUpperCase()}</Typography>
                <IconButton size="small" onClick={() => handleRemoveStat(stat)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" alignItems="center" gap={1} width="100%">
                <TextField
                  variant="outlined"
                  label="Min"
                  name="min"
                  value={statRanges[stat]?.min || ""}
                  onChange={(e) => handleInputChange(stat, e)}
                  sx={{ flex: 1 }}
                  size="small"
                />
                <Typography>-</Typography>
                <TextField
                  variant="outlined"
                  label="Max"
                  name="max"
                  value={statRanges[stat]?.max || ""}
                  onChange={(e) => handleInputChange(stat, e)}
                  sx={{ flex: 1 }}
                  size="small"
                />
              </Box>
            </AccordionDetails>
          </CustomAccordion>
          <Divider />
        </div>
      ))}

      <Button variant="outlined">apply</Button>
    </>
  );
};

export default Filtered;
