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
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import Progress from "../../components/Progress1/Progress";
import Count from "../../components/Count/Count";
import TypeIcons from "../../components/TypeIcons/TypeIcons";
import { LiaRulerVerticalSolid } from "react-icons/lia";
import { MdOutlineBalance } from "react-icons/md";

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
          {/* TITLE POKEDEX */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" margin={"auto"}>
              POKEDEX #{pokemonDetail.id}
            </Typography>
            <IconButton onClick={handlerBack}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <Grid container spacing={2}>
            {/* IZQUIERDA */}
            <Grid
              item
              xs={12}
              md={5.5}
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ margin: "15px 0px" }}
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
                  style={{ maxWidth: "100%", height: "auto" }}
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

            {/* DERECHA */}
            <Grid item xs={12} md={5.5} sx={{ margin: "15px 0px" }}>
              {/* TITLE */}
              <Typography variant="h5" gutterBottom>
                Stats
              </Typography>

              {/* STATS PROGRESS */}
              {["hp", "attack", "defense", "speed"].map((stat, index) => (
                <Box key={index} mb={2}>
                  {/* <Typography variant="subtitle1">
                    {stat?.replace(/^\w/, (c) => c.toUpperCase())}
                  </Typography> */}

                  <Progress stat={stat} value={pokemonDetail[stat]} />
                </Box>
              ))}
              {/* HEIGHT/HEIGHT */}
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                {/* HEIGHT */}
                <Box mb={2} sx={{}}>
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
                <Box mb={2}>
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
  );
};

export default Detail;
