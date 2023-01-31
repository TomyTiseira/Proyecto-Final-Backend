import { Router } from "express";
import Product from "../Class/Product.js";
import { administrator } from "../config/constans.js";
import { dbDAO } from "../config/connectToDb.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await dbDAO.getProducts();

  res.json(products);
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await dbDAO.getProductById(id);

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

  await dbDAO.saveProduct(productToAdd);

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

  const product = await dbDAO.getProductById(id);

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

  await dbDAO.updateProduct(id, productToUpdate);

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

  const product = await dbDAO.getProductById(id);

  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  await dbDAO.deleteProduct(id);

  res.json(id);
});

export default productRouter;
