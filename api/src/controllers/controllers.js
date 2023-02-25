const { Pokemon, Type, PokemonTypes } = require("../db")
const axios = require("axios");

// --------------------------------------------POKEMONS API--------------------------------------------------------
const pokemonsAllApi = async () => {
    const pokeapi = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
    
    let urls = pokeapi.data.results
    let arrayUrls = urls.map(e => e.url ); 
    let arrayDetalles = [];
   
    for(var i = 0; i < arrayUrls.length; i++){
    
        const detalles = await axios(arrayUrls[i]);
        const detalle  = await detalles.data;
        let types = [];  
        detalle.types.map(e => types.push({name: e.type.name}))
        arrayDetalles.push({
            id: detalle.id,
            name: detalle.name,
            hp: detalle.stats.find(e => e.stat.name === "hp").base_stat,
            attack: detalle.stats.find(e => e.stat.name === "attack").base_stat,
            defense: detalle.stats.find(e => e.stat.name === "defense").base_stat,
            speed: detalle.stats.find(e => e.stat.name === "speed").base_stat,
            weight: detalle.weight,
            height: detalle.height,
            image: detalle.sprites.other.home.front_default,
            types
        });
   }; 
    
   return arrayDetalles;
};
// ----------------------------------------POKEMONS BASE DE DATOS--------------------------------------------------

const pokemonsAllBDD = async () => {
    const BBD = await Pokemon.findAll(
       {include: {
            model: Type,
            attributes: ["name"],
            through:{
                attributes: [] 
            }}
        },
    )
    return BBD;
};
// ---------------------------------------POKEMONS API+BASE DE DATOS------------------------------------------------

const pokemonAll = async () => {
    const api = await pokemonsAllApi();
    const BDD = await pokemonsAllBDD();
    const all = api.concat(BDD);
    const allClean = all.map(e => {
        return{
            id: e.id,
            name: e.name,
            hp: e.hp,
            attack: e.attack,
            defense: e.defense,
            speed: e.speed,
            weight: e.weight,
            height: e.height,
            image: e.image,
            types: e.types.map(a => a.name)
        }
    })
    
    return allClean;
};
// --------------------------------------------TODOS LOS TYPES-------------------------------------------------------

const typesAllApi = async () => {
    const pokeapi = await axios.get("https://pokeapi.co/api/v2/type")
    let types = [];
    const result = pokeapi.data.results
    result.map(e => types.push({name: e.name}) );
    console.log(1, types);
    return types;
};
// ------------------------------------------------API POR ID-------------------------------------------------------

const pokemonByIdApi = async (id) => {
    const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}?offset=0&limit=40`)
    const data = pokemonApi.data
    let types = [];  
    data.types.map(e => types.push({name: e.type.name}))
    
    
    const pokemon = {
        id: data.id,
        name: data.name,
        hp: data.stats.find(e => e.stat.name === "hp").base_stat,
        attack: data.stats.find(e => e.stat.name === "attack").base_stat,
        defense: data.stats.find(e => e.stat.name === "defense").base_stat,
        speed: data.stats.find(e => e.stat.name === "speed").base_stat,
        weight: data.weight,
        height: data.height,
        image: data.sprites.other.home.front_default,
        types
    };
    console.log(pokemon);
    return pokemon;
};

// -----------------------------------------------API POR NAME-------------------------------------------------------

const pokemonByNameApi = async (name) => {
    const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = pokemonApi.data
    
    const pokemon = {
        id: data.id,
        name: data.name,
        hp: data.stats.find(e => e.stat.name === "hp").base_stat,
        attack: data.stats.find(e => e.stat.name === "attack").base_stat,
        defense: data.stats.find(e => e.stat.name === "defense").base_stat,
        speed: data.stats.find(e => e.stat.name === "speed").base_stat,
        weight: data.weight,
        height: data.height,
        image: data.sprites.other.home.front_default,
        types: data.types.map(e => e.type.name)
    };
    
    return pokemon;
};
// -----------------------------------------------BBD POR NAME-------------------------------------------------------

const pokemonByNameBBD = async (name) => {
    const resultsBDD = await Pokemon.findOne({ 
        where : { name },
        include: {
            model: Type,
            attributes: ["name"],
            through:{
                attributes: [] 
            }
        }}
    );
    console.log(resultsBDD)
    return resultsBDD;
};

//------------------------------------------------CONTROLLERS--------------------------------------------------------

const findPokemonByName = async (name) => {
    const resultBDD = await pokemonByNameBBD(name);
    if(resultBDD) return resultBDD;
    const resultApi = await pokemonByIdApi(name) 
    if(resultApi) return resultApi;
}

const findPokemonById = async (id) => {
    
    if(!isNaN(id)){
        const pokemonApi = await pokemonByIdApi(id);
        return pokemonApi;
    }else{
        const pokemonBDD = await Pokemon.findByPk(id,{include: {
            model: Type,
            attributes: ["name"],
            through:{
                attributes: []
            }
        }},)
        
        return pokemonBDD;
    }
    
};

const createPokemon = async (id,name,hp,attack,defense,speed,weight,height,image,type1,type2) => {
    const newPokemon = await Pokemon.create({id,name,hp,attack,defense,speed,weight,height,image});
    const arrIdTypes = await idTypes(type1, type2)
    await newPokemon.addTypes(arrIdTypes);
    return "Pokemon creado correctamente";
};

const findTypes = async () => {
    const arrTypes = await typesAllApi();
    for(var i = 0; i < arrTypes.length; i++){
        await Type.create(arrTypes[i]);
    };
   return await Type.findAll({
    attributes: ["name"]
   })    
};

const idTypes = async (type1, type2) => {
    const typesAll = await Type.findAll({ raw: true });
    let arrId = [];
    typesAll.forEach(e => {
        if(e.name === type1) arrId.push(e.id);
        if(e.name === type2) arrId.push(e.id);
    });
    console.log("TIPOS",typesAll)
    console.log("ID",arrId);
    return arrId;
};

const deletePokemon = async (id) => {
     if(isNaN(id)){
        const pokemon = await Pokemon.findByPk(id);
        await pokemon.destroy();
        return "Pokemon eliminado correctamente"
     }else{
        throw Error("No es posible eliminar este pokemon")
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
    deletePokemon}