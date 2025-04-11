const { Pokemon, Type, PokemonTypes } = require("../db");
const axios = require("axios");
const { iconsMap } = require("../util/util");
const { Op } = require("sequelize");

// --------------------------------------------POKEMONS API--------------------------------------------------------
const pokemonsAllApi = async () => {
  const pokeapi = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=500"
  );
  const urls = pokeapi.data.results.map((e) => e.url);

  const detalles = await Promise.all(
    urls.map((url) => axios.get(url).then((res) => res.data))
  );

  const data = detalles.map((detalle) => ({
    id: detalle.id,
    name: detalle.name,
    hp: detalle.stats.find((e) => e.stat.name === "hp").base_stat,
    attack: detalle.stats.find((e) => e.stat.name === "attack").base_stat,
    defense: detalle.stats.find((e) => e.stat.name === "defense").base_stat,
    speed: detalle.stats.find((e) => e.stat.name === "speed").base_stat,
    weight: detalle.weight,
    height: detalle.height,
    image: detalle.sprites.other.home.front_default,
    types: detalle.types.map((e) => e.type.name),
    isUserCreated: false,
  }));
  return data;
};

// ----------------------------------------POKEMONS BASE DE DATOS--------------------------------------------------

const pokemonsAllBDD = async (
  page,
  limit,
  type,
  source,
  sort = "name",
  order = "ASC",
  stats
) => {
  const offset = (page - 1) * limit;
  console.log(type);

  // Construcción del objeto "where" dinámicamente
  const whereConditions = {};
  const appliedFilters = {};
  if (source) {
    appliedFilters.source = source;

    if (source === "created") {
      whereConditions.isUserCreated = true; // Filtrar por Pokémon creados por el usuario
    }
  }

  if (stats) {
    appliedFilters.stats = {}; // Inicializar stats en los filtros aplicados
    Object.keys(stats).forEach((statKey) => {
      const stat = stats[statKey];
      if (stat.min !== undefined && stat.max !== undefined) {
        whereConditions[statKey] = {
          [Op.between]: [parseInt(stat.min, 10), parseInt(stat.max, 10)],
        };
        appliedFilters.stats[statKey] = { min: stat.min, max: stat.max };
      }
    });
  }

  const includeConditions = {
    model: Type,
    attributes: ["id", "name", "icon_svg"],
    through: {
      attributes: [],
    },
    ...(type ? { where: { name: type } } : {}), // Filtrar por tipo
  };

  if (type) {
    appliedFilters.type = Array.isArray(type) ? type : [type];
  }

  let appliedSortLabel = "";
  switch (`${sort}-${order.toUpperCase()}`) {
    case "name-ASC":
      appliedSortLabel = "a-z";
      break;
    case "name-DESC":
      appliedSortLabel = "z-a";
      break;
    case "id-ASC":
      appliedSortLabel = "ID ASC";
      break;
    case "id-DESC":
      appliedSortLabel = "ID DESC";
      break;
    default:
      appliedSortLabel = `${sort} ${order.toUpperCase()}`;
  }

  const results = await Pokemon.findAndCountAll({
    include: includeConditions,
    where: whereConditions,
    order: [[sort, order.toUpperCase()]],
    distinct: true, // Asegura que los duplicados no se cuenten
    limit, // Número de resultados por página
    offset, // Desplazamiento inicial
  });

  if (results.rows.length === 0) {
    return {
      message: "No se encontraron coincidencias con los filtros aplicados.",
      totalItems: 0,
      totalPages: 0,
      data: [],
      page,
      limit,
      appliedFilters, // Agregar filtros aplicados aunque no haya resultados
      appliedSort: { sort, order },
      appliedSortLabel,
    };
  }

  return {
    totalItems: results.count, // Total de elementos en la base de datos
    totalPages: Math.ceil(results.count / limit), // Total de páginas disponibles
    data: results.rows, // Resultados de la página actual
    page,
    limit, // Página actual
    appliedFilters, // Agregar los filtros aplicados en la respuesta
    appliedSort: { sort, order },
    appliedSortLabel,
  };
};

// ---------------------------------------POKEMONS API+BASE DE DATOS------------------------------------------------

const pokemonAll = async (page, limit) => {
  const api = await pokemonsAllApi();
  const BDD = await pokemonsAllBDD();
  // console.log(BBD, "acacacaca");

  const all = api.concat(BDD);
  // console.log(all);

  const allClean = all.map((e) => {
    return {
      id: e.id,
      name: e.name,
      hp: e.hp,
      attack: e.attack,
      defense: e.defense,
      speed: e.speed,
      weight: e.weight,
      height: e.height,
      image: e.image,
      types: e.types.map((a) => a.name),
    };
  });

  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);

  // Calcular el índice inicial y final
  const startIndex = (pageInt - 1) * limitInt;
  const endIndex = startIndex + limitInt;

  // Extraer los resultados de la página solicitada
  const results = all.slice(startIndex, endIndex);

  return {
    page: pageInt,
    limit: limitInt,
    totalResults: allClean.length,
    totalPages: Math.ceil(allClean.length / limitInt),
    data: results,
  };
};
// --------------------------------------------TODOS LOS TYPES-------------------------------------------------------

const typesAllApi = async () => {
  const pokeapi = await axios.get("https://pokeapi.co/api/v2/type");
  let types = [];
  const result = pokeapi.data.results;
  result.map((e) => types.push({ name: e.name }));
  return types;
};
// ------------------------------------------------API POR ID-------------------------------------------------------

const pokemonByIdApi = async (id) => {
  const pokemonApi = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${id}?offset=0&limit=40`
  );
  const data = pokemonApi.data;
  let types = [];
  data.types.map((e) => types.push({ name: e.type.name }));

  const pokemon = {
    id: data.id,
    name: data.name,
    hp: data.stats.find((e) => e.stat.name === "hp").base_stat,
    attack: data.stats.find((e) => e.stat.name === "attack").base_stat,
    defense: data.stats.find((e) => e.stat.name === "defense").base_stat,
    speed: data.stats.find((e) => e.stat.name === "speed").base_stat,
    weight: data.weight,
    height: data.height,
    image: data.sprites.other.home.front_default,
    types,
  };
  console.log(pokemon);
  return pokemon;
};

// -----------------------------------------------API POR NAME-------------------------------------------------------

const pokemonByNameApi = async (name) => {
  const pokemonApi = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  const data = pokemonApi.data;

  const pokemon = {
    id: data.id,
    name: data.name,
    hp: data.stats.find((e) => e.stat.name === "hp").base_stat,
    attack: data.stats.find((e) => e.stat.name === "attack").base_stat,
    defense: data.stats.find((e) => e.stat.name === "defense").base_stat,
    speed: data.stats.find((e) => e.stat.name === "speed").base_stat,
    weight: data.weight,
    height: data.height,
    image: data.sprites.other.home.front_default,
    types: data.types.map((e) => e.type.name),
  };

  return pokemon;
};
// -----------------------------------------------BBD POR NAME-------------------------------------------------------

const pokemonByNameBBD = async (name) => {
  const resultsBDD = await Pokemon.findOne({
    where: { name },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  console.log(resultsBDD);
  return resultsBDD;
};

//------------------------------------------------CONTROLLERS--------------------------------------------------------

const findPokemonByName = async (name) => {
  const resultBDD = await pokemonByNameBBD(name);
  if (resultBDD) return resultBDD;
  const resultApi = await pokemonByIdApi(name);
  if (resultApi) return resultApi;
};

const findPokemonById = async (id) => {
  console.log(`linea 265:`, id);

  if (!isNaN(id)) {
    const pokemonApi = await pokemonByIdApi(id);
    return pokemonApi;
  } else {
    const pokemonBDD = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["id", "name", "icon_svg"],
        through: {
          attributes: [],
        },
      },
    });

    return pokemonBDD;
  }
};

const createPokemon = async (
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
) => {
  const types = [];
  types.push(type1);
  types.push(type2);
  console.log(types);

  const newPokemon = await Pokemon.create({
    id,
    name,
    hp,
    attack,
    defense,
    speed,
    weight,
    height,
    image,
  });

  const arrIdTypes = await idTypes(types);

  await newPokemon.addTypes(arrIdTypes);
  return "Pokemon creado correctamente";
};

const findTypes = async () => {
  const arrTypes = await typesAllApi();
  const allTypes = await Type.findAll({ attributes: ["name"] });

  const icons = iconsMap();

  console.log("CARGANDO LA BASE DE DATOS", allTypes);

  if (allTypes.length === 0) {
    // Paso 4: Combina los datos de la API con los íconos SVG y guarda en la base de datos
    for (let i = 0; i < arrTypes.length; i++) {
      const typeName = arrTypes[i].name; // Nombre del tipo
      const iconSvg = icons[typeName] || null; // Ícono SVG correspondiente o null si no está definido
      await Type.create({ name: typeName, icon_svg: iconSvg });
    }
  }
};

const cachePokemonsApi = async () => {
  try {
    // Obtener los datos desde la API externa
    const data = await pokemonsAllApi();
    console.log(data);

    for (const pokemon of data) {
      const pokemonData = {
        name: pokemon.name,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        weight: pokemon.weight,
        height: pokemon.height,
        image: pokemon.image,
        isUserCreated: false,
      };

      const [createdPokemon] = await Pokemon.upsert(pokemonData, {
        returning: true, // Para obtener la instancia creada/actualizada
      });
      const typeIds = await idTypes(pokemon.types);
      await createdPokemon.setTypes(typeIds);
    }
    // console.log("Datos cacheados exitosamente.");
  } catch (error) {
    console.error("Error al cachear los datos:", error);
  }
};

const idTypes = async (typesArray) => {
  // Obtener todos los tipos de la base de datos

  const typesAll = await Type.findAll({ raw: true });

  // Filtrar los IDs que coincidan con los nombres en el array

  const arrId = typesArray
    .map((type) => {
      const matchedType = typesAll.find((e) => e.name === type);
      // console.log(matchedType);

      return matchedType ? matchedType.id : null; // Si no encuentra el tipo, retorna null
    })
    .filter((id) => id !== null); // Eliminar valores nulos

  return arrId;
};

const deletePokemon = async (id) => {
  if (isNaN(id)) {
    const pokemon = await Pokemon.findByPk(id);
    await pokemon.destroy();
    return "Pokemon eliminado correctamente";
  } else {
    throw Error("No es posible eliminar este pokemon");
  }
};

module.exports = {
  createPokemon,
  findPokemonById,
  pokemonsAllApi,
  pokemonsAllBDD,
  pokemonAll,
  findPokemonByName,
  pokemonByNameApi,
  findTypes,
  typesAllApi,
  deletePokemon,
  cachePokemonsApi,
};
