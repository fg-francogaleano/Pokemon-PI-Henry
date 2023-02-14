import { Link } from "react-router-dom";
import style from "./Card.module.css"

function Card ({id, name, image, type1, type2}) {
  
    return(
        <div className={style.container}>
            <Link to={`/detail/${id}`} >
                <div className={style.idcontainer}>
                    <h2>#{id}</h2>   
                </div>
                <div className={style.namecontainer}>
                    <h2>{name}</h2>
                </div>
                <div className={style.imgcontainer}>
                    <img src={image} alt={name}/>   
                </div>
                <div className={style.type1container}>
                    <p>{type1}</p>
                </div>
                <div className={style.type2container}>
                    <p>{type2}</p>
                </div>
            </Link>
            
        </div>
    )
};

export default Card;