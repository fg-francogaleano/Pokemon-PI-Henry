import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ProgressBar.module.css"

function ProgressWeight () {
  const {pokemonDetail} = useSelector(state => state)
  const weight = pokemonDetail.weight/10
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if(filled < weight){
      setTimeout(() => {
        setFilled(prev => prev += 2)
      }, 20);
    }
  },[filled,weight])

  return(
    <div>
        <div className={styles.progressbar}>
            <span style={{
                position: "absolute",
                left: `${filled}%`,
                top:"-25px",
                overflow: "visible",    
                color: "black",
                transition: "width 0.2s"
            }}>{filled}kg weight</span>
            <div style={{
                height: "100%",
                width: `${filled}%`,
                backgroundColor: "#03f930",
                "border-radius": "5px"
                }}></div>
        </div>
    </div>
  )
};

export default ProgressWeight;