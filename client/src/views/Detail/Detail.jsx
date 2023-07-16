import style from "./Detail.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getPokemon, cleanDetail, getPath } from "../../redux/actions";
import ProgressHp from "../../components/ProgressBar/ProgressHp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ProgressDefense from "../../components/ProgressBar/ProgressDefense";
import ProgressAttack from "../../components/ProgressBar/ProgressAttack";
import ProgressSpeed from "../../components/ProgressBar/ProgressSpeed";
import ProgressHeight from "../../components/ProgressBar/ProgressHeight";
import ProgressWeight from "../../components/ProgressBar/ProgressWeight";
import Loader from "../../components/Loader/Loader";

function Detail () {
    let {id} = useParams();
    const dispatch = useDispatch();
    const { display, pokemonDetail } = useSelector(state => state)
    const history = useHistory();
    console.log(history.location.pathname);
   
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
        dispatch(getPath(history.location.pathname))
        return () => {
            dispatch(cleanDetail())  ;
        }
    },[dispatch, id])
    const data = useSelector(state => state.pokemonDetail);

    const handlerBack = () =>{
        history.goBack()
    }
  
    return(
        <div className={!display ? style.container : style.containerDisplay}>
           {display ? (
                <Loader/>
            ) : (
              <>   
                <div style={{position: "relative"}}>
                    <div style={{position: "absolute", right: "30px"}}>
                        <FontAwesomeIcon icon={faTimes} onClick={handlerBack} className={style.close}/> 
                    </div>
                    <h1>DETAIL POKEDEX #{pokemonDetail.id}</h1>
                </div>
                <hr style={{margin:"0"}}/>
                <div style={{display: "flex"}}>
                    <div className={style.box1}>
                        <div style={{position: "relative", height: "430px"}}>
                            <div style={{left: "100px", position: "absolute"}}>
                                <h2>{pokemonDetail.name}</h2>
                            </div>
                            <div style={{height: "100%", width:"100%", display:"flex", justifyContent:"center", position: "absolute"}}>
                                <img src={pokemonDetail.image} alt={pokemonDetail.name} className={style.img} />
                            </div>
                        </div>
                        <div className={pokemonDetail.type2 ? style.containerTypes : null}>
                            <div>
                                <h4>{pokemonDetail.type1}</h4>
                            </div>
                            <div>
                                <h4>{pokemonDetail.type2}</h4> 
                            </div>
                        </div>
                    </div>
                    <hr style={{margin:"0", height: "500px"}}/>
                    <div className={style.box2}>
                        <div>
                            <h3>STACS</h3>
                        </div>
                        <div style={{width:"100%", height: "100%", display: "flex", justifyContent:"center"}}>
                            <div style={{width:"100%", height: "100%"}}> 
                                <div style={{margin: "30px"}}>
                                    <ProgressHp/>
                                </div> 
                                <hr/>
                                <div style={{margin: "30px"}}>
                                    <ProgressAttack/>
                                </div>
                                <hr/>
                                <div style={{margin: "30px"}}>
                                    <ProgressDefense/>
                                </div>
                                <hr/>
                                <div style={{margin: "30px"}}>
                                    <ProgressSpeed/>
                                </div>
                                <hr/>
                                <div style={{margin: "30px"}}>
                                    <ProgressHeight/>
                                </div>  
                                <hr/>
                                <div style={{margin: "30px"}}>
                                    <ProgressWeight/>
                                </div> 
                            </div>                         
                        </div>
                    </div>
                </div>
              </>
            )}  
        </div>    
    )
};

export default Detail;