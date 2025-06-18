import { useEffect, useState } from "react";

function Count({ stat, name }) {
  const [count, setCount] = useState(0);
  let unit = name === "height" ? "m" : "kg";

  useEffect(() => {
    let value = stat;
    let time = name === "height" ? 100 : 1;
    let variant = name === "height" ? 0.1 : 0.5;
    let timeoutId;

    if (count < value) {
      timeoutId = setTimeout(() => {
        setCount((prev) => prev + variant);
      }, time);
    } else {
      setCount(value);
    }

    return () => clearTimeout(timeoutId);
  }, [count, stat, name]);

  return (
    <>
      {count.toFixed(2)} {unit}
    </>
  );
}

export default Count;
