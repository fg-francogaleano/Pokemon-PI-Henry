import { useEffect, useRef } from "react";

function TypeIcons({ svg, className, isActive, typeIcons }) {
  const containerRef = useRef();
  useEffect(() => {
    const svgElement = containerRef.current.querySelector("svg");
    // console.log(svgElement);
    if (svgElement) {
      // Limpia todas las clases previas para evitar acumulaciones
      svgElement.classList.remove(typeIcons);

      // Aplica la clase inicial si se pasa como prop (caso 1)
      if (className) {
        svgElement.classList.add(className);
      }

      // Aplica la clase dinámica si está activo (caso 2)
      if (isActive) {
        svgElement.classList.add(typeIcons);
      }
    }
  }, [className, isActive]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        width: "20px",
        height: "20px",
        margin: "auto",
      }}
    />
  );
}

export default TypeIcons;
