import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import { Box } from "@mui/material";

function Cards() {
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(window.location.search);

  const getParamsAsObject = () => {
    const params = {};

    // Convertir los parámetros en un objeto
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  };

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const paramsUrl = getParamsAsObject();
    dispatch(getPokemons(page, paramsUrl));
  }, [dispatch, page]);

  const { pokemons, message, display } = useSelector((state) => state);

  return (
    <>
      {display && pokemons?.length === 0 ? (
        <Loader />
      ) : message ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            background: "black",
            color: "white",
            textAlign: "center",
            padding: "20px",
          }}
        >
          {message}
        </div>
      ) : (
        <div>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination />
          </Box>

          <div className={style.container}>
            {pokemons?.map((pokemon, index) => {
              return (
                <Card
                  key={index}
                  id={pokemon.id}
                  name={pokemon.name.toUpperCase()}
                  types={pokemon.types}
                  image={pokemon.image}
                />
              );
            })}
          </div>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination />
          </Box>
        </div>
      )}
    </>
  );
}

export default Cards;
