import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import { Box, Skeleton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Cards() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(window.location.search);

  const getParamsAsObject = () => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const paramsUrl = getParamsAsObject();
    setLoading(true);

    setTimeout(() => {
      dispatch(getPokemons(page, paramsUrl));
      setLoading(false);
    }, 1000);
  }, [dispatch, page]);

  const { pokemons, message } = useSelector((state) => state);
  const skeletonCount = 8;

  return (
    <>
      {/* SKELETON */}
      {loading && pokemons?.length === 0 ? (
        <Box className={style.container}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={330}
              height={350}
              sx={{ margin: "16px auto", borderRadius: "8px" }}
            />
          ))}
        </Box>
      ) : message ? (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            background: "black",
            color: "white",
            textAlign: "center",
            padding: "20px",
          }}
        >
          {message}
        </Box>
      ) : (
        <Box>
          {/* PAGINATION */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination />
          </Box>

          {/* MAP OF CARD */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              padding: "20px 55px",
              gap: "10px",
            }}
          >
            {pokemons?.map((pokemon, index) => (
              <Link to={`/detail/${pokemon.id}`} key={index}>
                <Grid2 xs={12} sm={6} md={4} lg={3}>
                  <Card
                    id={pokemon.id}
                    name={pokemon.name.toUpperCase()}
                    types={pokemon.types}
                    image={pokemon.image}
                  />
                </Grid2>
              </Link>
            ))}
          </Box>

          {/* PAGINATION */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Cards;
