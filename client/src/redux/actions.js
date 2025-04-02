import axios from "axios";
import qs from "qs";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CACHE = "CACHE";
export const PATH = "PATH";
export const READY = "READY";
export const LOADING = "LOADING";
export const GET_TYPES = "GET_TYPES";

const URL = "http://localhost:3001";

export const getPokemons = (page, params) => {
  // console.log(params);

  return async function (dispatch) {
    dispatch(loading());
    // console.log(params);

    const queryString = qs.stringify(params, { arrayFormat: "brackets" });
    // console.log(queryString);

    await axios
      .get(`${URL}/pokemons?${queryString}`)
      .then((res) => {
        console.log(res.data);

        const data = res.data;
        // console.log(data);

        dispatch({ type: GET_POKEMONS, payload: data });
        dispatch(ready());
      })
      .catch((err) => {
        console.log(err);
        dispatch(ready());
      });
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    await axios
      .get(`${URL}/types`)
      .then((res) => {
        // console.log(res.data);

        // const data = res.data.map((pokemon) => pokemon.name);
        dispatch({ type: GET_TYPES, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getPokemon = (id) => {
  return async function (dispatch) {
    dispatch(loading());
    await axios
      .get(`${URL}/pokemons/${id}`)
      .then((res) => {
        console.log(res.data);

        const data = res.data;
        // data.name = data.name.toUpperCase();
        // data.types = data.types.map((e) => e.name);
        // data.type1 = data.types[0].replace(/^\w/, (c) => c.toUpperCase());
        // data.type2 =
        //   data.types.length > 1
        //     ? data.types[1].replace(/^\w/, (c) => c.toUpperCase())
        //     : "";
        dispatch({ type: GET_POKEMON, payload: data });
        setTimeout(() => {
          dispatch(ready());
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          dispatch(ready());
        }, 5000);
      });
  };
};

export const getPokemonName = (name) => {
  return async function (dispatch) {
    await axios
      .get(`${URL}/pokemons?name=${name}`)
      .then((res) => {
        res.data.types = res.data.types.map((e) => e.name);
        console.log(res.data);
        dispatch({ type: GET_POKEMON_NAME, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.statusText);
      });
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
    payload: {},
  };
};

export const getCache = (pagina) => {
  return {
    type: CACHE,
    payload: pagina,
  };
};

export const getPath = (path) => {
  return {
    type: PATH,
    payload: path,
  };
};

export const ready = () => {
  return {
    type: READY,
  };
};

export const loading = () => {
  return {
    type: LOADING,
  };
};
