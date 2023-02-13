import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPokemon, getTypes } from "../../redux/actions";

function Detail () {
    let {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPokemon(id))
        dispatch(getTypes(id))
    },[dispatch, id])
    const data = useSelector(state => state.pokemonDetail)
    const type = useSelector(state => state.types)
    const type1 = type[0]
    const type2 = type.length>1?type[1]:"No posee"
    
    return(
        <div>
            <div>
                <Link to="/home">
                    <button>BACK</button>
                </Link>
            </div>
            
            <div>
                <h2>{data.name}</h2>
                <img src={data.image} alt={data.name} />
                <h4>Type 1: {type1}</h4>
                <h4>Type 2: {type2}</h4>
                <h4>Id: {data.id}</h4>
                <h4>Hp: {data.hp}</h4>
                <h4>Attack: {data.attack}</h4>
                <h4>Defense: {data.defense}</h4>
                <h4>Speed: {data.speed}</h4>
                <h4>Height: {data.height}</h4>
                <h4>Weight: {data.weight}</h4>
            </div>
        </div>
    )
};

export default Detail;