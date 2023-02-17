import style from "./Detail.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { getPokemon } from "../../redux/actions";

function Detail () {
    let {id} = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPokemon(id))
    },[dispatch, id])
    const data = useSelector(state => state.pokemonDetail)
  
    return(
        <div className={style.contenedor}>
                <div className={style.imgContenedor}>
                    <h2>{data.name}</h2>
                    <img src={data.image} alt={data.name}/>
                 </div>
               
                <div className={style.dataContenedor}>
                    <h4>Id: {data.id}</h4>
                    <h4>Type 1: {data.type1}</h4>
                    <h4>Type 2: {data.type2}</h4>    
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