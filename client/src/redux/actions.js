import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_POKEMONS_FILTERED = "GET_POKEMONS_FILTERED";
export const GET_CACHE = "GET_CACHE";
export const GET_TO_BACK = "GET_TO_BACK";

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
        data.name = data.name.toUpperCase()
        data.types = data.types.map(e => e.name)
        data.type1 = data.types[0].toUpperCase()
        data.type2 = data.types.length>1?data.types[1].toUpperCase():"No posee"
        console.log("DETALLES",data)
        dispatch({ type: GET_POKEMON, payload : data})
      
     }
};

export const getPokemonName = (name) => {
    return async function (dispatch){
        await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        .then(res => {
            res.data.types = res.data.types.map((e => e.name))
            console.log(res.data);
            dispatch({ type: GET_POKEMON_NAME, payload : res.data})
        })
        .catch(err => alert(err))
     }
};

export const getPokemonsFiltered = (filtered) => {
    console.log("PASO N°2, LLEGA LA ACTIONS", filtered);
    return{
        type: GET_POKEMONS_FILTERED,
        payload: filtered
    };
};

export const getCache = (estadoBack) => {
    console.log("BACK EN ACTIONS",estadoBack);
    return {
        type: GET_CACHE,
        payload: estadoBack
    };
};

export const getToBack = (payload) => {
    return {
        type: GET_TO_BACK,
        payload: payload
    }
}