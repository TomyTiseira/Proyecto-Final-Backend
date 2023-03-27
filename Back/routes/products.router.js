import { Router } from "express";
import Product from "../Class/Product.js";
import { administrator } from "../config/enviroment.js";
import { dbDAO } from "../config/connectToDb.js";
import { logger } from "../config/logs.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { url, method } = req;
  const products = await dbDAO.getProducts();

  // logger.info(`El método y la ruta son: ${method} ${url}.`);

  console.log(products);

  res.json(products);
});

productRouter.get("/:id", async (req, res) => {
  const { url, method } = req;
  const { id } = req.params;

  const product = await dbDAO.getProductById(id);

  if (!product) {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Producto no encontrado.`
    );
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  logger.info(`El método y la ruta son: ${method} ${url}.`);

  res.json(product);
});

productRouter.post("/", async (req, res) => {
  const { url, method } = req;
  if (!administrator) {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Acceso no autorizado.`
    );

    res.status(403).json({
      error: -1,
      description: `ruta ${url} método ${method} no autorizado.`,
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

  logger.info(`El método y la ruta son: ${method} ${url}.`);

  res.json("Ok");
});

productRouter.put("/:id", async (req, res) => {
  const { url, method } = req;
  if (!administrator) {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Acceso no autorizado.`
    );

    res.status(403).json({
      error: -1,
      description: `ruta ${url} método ${method} no autorizado.`,
    });
    return;
  }

  const { id } = req.params;

  const product = await dbDAO.getProductById(id);

  if (!product) {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Producto no encontrado.`
    );
    res.status(404).json({ error: "Producto no encontrado." });
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

  logger.info(`El método y la ruta son: ${method} ${url}.`);

  res.json(id);
});

productRouter.delete("/:id", async (req, res) => {
  const { url, method } = req;
  if (!administrator) {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Acceso no autorizado.`
    );

    res.status(403).json({
      error: -1,
      description: `ruta ${url} método ${method} no autorizado`,
    });
    return;
  }

  const { id } = req.params;

  const product = await dbDAO.getProductById(id);

  if (!product) {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Producto no encontrado.`
    );

    res.status(404).json({ error: "Producto no encontrado." });
    return;
  }

  await dbDAO.deleteProduct(id);

  logger.info(`El método y la ruta son: ${method} ${url}.`);

  res.json(id);
});

export default productRouter;
