import { useState } from "react"
import Card from "../Card/Card"
import Paginado from "../Paginado/Paginado";
import style from "./Cards.module.css"

function Cards ({pokemons, currentPage, setCurrentPage}) {
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const totalItems = pokemons.length;//40
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const indexStart = (currentPage - 1) * itemsPerPage;
    const indexEnd = indexStart + itemsPerPage;
    const currentPageItems = pokemons.slice(indexStart, indexEnd)


    return(
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
                    type1={pokemon.types[0].toUpperCase()}
                    type2={pokemon.types.length > 1 
                        ? pokemon.types[1].toUpperCase()
                        :""}
                    image={pokemon.image}/>
                })}
           </div>

           <div>
                <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
            </div>
        </div>
    )
}

export default Cards;