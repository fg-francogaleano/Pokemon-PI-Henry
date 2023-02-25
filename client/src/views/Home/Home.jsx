import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import Paginado from "../../components/Paginado/Paginado";
import Filtered from "../../components/Filtered/Filtered";

    function Home () {
//___________________________________________________________________________________________ 
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getPokemons());
        }, [dispatch]);
       
        const {pokemons, pokemonSearch} = useSelector(state => state);
//__________________________________PAGINADO_________________________________________________
        // let itemsPerPage = 12;
        const [currentPage, setCurrentPage] = useState(1);
        const [pagina, setPagina] = useState(pokemons)
        // const [currentPage, setCurrentPage] = useState(0)
        console.log("PAGINA", pagina);
        useEffect(() => {
            setPagina(pokemons)
        }, [pokemons]);

        // useEffect(() => {
        //     setPagina([...pokemonsFiltered].splice(0, itemsPerPage))
        // },[pokemonsFiltered, itemsPerPage])
        
        // const handlerNext = () => {
        //     const totalPokemons = pokemonsFiltered.length;
        //     const nextPage = currentPage + 1
        //     const inicialIndex = nextPage * itemsPerPage;//150
        //     if(pagina.length !== itemsPerPage || totalPokemons === inicialIndex) return;
            
        //     if(!pokemonsFiltered.length){
        //         setPagina([...pokemons].splice(inicialIndex,itemsPerPage))
        //         setCurrentPage(nextPage)
        //     }else{
        //         setPagina([...pokemonsFiltered].splice(inicialIndex,itemsPerPage))
        //         setCurrentPage(nextPage)
        //     }
        // };

        
        // const handlerPrev = () => {
        //     const prevPage = currentPage - 1;
        //     const inicialIndex = prevPage * itemsPerPage;

        //     if(currentPage <= 0)return;

        //     if(!pokemonsFiltered.length){
        //         setPagina([...pokemons].splice(inicialIndex,itemsPerPage))
        //         setCurrentPage(prevPage)
        //     }else{
        //         setPagina([...pokemonsFiltered].splice(inicialIndex,itemsPerPage))
        //         setCurrentPage(prevPage)
        //     }
        // };
//___________________________________SEARCH PEER NAME___________________________________________

useEffect(() => {
    setPagina(pokemonSearch)
},[pokemonSearch])
//______________________________________FILTRADO______________________________________________

const filtrado = (value) => {
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
    setPagina(filtered);
    setCurrentPage(1);
};

//_____________________________________RENDERIZADO____________________________________________       
        return(
                <div>
                    <Filtered filtrado={filtrado}/>
                    <Cards 
                    pokemons={pagina} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}/>
                </div>
        )
    };

    export default Home;