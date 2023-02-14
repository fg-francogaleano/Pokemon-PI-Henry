import { 
  GET_POKEMONS, 
  GET_POKEMON, 
  GET_TYPES, 
  GET_POKEMON_NAME, 
  GET_POKEMONS_FILTERED, 
  GET_BACK,
  GET_CACHE,
  GET_TO_BACK} from "./actions";

const initialState = {
    pokemons: [],
    pokemonSearch: [],
    pokemonsFiltered: [],
    cache: [],
    back: [],
    pokemonDetail: {},
  };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
       case GET_TO_BACK:
        return {
          ...state,
          back: action.payload
        }

      case GET_CACHE:
        return {
          ...state,
          cache: action.payload
        }

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
  console.log("REDUCER",initialState.pokemonDetail)
  export default rootReducer;