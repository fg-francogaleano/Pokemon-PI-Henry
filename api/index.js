const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  findTypes,
  cachePokemonsApi,
} = require("./src/controllers/controllers");

const PORT = 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await findTypes(); //devuelve todos los tipos de la base de datos
  await cachePokemonsApi(); //devuelve todos los tipos de la base de datos
  server.listen(PORT, () => {
    console.log("Escuchando en el puerto", PORT); // eslint-disable-line no-console
  });
});
