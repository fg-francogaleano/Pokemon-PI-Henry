import { useHistory } from "react-router-dom";

export const useUpdateUrl = () => {
  const history = useHistory();

  const updateUrl = (params) => {
    console.log(params);

    const searchParams = new URLSearchParams(window.location.search);

    searchParams.delete("page");
    searchParams.delete("sort");
    searchParams.delete("order");

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (
        value && // Debe existir
        (!Array.isArray(value) || value.length > 0) && // No permitir arrays vacíos
        (!(typeof value === "object" && !Array.isArray(value)) ||
          Object.keys(value).length > 0) // No permitir objetos vacíos
      ) {
        if (Array.isArray(value)) {
          // Cuando se filtra por types y source
          searchParams.delete(key);
          value.forEach((v) => searchParams.append(key, v));
        } else if (typeof value === "object") {
          // Cuando se filtra por stats
          searchParams.set(key, JSON.stringify(value));
        } else {
          //Cuando se pagina y cuando se aplica ordenamiento
          searchParams.set(key, value);
        }
      } else {
        searchParams.delete(key);
      }
    });

    const page = searchParams.get("page");
    if (page) {
      searchParams.delete("page");
      searchParams.append("page", page);
    }

    history.push(`${window.location.pathname}?${searchParams.toString()}`);
    window.location.reload();
  };

  const applyFilters = (filters) => {
    const searchParams = new URLSearchParams();

    searchParams.delete("page");

    if (filters.types && filters.types.length > 0) {
      filters.types.forEach((type) => searchParams.append("type", type));
    }

    if (filters.source) {
      searchParams.set("source", filters.source);
    }

    if (filters.stats) {
      Object.keys(filters.stats).forEach((stat) => {
        if (filters.stats[stat].min) {
          searchParams.set(`${stat}_min`, filters.stats[stat].min);
        }
        if (filters.stats[stat].max) {
          searchParams.set(`${stat}_max`, filters.stats[stat].max);
        }
      });
    }

    history.push(`${window.location.pathname}?${searchParams.toString()}`);
    window.location.reload();
  };

  const clearAllFilters = () => {
    history.push(window.location.pathname);
    window.location.reload();
  };

  const removeFilter = (key, valueToRemove) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (key === "stats") {
      // Obtener el objeto de estadísticas desde la URL
      const statsParam = searchParams.get("stats");
      if (statsParam) {
        const stats = JSON.parse(decodeURIComponent(statsParam));

        // Eliminar la estadística seleccionada
        delete stats[valueToRemove];

        // Si no quedan stats, eliminar el parámetro, si no, actualizarlo
        if (Object.keys(stats).length === 0) {
          searchParams.delete("stats");
        } else {
          searchParams.set("stats", encodeURIComponent(JSON.stringify(stats)));
        }
      }
    } else {
      // Para 'type' y 'source'
      let values = searchParams.getAll(key);

      if (values.length > 1) {
        // Si hay múltiples valores, filtrar solo el que queremos eliminar
        values = values.filter((value) => value !== valueToRemove);
        searchParams.delete(key);
        values.forEach((value) => searchParams.append(key, value));
      } else {
        // Si es único (como 'source'), eliminarlo directamente
        searchParams.delete(key);
        window.location.reload();
      }
    }

    // Actualizar la URL sin recargar la página
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
    window.location.reload();
  };

  return { updateUrl, applyFilters, clearAllFilters, removeFilter };
};
