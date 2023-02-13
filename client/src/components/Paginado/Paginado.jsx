

function Paginado ({handlerNext, handlerPrev}) {
    return(
        <div>
            <button onClick={handlerPrev}>Prev</button>
            <button onClick={handlerNext}>Next</button>
        </div>
    )
};

export default Paginado;

