import { useDispatch } from "react-redux";
import { getCache } from "../../redux/actions";
import style from "./Paginado.module.css";


function Paginado ({currentPage, setCurrentPage, totalPages}) {
    const dispatch = useDispatch()
    const handlerpage = (page) => {
        setCurrentPage(page)
        dispatch(getCache(currentPage + 1))
    };

    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1)

    return(
        <div className={style.container}>
            <button 
            onClick={() => handlerpage(currentPage - 1)} 
            className={style.prev} 
            disabled={currentPage === 1}>
                {"<"}
            </button>

            {pageNumbers.map((pageNumber, index) => (
                <button
                key={index}
                onClick={() => handlerpage(pageNumber)}>
                    {pageNumber}
                </button>
            ))}
            
            
            <button 
            onClick={() => handlerpage(currentPage + 1)} 
            className={style.next} 
            disabled={currentPage === totalPages}>
                {">"}
            </button>
        </div>
    )
};

export default Paginado;

