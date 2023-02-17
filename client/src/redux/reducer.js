import { 
  GET_POKEMONS, 
  GET_POKEMON,
  GET_POKEMON_NAME, 
  GET_POKEMONS_FILTERED, 
 } from "./actions";

const initialState = {
    pokemons: [],
    pokemonSearch: [],
    pokemonsFiltered: [],
    pokemonDetail: {},
  };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POKEMONS_FILTERED:
        return {
          ...state,
          pokemonsFiltered: action.payload
        }

      case GET_POKEMON_NAME:
        return {
          ...state,
          pokemonSearch: [ action.payload ]
        }

      case GET_POKEMONS:
        return {
            ...state,
            pokemons: action.payload 
          }
      
      case GET_POKEMON:
        return {
          ...state,
          pokemonDetail : action.payload 
        }    

      default:
        return {...state}       
    }
  };
  export default rootReducer;