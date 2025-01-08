import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import style from "./Cards.module.css";
import Loader from "../Loader/Loader";

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
  console.log(message);

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
          <div>
            <Paginado />
          </div>

          <div className={style.container}>
            {pokemons?.map((pokemon, index) => {
              return (
                <Card
                  key={index}
                  id={pokemon.id}
                  name={pokemon.name.toUpperCase()}
                  type1={pokemon.types[0].name?.replace(/^\w/, (c) =>
                    c.toUpperCase()
                  )}
                  type2={
                    pokemon.types.length > 1
                      ? pokemon.types[1].name?.replace(/^\w/, (c) =>
                          c.toUpperCase()
                        )
                      : ""
                  }
                  image={pokemon.image}
                />
              );
            })}
          </div>

          <div>
            <Paginado />
          </div>
        </div>
      )}
    </>
  );
}

export default Cards;
