import { useHistory } from "react-router-dom";

export const useUpdateUrl = () => {
  const history = useHistory();

  const updateUrl = (params) => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.keys(params).forEach((key) => {
      console.log(key);

      const value = params[key];
      if (value) {
        searchParams.set(key, value); // Agregar o actualizar parámetro
      } else {
        // searchParams.delete(key); // Eliminar parámetro si no hay valor
      }
    });

    // Asegurar que 'page' siempre esté al final
    const page = searchParams.get("page");
    if (page) {
      searchParams.delete("page");
      searchParams.append("page", page);
    }

    history.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  const applyFilters = (filters) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (filters.type === "all" || filters.source === "all") {
      history.push(window.location.pathname); // Limpia los parámetros de la URL
      return;
    }

    // Eliminar 'page' cuando se aplican filtros
    searchParams.delete("page");

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value) {
        searchParams.set(key, value); // Agregar o actualizar parámetro
      } else {
        searchParams.delete(key); // Eliminar parámetro si no hay valor
      }
    });

    history.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return { updateUrl, applyFilters };
};
