import Card from "../Card/Card"
import style from "./Cards.module.css"

function Cards ({pokemons}) {
    console.log("PASO N° 6, LLEGÓ A CARDS", pokemons);
    return(
        <div className={style.container}>
            {pokemons.map((pokemon, index) => {
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
    )
}

export default Cards;