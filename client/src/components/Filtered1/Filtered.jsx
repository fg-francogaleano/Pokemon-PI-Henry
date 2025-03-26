import React, { useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useUpdateUrl } from "../../utils/url.Utils";

const CustomAccordion = styled(Accordion)({
  boxShadow: "none",
  marginBottom: "1px",
  "&:before": {
    display: "none",
  },
  defaultExpanded: true,
});

const statsOptions = ["hp", "attack", "defense", "speed", "weight", "height"];

const Filtered = () => {
  const { updateUrl, clearAllFilters, removeFilter } = useUpdateUrl();

  const { types, appliedFilters } = useSelector((state) => state);

  const [selectedTypes, setSelectedTypes] = useState(appliedFilters.type || []);

  const [selectedSources, setSelectedSources] = useState(
    appliedFilters.source || []
  );
  const [statRanges, setStatRanges] = useState(appliedFilters.stats || {});
  const [selectedStats, setSelectedStats] = useState([]);
  const [showAllTypes, setShowAllTypes] = useState(false);

  const handleTypeChange = (event) => {
    const { name, checked } = event.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, name] : prev.filter((t) => t !== name)
    );
  };

  const handleSourceChange = (event) => {
    setSelectedSources([event.target.name]); // Solo mantiene la opción seleccionada
  };

  const handleStatChange = (event) => {
    const newStat = event.target.value;

    if (!selectedStats.includes(newStat)) {
      setSelectedStats([...selectedStats, newStat]);
      setStatRanges({ ...statRanges, [newStat]: { min: "", max: "" } });
    }
  };

  let timeoutId;

  const handleInputChange = (stat, event) => {
    const { name, value } = event.target;

    // Limpiar caracteres no numéricos
    const numericValue = value.replace(/\D/g, "");

    // Limpiar cualquier tiempo de espera anterior
    clearTimeout(timeoutId);

    setStatRanges((prev) => ({
      ...prev,
      [stat]: { ...prev[stat], [name]: numericValue },
    }));

    // Esperar antes de validar (por ejemplo, 800ms después de que el usuario deja de escribir)
    timeoutId = setTimeout(() => {
      setStatRanges((prev) => {
        let min = Number(prev[stat].min);
        let max = Number(prev[stat].max);

        // Si el usuario aún no ha ingresado el valor máximo, no hacer nada
        if (isNaN(min) || isNaN(max) || prev[stat].max === "") return prev;

        // Intercambiar si min es mayor que max
        if (min > max) {
          [min, max] = [max, min];
        }

        return {
          ...prev,
          [stat]: { min: min.toString(), max: max.toString() },
        };
      });
    }, 800); // Tiempo de espera antes de validar e intercambiar
  };

  const handleRemoveStat = (stat) => {
    setSelectedStats(selectedStats.filter((s) => s !== stat));
    const updatedRanges = { ...statRanges };
    delete updatedRanges[stat];
    setStatRanges(updatedRanges);
  };

  const isApplyDisabled = () => {
    return (
      selectedTypes.length > 0 ||
      selectedSources.length > 0 ||
      (selectedStats.length > 0 &&
        selectedStats.some(
          (stat) => statRanges[stat]?.min && statRanges[stat]?.max
        ))
    );
  };

  const applyFilters = () => {
    updateUrl({
      type: selectedTypes,
      source: selectedSources,
      stats: statRanges,
    });

    // window.location.reload();
  };

  const [filtersReady, setFiltersReady] = useState(false);

  useEffect(() => {
    // Se ejecuta solo después de que la página se recarga
    setFiltersReady(window.location.search.length > 0);
  }, []);
  return (
    <>
      {/* CHIPS */}
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        {filtersReady && (
          <Box sx={{ display: "block" }}>
            <Button onClick={clearAllFilters}>Clear All</Button>
          </Box>
        )}
        <Box display="flex" flexWrap="wrap" gap={1}>
          {appliedFilters.type?.map((type) => (
            <Chip
              key={type}
              label={type.replace(/^\w/, (c) => c.toUpperCase())}
              onDelete={() => removeFilter("type", type)}
              name={type}
            />
          ))}

          {appliedFilters.source ? (
            <Chip
              key={appliedFilters.source}
              label={appliedFilters.source.replace(/^\w/, (c) =>
                c.toUpperCase()
              )}
              onDelete={() => removeFilter("source", appliedFilters.source)}
            />
          ) : null}

          {appliedFilters.stats
            ? Object.keys(appliedFilters.stats).map((stat) => (
                <Chip
                  key={stat}
                  label={`${stat.replace(/^\w/, (c) => c.toUpperCase())} (${
                    statRanges[stat]?.min
                  } - ${statRanges[stat]?.max})`}
                  onDelete={() => removeFilter("stats", stat)}
                />
              ))
            : null}
        </Box>
      </Box>

      {/* TYPES */}
      <CustomAccordion disableGutters defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid2 container spacing={2}>
            {(showAllTypes ? types : types.slice(0, 6)).map((type, index) => (
              <Grid2 xs={6} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={type.name}
                      checked={selectedTypes.includes(type.name)}
                      onChange={handleTypeChange}
                    />
                  }
                  label={type.name.replace(/^\w/, (c) => c.toUpperCase())}
                />
              </Grid2>
            ))}
          </Grid2>
          {types.length > 8 && (
            <Button onClick={() => setShowAllTypes(!showAllTypes)}>
              {showAllTypes ? "Show less" : "Show more"}
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
                control={
                  <Checkbox
                    name="created"
                    checked={selectedSources.includes("created")}
                    onChange={handleSourceChange}
                  />
                }
                label="Created"
              />
            </Grid2>
            <Grid2 xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="pokeApi"
                    checked={selectedSources.includes("pokeApi")}
                    onChange={handleSourceChange}
                  />
                }
                label="PokeAPI"
              />
            </Grid2>
          </Grid2>
        </AccordionDetails>
      </CustomAccordion>

      <Divider />

      {/* STATS */}
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
                  type="number"
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
                  type="number"
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

      <Button
        variant="outlined"
        onClick={() => applyFilters()}
        disabled={!isApplyDisabled()}
      >
        Apply
      </Button>
    </>
  );
};

export default Filtered;
