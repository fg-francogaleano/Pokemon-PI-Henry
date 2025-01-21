import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TypeIcons from "../TypeIcons/TypeIcons";

function PokemonCard({ id, name, image, types }) {
  return (
    <Card sx={{ width: 330, margin: "auto", boxShadow: 3 }}>
      <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
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
          sx={{ objectFit: "contain" }}
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
      </Link>
    </Card>
  );
}

export default PokemonCard;
