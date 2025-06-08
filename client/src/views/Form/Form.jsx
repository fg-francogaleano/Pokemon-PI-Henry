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
  IconButton,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import validations from "./validations";
import TypeIcons from "../../components/TypeIcons/TypeIcons";
import { LiaRulerVerticalSolid } from "react-icons/lia";
import { MdOutlineBalance } from "react-icons/md";
import Swal from "sweetalert2";

function Form() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const { types } = useSelector((state) => state);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Name", "Physical Stats", "Battle Stats", "Types", "Image"];
  const [activeTypes, setActiveTypes] = useState([]);
  const [open, setOpen] = useState(false);

  const initialValues = {
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    weight: 130,
    height: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBJunzBcMTcmeEg8SpLG62KaT1MJtWF00smA&s",
    type1: "",
    type2: "",
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const URL = process.env.REACT_APP_URL_BACKEND;

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${URL}`, values);

      // Muestra la alerta
      Swal.fire({
        icon: "success",
        title: "Pokémon creado",
        text: "Tu Pokémon fue registrado correctamente.",
        confirmButtonColor: "#3085d6",
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
        setTimeout(() => {
          setOpen(false);
        }, 2000);
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
        submitForm,
      }) => (
        <Grid2
          container
          display="flex"
          justifyContent="center"
          // alignItems="center"
          // height="100vh"
          padding="10px"
        >
          <Grid2
            borderRadius="3px"
            width="400px"
            height="540px"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.01)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: "20px",
              boxShadow: 3,
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box
              component="form"
              sx={{ height: "415px" }}
              onSubmit={handleSubmit}
            >
              {activeStep === 0 && (
                <>
                  <Typography component="h1">Choose a name</Typography>
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
                </>
              )}

              {activeStep === 1 && (
                <>
                  <Typography component="h1">Set height and weight</Typography>
                  {["height", "weight"].map((stat) => (
                    <Box key={stat} mt={2}>
                      <Typography gutterBottom>
                        {stat === "height" ? (
                          <LiaRulerVerticalSolid />
                        ) : (
                          <MdOutlineBalance />
                        )}{" "}
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
                </>
              )}

              {activeStep === 2 && (
                <>
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
                </>
              )}

              {activeStep === 3 && (
                <>
                  <Typography component="h1">Choose Types</Typography>
                  <Grid container spacing={2}>
                    {types?.map((type, index) => (
                      <Grid
                        item
                        xs={3} // 12 / 3 = 4 columnas
                        key={index}
                        sx={{ display: "flex", justifyContent: "center" }}
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
                              {type.name.replace(/^\w/, (c) => c.toUpperCase())}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              {activeStep === 4 && (
                <>
                  <Typography component="h1">Upload an image</Typography>
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
                  <Button component="label" variant="outlined" fullWidth>
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFieldValue("image", reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </Button>
                  {values.image && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <img
                        src={values.image}
                        alt="Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </Box>
                  )}
                </>
              )}

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
                    type="button"
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                    disabled={
                      activeStep === 0 &&
                      (values.name === "" || Boolean(errors.name))
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                  >
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
                    No more than two types
                  </Alert>
                </Snackbar>
              </Stack>
            </Box>
          </Grid2>
        </Grid2>
      )}
    </Formik>
  );
}

export default Form;
