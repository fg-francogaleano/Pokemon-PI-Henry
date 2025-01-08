import {
  GET_POKEMONS,
  GET_TYPES,
  GET_POKEMON,
  GET_POKEMON_NAME,
  CLEAN_DETAIL,
  CACHE,
  PATH,
  READY,
  LOADING,
} from "./actions";

const initialState = {
  pokemons: [],
  types: [],
  pokemonSearch: [],
  pokemonDetail: {},
  cache: 1,
  path: "",
  display: false,
  page: 1,
  limit: 15,
  totalPages: 0,
  totalItems: 0,
  message: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_DETAIL:
      return {
        ...state,
        pokemonDetail: {},
      };

    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemonSearch: [action.payload],
      };

    case GET_POKEMONS:
      return {
        ...state,
        totalItems: action.payload.totalItems,
        totalPages: action.payload.totalPages,
        pokemons: action.payload.data,
        page: action.payload.page,
        limit: action.payload.limit,
        message: action.payload.message,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_POKEMON:
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case CACHE:
      return {
        ...state,
        cache: action.payload,
      };

    case PATH:
      return {
        ...state,
        path: action.payload,
      };

    case LOADING:
      return {
        ...state,
        display: true,
      };

    case READY:
      return {
        ...state,
        display: false,
      };

    default:
      return { ...state };
  }
};
export default rootReducer;
