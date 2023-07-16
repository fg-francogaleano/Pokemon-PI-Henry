import { useDispatch } from "react-redux";
import { getCache } from "../../redux/actions";
import style from "./Paginado.module.css";


function Paginado ({currentPage, setCurrentPage, totalPages}) {
    const dispatch = useDispatch()
    const handlerpage = (page) => {
        setCurrentPage(page)
        dispatch(getCache(page))
    };
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1)

    return(
        <div className={style.container}>
            <button 
            onClick={() => handlerpage(currentPage - 1)} 
            className={currentPage !== 1 ? style.btn: style.btnDisabled} 
            disabled={currentPage === 1}>
                {"<"}
            </button>

            {pageNumbers.map((pageNumber, index) => (
                <button
                className={style.btn} 
                key={index}
                onClick={() => handlerpage(pageNumber)}>
                    {pageNumber}
                </button>
            ))}
            
            
            <button 
            onClick={() => handlerpage(currentPage + 1)} 
            className={currentPage !== 4 ? style.btn: style.btnDisabled} 
            disabled={currentPage === totalPages}>
                {">"}
            </button>
        </div>
    )
};

export default Paginado;

