import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CACHE = "CACHE";
export const PATH = "PATH";


export const getPokemons = () => {
    return async function (dispatch){
        await axios.get("http://localhost:3001/pokemons")
        .then(res => {
            const data = res.data
            dispatch({ type: GET_POKEMONS, payload : data }) 
        })
        .catch(err => alert(err)) 
    }
};

export const getPokemon = (id) => {
    return async function (dispatch){
        const pokemons = await axios.get(
            `http://localhost:3001/pokemons/${id}`);
        const data = pokemons.data;
        data.name = data.name.toUpperCase()
        data.types = data.types.map(e => e.name)
        data.type1 = data.types[0].replace(/^\w/, c => c.toUpperCase())
        data.type2 = data.types.length>1?data.types[1].toUpperCase():""
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
        .catch(err => {
            console.log(err);
            alert(err.response.statusText)
        })

     }
};

export const cleanDetail = () => {
    return{
        type: CLEAN_DETAIL,
        payload: {}
    };
};

export const getCache = (pagina) => {
    return{
        type: CACHE,
        payload: pagina
    };
};

export const getPath = (path) => {
    return{
        type: PATH,
        payload: path
    };
};

