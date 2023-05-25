import { Router } from "express";
import Product from "../Class/Product.js";
import { administrator } from "../config/enviroment.js";
import { dbDAO } from "../config/connectToDb.js";
import { logger } from "../config/logs.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { url, method } = req;
  const products = await dbDAO.getProducts();

  logger.info(`El método y la ruta son: ${method} /api/productos${url}.`);

  res.json(products);
});

productRouter.get("/:id", async (req, res) => {
  const { url, method } = req;
  const { id } = req.params;

  const product = await dbDAO.getProductById(id);

  // Validar la existencia del producto
  if (!product) {
    logger.error(
      `El método y la ruta son: ${method} /api/productos${url}. Producto no encontrado.`
    );
    res.render("error", { error: "Producto no encontrado" });
    return;
  }

  logger.info(`El método y la ruta son: ${method} /api/productos${url}.`);

  res.json(product);
});

productRouter.post("/", async (req, res) => {
  const { url, method } = req;
  if (!administrator) {
    logger.error(
      `El método y la ruta son: ${method} /api/productos${url}. Acceso no autorizado.`
    );

    // Redirigir a vista de error por cuenta no autorizada
    res.render("error", {
      error: "Cuenta no autorizada",
      url: `api/productos${url}`,
      metodo: method,
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

  const product = await dbDAO.saveProduct(productToAdd);

  logger.info(`El método y la ruta son: ${method} /api/productos${url}.`);

  res.json(product);
});

productRouter.put("/:id", async (req, res) => {
  const { url, method } = req;
  if (!administrator) {
    logger.error(
      `El método y la ruta son: ${method} /api/productos${url}. Acceso no autorizado.`
    );

    // Redirigir a vista de error por cuenta no autorizada
    res.render("error", {
      error: "Cuenta no autorizada",
      url: `api/productos${url}`,
      metodo: method,
    });
    return;
  }

  const { id } = req.params;

  const product = await dbDAO.getProductById(id);

  if (!product) {
    logger.error(
      `El método y la ruta son: ${method} /api/productos${url}. Producto no encontrado.`
    );

    // Redirigir a vista de error por cuenta no logueada
    res.render("error", {
      error: "Cuenta no autorizada",
      url: `api/productos${url}`,
      metodo: method,
    });
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

  logger.info(`El método y la ruta son: ${method} /api/productos${url}.`);

  res.json(id);
});

productRouter.delete("/:id", async (req, res) => {
  const { url, method } = req;
  if (!administrator) {
    logger.error(
      `El método y la ruta son: ${method} /api/productos${url}. Acceso no autorizado.`
    );

    res.status(403).json({
      error: `ruta /api/productos${url} método ${method} no autorizado`,
    });
    return;
  }

  const { id } = req.params;

  const product = await dbDAO.getProductById(id);

  if (!product) {
    logger.error(
      `El método y la ruta son: ${method} /api/productos${url}. Producto no encontrado.`
    );

    // Redirigir a vista de error por producto no encontrado
    res.render("error", {
      error: "Producto no encontrado",
      url: `api/productos${url}`,
      metodo: method,
    });
    return;
  }

  await dbDAO.deleteProduct(id);

  logger.info(`El método y la ruta son: ${method} /api/productos${url}.`);

  res.json(id);
});

productRouter.get("/category/:id", async (req, res) => {
  const { url, method } = req;
  const { id } = req.params;

  const products = await dbDAO.getProductsByCategory(id);

  logger.info(`El método y la ruta son: ${method} /api/productos${url}.`);

  res.json(products);
});

export default productRouter;
