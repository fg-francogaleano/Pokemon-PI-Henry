import style from "./Paginado.module.css"

function Paginado ({currentPage, setCurrentPage, totalPages}) {
    const handlerpage = (page) => {
        setCurrentPage(page)
    };

    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1)
    console.log("pageNumbers",pageNumbers);

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

