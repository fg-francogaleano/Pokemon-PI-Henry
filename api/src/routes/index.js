const { Router } = require("express");
const {
  getPokemonsHandler,
  getPokemonHandler,
  postPokemonHandler,
  getTypesHandler,
  deleteHandler,
  getPokemonTypeHandler,
} = require("../handlers/handlers");

const upload = require("../util/upload"); // Importa configuración de multer

const router = Router();

router.get("/pokemons", getPokemonsHandler);

router.get("/pokemons/:id", getPokemonHandler);

router.get("/types/:types", getPokemonTypeHandler);

router.post("/pokemons", postPokemonHandler);

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path; // URL pública en Cloudinary
    console.log(imageUrl);

    // Aquí puedes guardar en base de datos si lo deseas:
    // const nuevaImagen = await Imagen.create({ url: imageUrl });

    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir imagen" });
  }
});

router.get("/types", getTypesHandler);

router.delete("/:id/delete", deleteHandler);

router.get("/res200", (req, res) => {
  res.status(200).json("res200");
});

module.exports = router;
