import styles from "../Loader/Loader.module.css";

const Loader = () => {
  window.addEventListener("load", function () {
    document.getElementById("loader")?.classList.toggle("loader2");
  });

  return (
    <div className={styles.contenedor}>
      <div className={styles.loader} id="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
