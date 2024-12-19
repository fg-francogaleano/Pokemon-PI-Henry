import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ProgressBar.module.css";

function ProgressHeight() {
  const { pokemonDetail } = useSelector((state) => state);
  const [filled, setFilled] = useState(0);
  const height = pokemonDetail.height / 10;
  // console.log(height);
  useEffect(() => {
    if (filled < height) {
      setTimeout(() => {
        setFilled((prev) => (prev += 2));
      }, 20);
    }
  }, [filled, height]);

  return (
    <div>
      <div className={styles.progressbar}>
        <span
          style={{
            position: "absolute",
            left: `${filled}%`,
            top: "-25px",
            overflow: "visible",
            color: "black",
            transition: "width 0.2s",
          }}
        >
          {filled}mts Height
        </span>
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#03f930",
            "border-radius": "5px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressHeight;
