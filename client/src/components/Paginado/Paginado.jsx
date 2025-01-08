import { useSelector } from "react-redux";
import style from "./Paginado.module.css";
import { useUpdateUrl } from "../../utils/url.Utils";

function Paginado() {
  const { totalPages } = useSelector((state) => state);
  const { updateUrl } = useUpdateUrl();

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const searchParams = new URLSearchParams(window.location.search);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const PagePrev = page === 1 ? null : page - 1;
  const PageNext = page === totalPages ? null : page + 1;

  const handleOnClick = () => {
    window.location.reload();
  };

  return (
    <div className={style.container}>
      {/* PREV */}
      <button
        className={page !== 1 ? style.btn : style.btnDisabled}
        disabled={page === 1}
        onClick={() => {
          updateUrl({ page: PagePrev });
          handleOnClick();
        }}
      >
        {"<"}
      </button>

      {/* PAGE NUMBERS */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={style.btn}
          onClick={() => {
            updateUrl({ page: pageNumber });
            handleOnClick();
          }}
        >
          {pageNumber}
        </button>
      ))}

      {/* NEXT */}
      <button
        className={page !== totalPages ? style.btn : style.btnDisabled}
        disabled={page === totalPages}
        onClick={() => {
          updateUrl({ page: PageNext });
          handleOnClick();
        }}
      >
        {">"}
      </button>
    </div>
  );
}

export default Paginado;
