import { useSelector } from "react-redux";
import style from "./Paginado.module.css";
import { Link } from "react-router-dom";

function Paginado() {
  const { totalPages } = useSelector((state) => state);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const searchParams = new URLSearchParams(window.location.search);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const PagePrev = page === 1 ? null : page - 1;
  const PageNext = page === totalPages ? null : page + 1;

  return (
    <div className={style.container}>
      {/* PREV */}
      <Link
        to={`/home?page=${PagePrev}`}
        onClick={(e) => {
          e.preventDefault(); // Evita que `Link` maneje la navegación.
          window.location.href = `/home?page=${page - 1}`; // Forza la recarga.
        }}
      >
        <button
          className={page !== 1 ? style.btn : style.btnDisabled}
          disabled={page === 1}
        >
          {"<"}
        </button>
      </Link>

      {/* BOTONS NUMBER PAGES */}
      {pageNumbers.map((pageNumber, index) => (
        <Link
          to={`/home?page=${index + 1}`}
          key={index}
          onClick={(e) => {
            e.preventDefault(); // Evita que `Link` maneje la navegación.
            window.location.href = `/home?page=${index + 1}`; // Forza la recarga.
          }}
        >
          <button className={style.btn}>{pageNumber}</button>
        </Link>
      ))}

      {/* NEXT */}
      <Link
        to={`/home?page=${PageNext}`}
        onClick={(e) => {
          e.preventDefault(); // Evita que `Link` maneje la navegación.
          window.location.href = `/home?page=${PageNext}`; // Forza la recarga.
        }}
      >
        <button
          className={page !== totalPages ? style.btn : style.btnDisabled}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      </Link>
    </div>
  );
}

export default Paginado;
