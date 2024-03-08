const express = require("express");
const app = express();
const routeProductos = require("./routes/productos");
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use('/productos', routeProductos);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
