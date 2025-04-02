import React, { useEffect, useState } from "react";

function Count({ stat, name }) {
  const [count, setCount] = useState(0);

  let value = stat / 10;
  let time = name === "height" ? 100 : 1;
  let unit = name === "height" ? "m" : "kg";
  let variant = name === "height" ? 0.1 : 0.5;

  useEffect(() => {
    if (count < value) {
      setTimeout(() => {
        setCount((prev) => (prev += variant));
      }, time);
    } else {
      setCount(value);
    }
  }, [count, stat]);

  return (
    <>
      {count.toFixed(2)} {unit}
    </>
  );
}

export default Count;
