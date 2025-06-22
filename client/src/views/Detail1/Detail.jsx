import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getPokemon, cleanDetail, getPath } from "../../redux/actions";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import Progress from "../../components/Progress1/Progress";
import Count from "../../components/Count/Count";
import TypeIcons from "../../components/TypeIcons/TypeIcons";
import { LiaRulerVerticalSolid } from "react-icons/lia";
import { MdOutlineBalance } from "react-icons/md";

const Container = styled(Paper)(({ theme }) => ({
  // margin: theme.spacing(10),
  padding: theme.spacing(5),
  borderRadius: 5,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)", // Para compatibilidad con Safari
  backgroundColor: "rgba(255, 255, 255, 0.01)", // Fondo blanco semitransparente
  [theme.breakpoints.up("md")]: {
    maxWidth: "670px",
    margin: "16px auto",

    padding: theme.spacing(2),
  },
}));

const Detail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { display, pokemonDetail } = useSelector((state) => state);
  // console.log(pokemonDetail);

  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemon(id));
    dispatch(getPath(history.location.pathname));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id, history.location.pathname]);

  const handlerBack = () => {
    history.goBack();
  };

  return (
    <Box component="article">
      <Container>
        {display ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: {
                xs: 1058, // menor a 600px
                sm: 1058, // menor a 900px
                md: 454, // 900px o más
              },
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* TITLE POKEDEX/ BOTTON CLOSE */}
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography
                variant="h4"
                margin="auto"
                padding="10px"
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                }}
              >
                POKEDEX #{pokemonDetail.id}
              </Typography>
              {/* CLOSE DESKTOP*/}
              <IconButton
                onClick={handlerBack}
                sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              >
                <CloseIcon />
              </IconButton>
              {/* BACK FOR MOVILE */}
              <IconButton
                onClick={handlerBack}
                sx={{
                  position: "absolute",
                  left: 16,
                  display: { xs: "block", md: "none" },
                }}
              >
                <i className="bi bi-arrow-left"></i>
              </IconButton>
            </Box>

            <Divider
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                },
              }}
            />

            <Grid container spacing={0}>
              {/* LEFT */}
              <Grid
                item
                xs={12}
                md={5.5}
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ marginTop: "15px " }}
              >
                {/* NAME */}
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {pokemonDetail.name?.toUpperCase()}
                </Typography>
                {/* IMAGE */}
                <Box display="flex" justifyContent="center" width="100%">
                  <img
                    src={pokemonDetail.image}
                    alt={pokemonDetail.name}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
                {/* TYPES */}
                <Box display="flex" justifyContent="center" gap={2}>
                  {pokemonDetail.types?.map((type, index) => (
                    <Box key={index}>
                      <TypeIcons svg={type.icon_svg} className={type.name} />
                      <Typography variant="span">
                        {type.name?.replace(/^\w/, (c) => c.toUpperCase())}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* DIVIDER */}
              <Grid item xs={0} md={1} display="flex" justifyContent="center">
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: "100%" }}
                />
              </Grid>

              {/* RIGHT */}
              <Grid item xs={12} md={5.5} sx={{ marginTop: "15px " }}>
                {/* TITLE */}
                <Typography variant="h5" gutterBottom>
                  Stats
                </Typography>

                {/* STATS PROGRESS */}
                {["hp", "attack", "defense", "speed"].map((stat, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="caption">
                      {stat?.replace(/^\w/, (c) => c.toUpperCase())}
                    </Typography>

                    <Progress stat={stat} value={pokemonDetail[stat]} />
                  </Box>
                ))}
                {/* HEIGHT/HEIGHT */}
                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  {/* HEIGHT */}
                  <Box sx={{}}>
                    <Box display={"flex"} gap={"2px"} sx={{}}>
                      <Box>
                        <LiaRulerVerticalSolid />
                      </Box>
                      <Count stat={pokemonDetail["height"]} name="height" />
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="span">Height</Typography>
                    </Box>
                  </Box>
                  {/* WEIGHT */}
                  <Box>
                    <Box display={"flex"} gap={"2px"} sx={{}}>
                      <Box>
                        <MdOutlineBalance />
                      </Box>
                      <Count stat={pokemonDetail["weight"]} name="weight" />
                    </Box>
                    <Box textAlign={"center"}>
                      <Typography variant="span">Weight</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Detail;
