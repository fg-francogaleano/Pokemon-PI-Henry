// src/theme.js
import { createTheme } from "@mui/material/styles";

// PASTEL
// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#A78BFA", // Lavanda pastel
//       contrastText: "#374151", // Gris oscuro neutro
//     },
//     secondary: {
//       main: "#FCD34D", // Amarillo suave
//       contrastText: "#374151",
//     },
//     background: {
//       default: "#FFF7ED", // Marfil claro
//       paper: "#FFFFFF",
//     },
//     text: {
//       primary: "#374151", // Gris oscuro
//       secondary: "#6B7280", // Gris medio
//     },
//     warning: {
//       main: "#FBBF24", // Amarillo un poco más saturado
//     },
//     error: {
//       main: "#FCA5A5", // Rosa coral pastel
//     },
//     info: {
//       main: "#60A5FA", // Azul cielo suave
//     },
//     success: {
//       main: "#86EFAC", // Verde pastel
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, "Comic Neue", sans-serif',
//   },
// });

// OSCURO
// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#7C3AED", // Morado eléctrico
//       contrastText: "#FFFFFF",
//     },
//     secondary: {
//       main: "#10B981", // Verde esmeralda
//       contrastText: "#FFFFFF",
//     },
//     background: {
//       default: "#1F2937", // Gris oscuro / azul noche
//       paper: "#111827", // Fondo de tarjetas o secciones
//     },
//     text: {
//       primary: "#F9FAFB", // Blanco suave
//       secondary: "#D1D5DB", // Gris claro
//     },
//     warning: {
//       main: "#F59E0B", // Amarillo dorado
//     },
//     error: {
//       main: "#EF4444",
//     },
//     info: {
//       main: "#3B82F6",
//     },
//     success: {
//       main: "#22C55E",
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, "Orbitron", sans-serif',
//   },
// });

const theme = createTheme({
  palette: {
    mode: "dark", // Establecemos el modo oscuro como base
    primary: {
      main: "#1E272E",
      dark: "#0A1128",
      light: "#3A4750",
    },
    secondary: {
      main: "#00FFFF",
      dark: "#008080",
      light: "#E0FFFF",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#D3D3D3",
    },
    background: {
      default: "#1E272E",
      paper: "#2C3338", // Un negro ligeramente más claro para las tarjetas
    },
    divider: "#ADD8E6",
    fire: "#FF6F00",
    water: "#29ABE2",
    grass: "#32CD32",
    electric: "#FFFF00",
    psychic: "#FF00FF",
    dragon: "#8A2BE2",
    normal: "#A9A9A9",
    poison: "#008B8B",
  },
});

export default theme;
