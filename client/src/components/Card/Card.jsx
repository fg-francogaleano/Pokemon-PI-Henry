// import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypeIcons from "../TypeIcons/TypeIcons";

function PokemonCard({ id, name, image, types }) {
  return (
    <Card
      sx={{
        // maxWidth: 300, // Ancho mínimo
        minWidth: 250, // Ancho máximo
        margin: "auto",
        boxShadow: 3,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.01)",
      }}
    >
      <CardContent>
        {/* ID */}
        <Typography variant="h6" color="text.secondary" align="center">
          #{id}
        </Typography>

        {/* Name */}
        <Typography
          variant="h5"
          align="center"
          color="text.primary"
          sx={{ fontWeight: "bold", textTransform: "capitalize" }}
        >
          {name}
        </Typography>
      </CardContent>

      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{
          objectFit: "contain",
          transition: "transform 0.4s ease, z-index 0.4s ease",
          zIndex: 1,
          position: "relative",
          "&:hover": {
            transform: "scale(1.2) translateY(-20px)",
            zIndex: 10,
          },
        }}
      />

      {/* Types */}
      <CardContent>
        <Grid container spacing={2} justifyContent="center">
          {types.map((type, index) => (
            <Grid item key={index}>
              <Box>
                <TypeIcons svg={type.icon_svg} className={type.name} />

                <Typography>
                  {type.name.replace(/^\w/, (c) => c.toUpperCase())}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      {/* </Link> */}
    </Card>
  );
}

export default PokemonCard;
