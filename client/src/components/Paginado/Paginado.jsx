import style from "./Paginado.module.css"

function Paginado ({handlerNext, handlerPrev}) {
    return(
        <div className={style.container}>
            <button onClick={handlerPrev} className={style.prev}>Prev</button>
            <button onClick={handlerNext} className={style.next}>Next</button>
        </div>
    )
};

export default Paginado;

