const express = require("express");
const route = express.Router();
//datos a fines practicos
let productos = [
  { id: 1, nombre: "producto 1", precio: 10.99 },
  { id: 2, nombre: "producto 2", precio: 19.99 },
  { id: 3, nombre: "producto 3", precio: 5.99 },
];

//obtener la lista
route.get("/", (req, res, next) => {
  try {
    res.json(productos);
  } catch (err) {
    next(err);
  }
});

//obtener un item particular de la lista
route.get("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const producto = productos.find((p) => p.id === id);

    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
});

//como agregar nuevo producto
route.post("/", (req, res, next) => {
  
  try{
    const { nombre, precio } = req.body;
  //no olvidarse definir en postman en la parte de body el nombre y precio en archivo json
    const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio,
  };

  productos.push(nuevoProducto);
  res.status(201).json({ nuevoProducto });
}
catch(err){
    next(err);
}
});

//actualizar productos existentes.
route.put("/:id", (req, res, next) => {
  try{ const id = parseInt(req.params.id);
     const { nombre, precio } = req.body;
  
     const producto = productos.find((p) => p.id === id);
  
     if (!producto) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        throw error;    } 

        producto.nombre = nombre || producto.nombre;
      producto.precio = precio || producto.precio;
  
      res.json(producto);
    }
   catch(err){
    next(err);
   }
  
});

//borrar item del array.
route.delete("/:id", (req, res, next) => {
  
  try{
    const id = parseInt(req.params.id);
  const index = productos.findIndex((p) => p.id === id);

  if (index === -1) {
    const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
  } 
    const productoEliminado = productos.splice(index, 1);
    res.json(productoEliminado[0]);
  
}
catch(err){
    next(err);
}
});

module.exports = route;
