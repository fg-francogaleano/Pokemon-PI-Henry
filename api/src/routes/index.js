const { Router } = require('express');
const { getPokemonsHandler, 
        getPokemonHandler, 
        postPokemonHandler, 
        getTypesHandler,
        deleteHandler} = require("../handlers/handlers")

const router = Router();

router.get("/pokemons", getPokemonsHandler);

router.get("/pokemons/:id", getPokemonHandler);

router.post("/pokemons", postPokemonHandler);

router.get("/types", getTypesHandler);

router.delete("/:id/delete", deleteHandler);

module.exports = router;
