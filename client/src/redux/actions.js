import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_POKEMONS_FILTERED = "GET_POKEMONS_FILTERED";

export const getPokemons = () => {
    return async function (dispatch){
        const pokemons = await axios.get(
            "http://localhost:3001/pokemons");
        const data = pokemons.data;
        console.log(data);
        dispatch({ type: GET_POKEMONS, payload : data })    
    }
};

export const getPokemon = (id) => {
    return async function (dispatch){
        const pokemons = await axios.get(
            `http://localhost:3001/pokemons/${id}`);
        const data = pokemons.data;
        dispatch({ type: GET_POKEMON, payload : data})
      
     }
};

export const getPokemonName = (name) => {
    return async function (dispatch){
        const pokemons = await axios.get(
            `http://localhost:3001/pokemons?name=${name}`);
        const data = pokemons.data;
        data.types = data.types.map(e => e.name)
        console.log("ACTIONS",data)
        dispatch({ type: GET_POKEMON_NAME, payload : data})
      
     }
};

export const getTypes = (id) => {
    return async function (dispatch){
        const pokemons = await axios.get(
            `http://localhost:3001/pokemons/${id}`);
        const data = pokemons.data;
        let a = data.types.map(e => e.name)
        dispatch({ type: GET_TYPES, payload : a})
         
     }
};

export const getPokemonsFiltered = (filtered) => {
    console.log("ACTIONS", filtered);
    return{
        type: GET_POKEMONS_FILTERED,
        payload: filtered
    }
}