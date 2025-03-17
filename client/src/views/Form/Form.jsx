import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import axios from "axios";
import { Formik } from "formik";
import MuiAlert from "@mui/material/Alert";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  // FormControl,
  // InputLabel,
  Slider,
  TextField,
  Typography,
  // Select,
  // MenuItem,
  Box,
  Grid,
  Stack,
  Snackbar,
  // Alert,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import validations from "./validations";
import TypeIcons from "../../components/TypeIcons/TypeIcons";

function Form() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const { types } = useSelector((state) => state);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Basic Info", "Types", "Image"];
  const [activeTypes, setActiveTypes] = useState([]); // Almacena los tipos seleccionados

  const initialValues = {
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    weight: 130,
    height: 2.3,
    image: "",
    type1: "",
    type2: "",
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (values) => {
    await axios
      .post("http://localhost:3001/pokemons", values)
      .then((res) => alert(res.data))
      .catch((err) => alert(err));
  };

  const [open, setOpen] = useState(false);

  const handleTypeToggle = (values, type, setFieldValue) => {
    const index = activeTypes.indexOf(type.name);

    if (index !== -1) {
      // Quitar el tipo si ya está seleccionado
      const newActiveTypes = [...activeTypes];
      newActiveTypes.splice(index, 1);
      setActiveTypes(newActiveTypes);

      if (values.type1 === type.name) setFieldValue("type1", "");
      if (values.type2 === type.name) setFieldValue("type2", "");
    } else {
      // Verificar si ya hay dos tipos seleccionados
      if (values.type1 && values.type2) {
        // Mostrar alerta si ya hay dos tipos seleccionados
        setOpen(true);

        // Cerrar el Snackbar después de 2 segundos (opcional)
        setTimeout(() => {
          setOpen(false);
        }, 2000);

        return; // Salir de la función para evitar agregar el tercer tipo
      }

      // Agregar el tipo si hay espacio disponible
      if (!values.type1) {
        setFieldValue("type1", type.name);
      } else if (!values.type2) {
        setFieldValue("type2", type.name);
      }

      setActiveTypes([...activeTypes, type.name]);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validations(values)}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <>
          {/* {console.log(values)} */}
          <Grid2
            container
            justifyContent="center"
            alignItems="center"
            height="100vh"
            padding="10px"
          >
            <Grid2
              borderRadius="3px"
              width="400px"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                padding: "20px",
                border: "solid 1px black",
              }}
            >
              <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box component="form" onSubmit={handleSubmit}>
                {activeStep === 0 && (
                  <>
                    <Typography component="h1">Basic Info</Typography>
                    <TextField
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      autoComplete="off"
                      label="Name"
                      helperText={touched.name && errors.name}
                      error={touched.name && errors.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="standard"
                      fullWidth
                      margin="normal"
                    />
                    {[
                      "hp",
                      "attack",
                      "defense",
                      "speed",
                      "weight",
                      "height",
                    ].map((stat) => (
                      <Box key={stat} mt={2}>
                        <Typography gutterBottom>
                          {stat.charAt(0).toUpperCase() + stat.slice(1)}
                        </Typography>
                        <Slider
                          name={stat}
                          value={values[stat]}
                          onChange={handleChange}
                          min={
                            stat === "weight" ? 10 : stat === "height" ? 0.5 : 0
                          }
                          max={
                            stat === "weight"
                              ? 250
                              : stat === "height"
                              ? 4
                              : 100
                          }
                          step={stat === "height" ? 0.01 : 1}
                          valueLabelDisplay="on"
                          valueLabelFormat={(value) =>
                            stat === "weight"
                              ? `${value.toFixed(1)} kg`
                              : stat === "height"
                              ? `${value.toFixed(2)} m`
                              : value
                          }
                        />
                      </Box>
                    ))}
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    <Typography component="h1">Types</Typography>
                    <Grid container spacing={2}>
                      {types?.map((type, index) => (
                        <Grid
                          item
                          xs={6} // Cada ícono ocupará la mitad del ancho del contenedor (dos columnas en pantallas pequeñas o más grandes)
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            values={values.type1}
                            name={type.name}
                            onClick={() => {
                              handleTypeToggle(values, type, setFieldValue);
                            }}
                          >
                            <Box>
                              <TypeIcons
                                svg={type.icon_svg}
                                isActive={activeTypes.includes(type.name)}
                                typeIcons={type.name}
                              />
                              {/* {console.log(addClass[index])} */}

                              <Typography>
                                {type.name.replace(/^\w/, (c) =>
                                  c.toUpperCase()
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    <Typography component="h1">Upload Image</Typography>
                    <TextField
                      type="text"
                      id="image"
                      name="image"
                      value={values.image}
                      autoComplete="off"
                      label="Image URL"
                      helperText={touched.image && errors.image}
                      error={touched.image && errors.image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="standard"
                      fullWidth
                      margin="normal"
                    />
                  </>
                )}

                {/* BOTTONS */}
                <Box display="flex" justifyContent="space-between" mt={3}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    Back
                  </Button>

                  {activeStep < steps.length - 1 ? (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      color="primary"
                      disabled={Boolean(
                        activeStep === 0 &&
                          (values.name === "" || Boolean(errors.name))
                      )}
                    >
                      Next
                    </Button>
                  ) : (
                    // SUBMIT
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  )}
                </Box>

                <Stack spacing={2} sx={{ width: "100%" }}>
                  <Snackbar open={open} autoHideDuration={6000}>
                    <Alert
                      variant="outlined"
                      severity="info"
                      sx={{ width: "100%" }}
                    >
                      No mas de dos tipes
                    </Alert>
                  </Snackbar>
                </Stack>
              </Box>
            </Grid2>
          </Grid2>
        </>
      )}
    </Formik>
  );
}

export default Form;
