const { Pokemon, Type } = require("../db");
const {
  createPokemon,
  findPokemonById,
  findPokemonByName,
  pokemonAll,
  findTypes,
  deletePokemon,
  pokemonsAllBDD,
} = require("../controllers/controllers");
const qs = require("qs");

const getPokemonsHandler = async (req, res) => {
  const {
    name,
    page = 1,
    limit = 20,
    type,
    source,
    sort,
    order,
    stats,
  } = req.query;
  console.log(req.query, "aacaaaa");

  // Deserializar params en un objeto
  // const parsedParams = qs.parse(params, { ignoreQueryPrefix: true });

  try {
    if (name) {
      const pokemon = await findPokemonByName(name);
      res.status(200).json(pokemon);
    } else {
      const allPokemons = await pokemonsAllBDD(
        page,
        limit,
        type,
        source,
        sort,
        order,
        stats
      );
      res.status(200).json(allPokemons);
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const getPokemonHandler = async (req, res) => {
  const { id } = req.params;
  console.log("linea 54:", id);
  try {
    const pokemonBDD = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["id", "name", "icon_svg"],
        through: {
          attributes: [],
        },
      },
    });
    res.status(200).json(pokemonBDD);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const postPokemonHandler = async (req, res) => {
  try {
    const {
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      weight,
      height,
      image,
      type1,
      type2,
    } = req.body;
    console.log(req.body);

    const newPokemon = await createPokemon(
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      weight,
      height,
      image,
      type1,
      type2
    );
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

const getTypesHandler = async (req, res) => {
  try {
    const types = await Type.findAll({
      attributes: ["name", "id", "icon_svg"],
    });
    res.status(200).json(types);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const deleteHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await deletePokemon(id);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getPokemonTypeHandler = async (req, res) => {
  const { types } = req.params;
  console.log(types);
  try {
    const pokemon = await Pokemon.findAll({
      include: [
        {
          model: Type,
          where: { name: types },
        },
      ],
    });
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getPokemonsHandler,
  getPokemonHandler,
  postPokemonHandler,
  getTypesHandler,
  deleteHandler,
  getPokemonTypeHandler,
};
