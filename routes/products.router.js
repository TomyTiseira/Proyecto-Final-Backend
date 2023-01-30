import { Router } from "express";
import mongoDAO from "../DAOs/mongoDAOs.js";
import Product from "../Class/Product.js";
import { administrator } from "../config/constans.js";
import archivoDAO from "../DAOs/archivoDAOs.js";
import memoriaDAO from "../DAOs/memoriaDAOs.js";
import firebaseDAO from "../DAOs/firebaseDAOs.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await mongoDAO.getProducts();

  // const productsArchivo = await archivoDAO.getProducts();
  // console.log(productsArchivo);

  // const productsMemoria = memoriaDAO.getproducts();
  // console.log(productsMemoria);

  // const productsFirebase = await firebaseDAO.getProducts();
  // console.log(productsFirebase);
  res.json(products);
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await mongoDAO.getProductById(id);

  // const productArchive = await archivoDAO.getProductsById(id);
  // console.log(productArchive);

  // const productMemoria = memoriaDAO.getProductById(id);
  // console.log(productMemoria);

  // const productFirebase = await firebaseDAO.getProductById(id);
  // console.log(productFirebase);

  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  res.json(product);
});

productRouter.post("/", async (req, res) => {
  if (!administrator) {
    res.status(403).json({
      error: -1,
      description: "ruta '/api/productos método 'post' no autorizado",
    });
    return;
  }

  const { name, description, code, photo, price, stock } = req.body;

  const productToAdd = new Product(
    name,
    description,
    code,
    photo,
    price,
    stock
  );

  await mongoDAO.saveProduct(productToAdd);

  // await archivoDAO.saveProduct(productToAdd);

  // memoriaDAO.saveProduct(productToAdd);

  await firebaseDAO.saveProduct(productToAdd);

  res.json("Ok");
});

productRouter.put("/:id", async (req, res) => {
  if (!administrator) {
    res.status(403).json({
      error: -1,
      description: "ruta '/api/productos método 'put' no autorizado",
    });
    return;
  }

  const { id } = req.params;

  const product = await mongoDAO.getProductById(id);

  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  const { name, description, code, photo, price, stock } = req.body;
  const productToUpdate = new Product(
    name,
    description,
    code,
    photo,
    price,
    stock
  );

  await mongoDAO.updateProduct(id, productToUpdate);

  // await archivoDAO.updateProduct(id, productToUpdate);

  // memoriaDAO.updateProduct(id, productToUpdate);

  // await firebaseDAO.updateProduct(id, productToUpdate);

  res.json(id);
});

productRouter.delete("/:id", async (req, res) => {
  if (!administrator) {
    res.status(403).json({
      error: -1,
      description: "ruta '/api/productos método 'delete' no autorizado",
    });
    return;
  }

  const { id } = req.params;

  const product = await mongoDAO.getProductById(id);

  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  await mongoDAO.deleteProduct(id);

  // await archivoDAO.deleteProduct(id);

  // memoriaDAO.deleteProduct(id);

  // await firebaseDAO.deleteProduct(id);

  res.json(id);
});

export default productRouter;
