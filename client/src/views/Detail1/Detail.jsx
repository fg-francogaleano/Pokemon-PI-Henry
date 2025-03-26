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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import { flexbox, styled } from "@mui/system";
import Progress from "../../components/Progress1/Progress";
import Count from "../../components/Count/Count";

const Container = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 10,
  backgroundColor: "rgba(249, 245, 245, 0.59)",
  [theme.breakpoints.up("md")]: {
    marginLeft: 150,
    marginRight: 150,
  },
}));

const Detail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { display, pokemonDetail } = useSelector((state) => state);
  console.log(pokemonDetail);

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
    <Container>
      {display ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={540}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">
              DETAIL POKEDEX #{pokemonDetail.id}
            </Typography>
            <IconButton onClick={handlerBack}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h5">{pokemonDetail.name}</Typography>
              <Box display="flex" justifyContent="center" width="100%">
                <img
                  src={pokemonDetail.image}
                  alt={pokemonDetail.name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
              <Box display="flex" justifyContent="center" gap={2}>
                <Typography variant="subtitle1">
                  {pokemonDetail.type1}
                </Typography>
                {pokemonDetail.type2 && (
                  <Typography variant="subtitle1">
                    {pokemonDetail.type2}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                STATS
              </Typography>
              {["hp", "attack", "defense", "speed"].map((stat, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="subtitle1">
                    {stat.toUpperCase()}
                  </Typography>
                  <Progress stat={pokemonDetail[stat]} />
                </Box>
              ))}
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Box mb={2}>
                  <Count stat={pokemonDetail["height"]} name="height" />
                  <Typography variant="subtitle1"> HEIGHT</Typography>
                </Box>
                <Box mb={2}>
                  <Count stat={pokemonDetail["weight"]} name="weight" />
                  <Typography variant="subtitle1">WEIGHT</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Detail;
