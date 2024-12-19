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
  const page = parseInt(searchParams.get("page") || "1", 10);

  console.log(page);
  // const [currentPage, setCurrentPage] = useState(1); // Página actual
  // const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(getPokemons(page));
  }, []);

  const { pokemons, totalPages, display } = useSelector((state) => state);
  console.log(pokemons);

  return (
    <>
      {display && pokemons?.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <div>
            <Paginado page={page} totalPages={totalPages} />
          </div>

          <div className={style.container}>
            {pokemons.map((pokemon, index) => {
              return (
                <Card
                  key={index}
                  id={pokemon.id}
                  name={pokemon.name.toUpperCase()}
                  type1={pokemon.types[0]?.replace(/^\w/, (c) =>
                    c.toUpperCase()
                  )}
                  type2={
                    pokemon.types.length > 1
                      ? pokemon.types[1]?.replace(/^\w/, (c) => c.toUpperCase())
                      : ""
                  }
                  image={pokemon.image}
                />
              );
            })}
          </div>

          {/* <div>
          <Paginado
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div> */}
        </div>
      )}
    </>
  );
}

export default Cards;
