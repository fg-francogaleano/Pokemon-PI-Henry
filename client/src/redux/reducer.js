import { 
  GET_POKEMONS, 
  GET_POKEMON,
  GET_POKEMON_NAME, 
  CLEAN_DETAIL,
  CACHE,
  PATH, 
 } from "./actions";

const initialState = {
    pokemons: [],
    pokemonSearch: [],
    pokemonDetail: {},
    cache: 1,
    path: ""
  };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case CLEAN_DETAIL:
        return {
          ...state,
          pokemonDetail: {}
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
      case CACHE:
        return {
          ...state,
          cache: action.payload
        }
      
      case PATH:
        return {
          ...state,
          path: action.payload
        }

      default:
        return {...state}       
    }
  };
  export default rootReducer;