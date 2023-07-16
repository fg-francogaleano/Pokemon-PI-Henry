import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemons, getTypes } from "../../redux/actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import style from "./Cards.module.css";
import Loader from "../Loader/Loader";

function Cards ({currentPage, setCurrentPage, pokemons}) {
    const { display, types } = useSelector(state => state);
    
    const dispatch = useDispatch();
    useEffect(() => {
        // if(pokemons.length === 0) dispatch(getPokemons());
        if(types.length === 0) dispatch(getTypes())
    }, [dispatch]);
    
    const itemsPerPage = 12

    const totalItems = pokemons.length;//40
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const indexStart = (currentPage - 1) * itemsPerPage;
    const indexEnd = indexStart + itemsPerPage;
    const currentPageItems = pokemons.slice(indexStart, indexEnd)
    console.log(currentPageItems);
    return(
        <>
        {display && pokemons.length === 0 ? (
            <Loader/>
        ) : (
        <div>
            <div>
                <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
            </div>
            
           <div className={style.container}>
           {currentPageItems.map((pokemon, index) => {
                return <Card
                    key={index}
                    id={pokemon.id}
                    name={pokemon.name.toUpperCase()}
                    type1={pokemon.types[0].replace(/^\w/, c => c.toUpperCase())}
                    type2={pokemon.types.length > 1 
                        ? pokemon.types[1].replace(/^\w/, c => c.toUpperCase())
                        :""}
                    image={pokemon.image}/>
                })}
           </div>

           <div>
                <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
            </div>
        </div>
        )}
        </>
    )
}

export default Cards;