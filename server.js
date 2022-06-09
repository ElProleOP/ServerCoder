const express = require("express");
const app = express();
const fs = require('fs');

app.get("/", (req, res) => {
  res.send("<h1 style='color: blue'>Bienvenidos al servidor express</h1>");
});

class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }
  read = async () => {
    try {
     const data = await fs.promises.readFile(this.filename, "utf-8");
      return JSON.parse(data);
    }   catch (error) {
      throw new Error(error);
    }
  };

  getbyid = async (number) => {
    try {
      const allProducts = await this.read();
      if (number > allProducts.length && number < 1) {
        return null;
      }else{
      let i = 0;
      while (i < allProducts.length && number != allProducts[i].id ) {
          i++;
        };

      return allProducts[i];
      }
    }catch (error) {
      throw new Error(error);
    }
  };

  getAll = async () =>{
    try {
      const allProducts = await this.read();

      return allProducts;
    } catch (error){
      throw new Error(error);
    }
  };
};

const productos = new Contenedor("./products.json");

app.get("/productos", (req, res) => {
  let arr = productos.getAll();
  res.send(`${arr}`);
});

app.get("/productoRandom", (req, res) => {
  let limite = productos.getAll();
  let randomid = Math.floor(Math.random() * limite.length);
  res.send(`${productos.getbyid(randomid)}`);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto 8080`);
});
