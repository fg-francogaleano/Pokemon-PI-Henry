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
  Slider,
  TextField,
  Typography,
  Box,
  Grid,
  Stack,
  Snackbar,
  CircularProgress,
  Divider, // Importa CircularProgress para el estado de carga
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { LiaRulerVerticalSolid } from "react-icons/lia";
import { MdOutlineBalance } from "react-icons/md";
import Swal from "sweetalert2";
import validations from "./validations";
import TypeIcons from "../../components/TypeIcons/TypeIcons";
import { useHistory } from "react-router-dom";

function Form() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const { types } = useSelector((state) => state);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Name", "Physical Stats", "Battle Stats", "Types", "Image"];
  const [activeTypes, setActiveTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const initialValues = {
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    weight: 130,
    height: 2,
    image:
      "https://res.cloudinary.com/dexm7t5ty/image/upload/v1750111904/pokemon/yagluscioh1heusc0o0j.png",
    type1: "",
    type2: "",
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const URL = process.env.REACT_APP_URL_BACKEND;

  const handleSubmit = async (values) => {
    try {
      // Si la imagen fue subida y tenemos la URL de Cloudinary, `values.image` ya contendrá esa URL.
      // Si no se subió una imagen personalizada, `values.image` tendrá la URL por defecto o estará vacía.
      const res = await axios.post(`${URL}/pokemons`, values);
      const newPokemonId = res.data.id;

      Swal.fire({
        icon: "success",
        title: "Pokémon creado",
        text: "Tu Pokémon fue registrado correctamente.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        history.push(`/detail/${newPokemonId}`);
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al registrar el Pokémon.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleTypeToggle = (values, type, setFieldValue) => {
    const index = activeTypes.indexOf(type.name);
    if (index !== -1) {
      const newActiveTypes = [...activeTypes];
      newActiveTypes.splice(index, 1);
      setActiveTypes(newActiveTypes);
      if (values.type1 === type.name) setFieldValue("type1", "");
      if (values.type2 === type.name) setFieldValue("type2", "");
    } else {
      if (values.type1 && values.type2) {
        setOpen(true);
        setTimeout(() => setOpen(false), 2000);
        return;
      }
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

  const handleUpload = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (!file) return;

    setloading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`${URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data.url;

      setFieldValue("image", imageUrl);

      Swal.fire({
        icon: "success",
        title: "Imagen subida",
        text: "La imagen se subió correctamente a Cloudinary.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Error al subir",
        text: "Hubo un problema al subir la imagen.",
      });
      // Opcional: podrías restablecer la imagen a la por defecto si hubo un error
      // setFieldValue("image", initialValues.image);
    } finally {
      setloading(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => validations(values)}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
        setActiveStep(0);
        setActiveTypes([]);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        submitForm,
      }) => (
        <Box
          sx={{
            minHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            width: "100%",
          }}
        >
          <Grid2 container justifyContent="center" padding="10px" flexGrow={1}>
            <Grid2
              borderRadius="3px"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.01)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: "20px",
                width: { xs: "100%", sm: "auto", md: "auto" },
              }}
            >
              {/* STEPEER */}
              <Box display="flex" justifyContent="center">
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{ width: "100%" }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Box
                sx={{
                  minHeight: "50vh",
                  width: "100%",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {activeStep === 0 && (
                  <Box sx={{ width: "100%" }}>
                    <Typography component="h1">Choose a name</Typography>
                    <TextField
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      autoComplete="off"
                      label="Name"
                      helperText={touched.name && errors.name}
                      error={touched.name && Boolean(errors.name)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="standard"
                      fullWidth
                      margin="normal"
                    />
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box sx={{ width: "100%" }}>
                    <Typography component="h1">
                      Set height and weight
                    </Typography>

                    {["height", "weight"].map((stat) => (
                      <Box key={stat} mt={2}>
                        <Typography gutterBottom>
                          {stat === "height" ? (
                            <LiaRulerVerticalSolid />
                          ) : (
                            <MdOutlineBalance />
                          )}
                          {stat.charAt(0).toUpperCase() + stat.slice(1)}
                        </Typography>
                        <Slider
                          name={stat}
                          value={values[stat]}
                          onChange={handleChange}
                          min={stat === "weight" ? 10 : 0.5}
                          max={stat === "weight" ? 250 : 4}
                          step={stat === "height" ? 0.01 : 1}
                          valueLabelDisplay="on"
                          valueLabelFormat={(value) =>
                            stat === "weight"
                              ? `${value.toFixed(1)} kg`
                              : `${value.toFixed(2)} m`
                          }
                        />
                      </Box>
                    ))}
                  </Box>
                )}

                {activeStep === 2 && (
                  <Box sx={{ width: "100%" }}>
                    <Typography component="h1">Adjust battle stats</Typography>
                    {["hp", "attack", "defense", "speed"].map((stat) => (
                      <Box key={stat} mt={2}>
                        <Typography gutterBottom>
                          {stat.charAt(0).toUpperCase() + stat.slice(1)}
                        </Typography>
                        <Slider
                          name={stat}
                          value={values[stat]}
                          onChange={handleChange}
                          min={0}
                          max={100}
                          step={1}
                          valueLabelDisplay="on"
                        />
                      </Box>
                    ))}
                  </Box>
                )}

                {activeStep === 3 && (
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                      maxWidth: "350px",
                      mx: "auto",
                    }}
                  >
                    <Typography component="h1">Choose Types</Typography>
                    <Grid container spacing={1}>
                      {types?.map((type, index) => (
                        <Grid
                          item
                          xs={3}
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
                            onClick={() =>
                              handleTypeToggle(values, type, setFieldValue)
                            }
                          >
                            <Box>
                              <TypeIcons
                                svg={type.icon_svg}
                                isActive={activeTypes.includes(type.name)}
                                typeIcons={type.name}
                              />
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
                  </Box>
                )}

                {activeStep === 4 && (
                  <Box sx={{ width: "100%" }}>
                    <Typography component="h1">Upload an image</Typography>
                    {/* IMAGE URL */}
                    <TextField
                      type="text"
                      id="image"
                      name="image"
                      value={values.image}
                      autoComplete="off"
                      label="Image URL"
                      helperText={touched.image && errors.image}
                      error={touched.image && Boolean(errors.image)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="standard"
                      fullWidth
                      margin="normal"
                    />
                    <Divider textAlign="center">or</Divider>
                    {/* BUTTON TO SELECT AND UPLOAD IMAGE */}
                    <Button
                      component="label"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      {loading ? "Uploading..." : "Select and Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => handleUpload(event, setFieldValue)}
                      />
                      {loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            position: "absolute",
                            right: 16,
                            top: "50%",
                            marginTop: "-12px",
                          }}
                        />
                      )}
                    </Button>
                    {/* IMAGE PREVIEW */}
                    {values.image && (
                      <Box mt={2} display="flex" justifyContent="center">
                        <Box
                          sx={{
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "1px solid #ccc",
                          }}
                        >
                          <img
                            src={values.image}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
              {/* BOTTONS */}
              <Box
                sx={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  zIndex: 1000,
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                {activeStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                    disabled={
                      (activeStep === 0 &&
                        (values.name === "" || Boolean(errors.name))) ||
                      (activeStep === 4 && loading)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    disabled={loading}
                  >
                    Submit
                  </Button>
                )}
              </Box>

              {/* SNACKBAR */}
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar open={open} autoHideDuration={6000}>
                  <Alert severity="info" sx={{ width: "100%" }}>
                    No more than two types
                  </Alert>
                </Snackbar>
              </Stack>
            </Grid2>
          </Grid2>
        </Box>
      )}
    </Formik>
  );
}

export default Form;
