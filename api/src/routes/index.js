const { Router } = require('express');
const { getPokemonsHandler, getPokemonHandler, postPokemonHandler, getTypesHandler} = require("../handlers/handlers")

const router = Router();

router.get("/pokemons", getPokemonsHandler);

router.get("/pokemons/:id", getPokemonHandler);

router.post("/pokemons", postPokemonHandler);

router.get("/types", getTypesHandler);

module.exports = router;
