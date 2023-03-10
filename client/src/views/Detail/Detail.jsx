import style from "./Detail.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemon, cleanDetail } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Detail () {
    let {id} = useParams();
    const dispatch = useDispatch();
   
    const handlerDelete = async (event) => {
        console.log(event);
        let pokemon = event.target.value
        console.log(pokemon);
        await axios.delete(`http://localhost:3001/${pokemon}/delete`)
        .then(res => alert(res.data))
        .catch(err => {
            console.log(err.response.data);
            alert(err.response.data.error)
        });
    };
    
    useEffect(() => {
        dispatch(getPokemon(id))
        return () => {
            dispatch(cleanDetail())  ;
        }
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
                <div>
                    <button onClick={handlerDelete} value={id}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>
        </div>
    )
};

export default Detail;