const { Router } = require('express');
const { getPokemonsHandler, 
        getPokemonHandler, 
        postPokemonHandler, 
        getTypesHandler,
        deleteHandler,
        getPokemonTypeHandler,
        } = require("../handlers/handlers")

const router = Router();

router.get("/pokemons", getPokemonsHandler);

router.get("/pokemons/:id", getPokemonHandler);

router.get("/types/:types", getPokemonTypeHandler)

router.post("/pokemons", postPokemonHandler);

router.get("/types", getTypesHandler);

router.delete("/:id/delete", deleteHandler);

router.get("/res200", (req, res) => {
        res.status(200);
})

module.exports = router;
