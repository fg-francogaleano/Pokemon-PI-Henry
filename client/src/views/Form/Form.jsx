import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import {
  Button,
  FormControl,
  InputLabel,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import Grid2 from "@mui/material/Unstable_Grid2";
import validations from "./validations";

function Form() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  const { types } = useSelector((state) => state);

  const [shouldRedirect, setShouldRedirect] = useState(false);

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

  const handleSubmit = async (values) => {
    console.log(values);

    await axios
      .post("http://localhost:3001/pokemons", values)
      .then((res) => alert(res.data))
      .catch((err) => alert(err));
    setShouldRedirect(true);
  };

  const refForm = useRef();

  return (
    <>
      {shouldRedirect ? (
        <Redirect to="/home" />
      ) : (
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
          }) => (
            <Grid2
              container
              justifyContent="center"
              alignItems="center"
              height="100vh"
              padding="10px"
            >
              <Grid2
                outline="solid 1px rgba(255, 255, 255, 0.5)"
                borderRadius="3px"
                width="350px"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.35)",
                  padding: "20px",
                  border: "solid 1px black",
                }}
              >
                {/* FORM */}
                <Box ref={refForm} component="form" onSubmit={handleSubmit}>
                  {/* TITLE */}
                  <Box>
                    <Typography component="h1">CREATE POKEMON</Typography>
                  </Box>
                  {/* NAME */}
                  <Grid2>
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
                  </Grid2>
                  {/* TYPE 1 */}
                  <Grid2>
                    <FormControl
                      fullWidth
                      // sx={{ m: 1, minWidth: 120 }}
                      size="small"
                      variant="standard"
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Type 1
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={values.type1}
                        label="type 1"
                        onChange={handleChange}
                        name="type1"
                      >
                        {types?.map((type, index) => {
                          return (
                            <MenuItem key={index} value={type.name}>
                              {type.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid2>
                  {/* TYPE 2 */}
                  <Grid2>
                    <FormControl fullWidth size="small" variant="standard">
                      <InputLabel id="demo-simple-select-standard-label">
                        Type 2
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={values.type2}
                        label="type 2"
                        onChange={handleChange}
                        name="type2"
                      >
                        {types?.map((type, index) => {
                          return (
                            <MenuItem key={index} value={type.name}>
                              {type.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid2>
                  {/* HP */}
                  <Grid2>
                    <Typography gutterBottom>HP</Typography>
                    <Slider
                      name="hp"
                      value={values.hp}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      onChange={handleChange}
                    />
                  </Grid2>
                  {/* ATTACK */}
                  <Grid2>
                    <Typography gutterBottom>Attack</Typography>
                    <Slider
                      name="attack"
                      value={values.attack}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      onChange={handleChange}
                    />
                  </Grid2>
                  {/* DEFENSE */}
                  <Grid2>
                    <Typography gutterBottom>Defense</Typography>
                    <Slider
                      name="defense"
                      value={values.defense}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      onChange={handleChange}
                    />
                  </Grid2>
                  {/* SPEED */}
                  <Grid2>
                    <Typography gutterBottom>Speed</Typography>
                    <Slider
                      name="speed"
                      value={values.speed}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      onChange={handleChange}
                    />
                  </Grid2>
                  {/* WEIGHT */}
                  <Grid2>
                    <Typography gutterBottom>Weight</Typography>
                    <Slider
                      name="weight"
                      value={values.weight}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      onChange={handleChange}
                      min={10}
                      max={250}
                      valueLabelFormat={(value) => `${value.toFixed(1)} kg`}
                    />
                  </Grid2>
                  {/* HEIGHT */}
                  <Grid2>
                    <Typography gutterBottom>Height</Typography>
                    <Slider
                      name="height"
                      value={values.height}
                      aria-label="Default"
                      valueLabelDisplay="on"
                      onChange={handleChange}
                      min={0.5}
                      max={4}
                      step={0.01}
                      valueLabelFormat={(value) => `${value.toFixed(2)} m`}
                    />
                  </Grid2>

                  {/* IMAGE */}
                  {/* <div>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label htmlFor="" className={style.label}>
                  Image
                </label>
              </div> */}
                  <Button
                    variant="contained"
                    type="submit"
                    className={style.button}
                  >
                    CREATE
                  </Button>
                </Box>
              </Grid2>
            </Grid2>
          )}
        </Formik>
      )}
    </>
  );
}

export default Form;
