import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import Filtered from "../../components/Filtered/Filtered";
import Loader from "../../components/Loader/Loader";

    function Home () {
//___________________________________________________________________________________________ 
        const {pokemons, pokemonSearch, cache} = useSelector(state => state);
        
        const [currentPage, setCurrentPage] = useState(1);

        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getPokemons());
            setCurrentPage(cache)
        }, [dispatch]);
       
//__________________________________PAGINADO_________________________________________________
        const [pagina, setPagina] = useState(pokemons)
        console.log(pagina);
        useEffect(() => {
            setPagina(pokemons)
            return () => {
                setPagina([])
            }

        }, [pokemons]);
//___________________________________SEARCH PEER NAME___________________________________________

useEffect(() => {
    setPagina(pokemonSearch)
},[pokemonSearch])
//______________________________________FILTRADO______________________________________________

const filtrado = (value) => {
    console.log(value);
    let filtered;
    //NAME-ASC/DESC
    if(value === "ascName") filtered = [...pagina].sort((a, b) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
    });
    if(value === "descName") filtered = [...pagina].sort((a, b) => {
        if(a.name > b.name) return -1;
        if(a.name < b.name) return 1;
        return 0;
    });
    //ATTACK-ASC/DESC
    if(value === "ascAttack") filtered = [...pagina].sort((a, b) => {
        if(a.attack > b.attack) return 1;
        if(a.attack < b.attack) return -1;
        return 0;
    });
    if(value === "descAttack") filtered = [...pagina].sort((a, b) => {
        if(a.attack > b.attack) return -1;
        if(a.attack < b.attack) return 1;
        return 0;
    }); 
    //ORIGIN-CREATED/EXISTING
    if(value === "created") filtered = pokemons.filter(e => isNaN(e.id));
    if(value === "existing") filtered = pokemons.filter(e => !isNaN(e.id));
    //TYPES
    if(value === "normal") filtered = pagina.filter(e => e.types.find(a => a === value) === value)
    if(value === "fighting") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "flying") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "poison") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "ground") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "rock") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "bug") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "ghost") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "steel") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "fire") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "water") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "grass") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "electric") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "psychic") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "ice") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "dragon") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "dark") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "fairy") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "unknown") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    if(value === "shadow") filtered = pokemons.filter(e => e.types.find(a => a === value) === value)
    // All
    if(value === "all") filtered = pokemons;
    console.log(filtered);
    setPagina(filtered);
    setCurrentPage(1);
};

//_____________________________________RENDERIZADO____________________________________________       
        return(
                <div>
                    {/* <Loader isLoading={pagina.length === 0}> */}
                        <Filtered filtrado={filtrado}/>
                        <Cards 
                        pokemons={pagina} 
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage}/>
                    {/* </Loader> */}
                </div>
        )
    };

    export default Home;