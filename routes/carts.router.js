import { Router } from "express";
import Cart from "../Class/Cart.js";
import { dbDAO } from "../config/connectToDb.js";
import { logger } from "../config/logs.js";
import { createMessage } from "../helpers/createMessage.js";
import { createOrdenAndCleanCart } from "../helpers/createOrdenAndCleanCart.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const cartToAdd = new Cart();

    const cart = await dbDAO.saveCart(cartToAdd);

    logger.info(`El método y la ruta son: ${method} /api/carrito${url}.`);

    res.json(cart._id);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} /api/carrito${url}. Intento de acceso sin loggueo.`
  );

  res.status(404).json({
    error: "Cuenta no logueada",
  });
});

cartRouter.delete("/:id", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const { id } = req.params;

    const cart = await dbDAO.getCartById(id);

    if (!cart) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito no encontrado.`
      );

      res.status(404).json({ error: "Carrito no encontrado." });
      return;
    }

    await dbDAO.deleteCart(id);

    logger.info(`El método y la ruta son: ${method} /api/carrito${url}.`);

    res.json(id);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} /api/carrito${url}. Intento de acceso sin loggueo.`
  );

  res.status(404).json({
    error: "Cuenta no logueada",
  });
});

cartRouter.get("/:id/productos", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const { id } = req.params;

    const cart = await dbDAO.getCartById(id);

    if (!cart) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito no encontrado.`
      );

      res.status(404).json({ error: "Carrito no encontrado." });
      return;
    }

    logger.info(`El método y la ruta son: ${method} /api/carrito${url}.`);

    res.json(cart.products);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} /api/carrito${url}. Intento de acceso sin loggueo.`
  );

  res.status(404).json({
    error: "Cuenta no logueada",
  });
});

cartRouter.post("/:id/productos/:id_prod", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const { id, id_prod } = req.params;
    const { quantity } = req.body;

    const cart = await dbDAO.getCartById(id);
    const product = await dbDAO.getProductById(id_prod);

    if (!cart || !product) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito o producto no encontrado.`
      );
      res.status(404).json({ error: "Carrito o producto no encontrado." });
      return;
    }

    await dbDAO.addProductInCart(id, id_prod, quantity);

    logger.info(`El método y la ruta son: ${method} /api/carrito${url}.`);

    res.json(id);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} $/api/carrito{url}. Intento de acceso sin loggueo.`
  );

  res.status(404).json({
    error: "Cuenta no logueada",
  });
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const { id, id_prod } = req.params;

    const cart = await dbDAO.getCartById(id);
    const product = await dbDAO.getProductById(id_prod);

    if (!cart || !product) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito o producto no encontrado.`
      );
      res.status(404).json({ error: "Carrito o producto no encontrado." });
      return;
    }

    const productToDelete = cart.products.find(
      (product) => product.id === id_prod
    );

    if (!productToDelete) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Producto no se encuentra dentro del carrito.`
      );

      res
        .status(404)
        .json({ error: "Producto no se encuentra dentro del carrito." });
      return;
    }

    await dbDAO.deleteProductInCart(id, id_prod);

    logger.info(`El método y la ruta son: ${method} /api/carrito${url}.`);

    res.json(id);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} /api/carrito${url}. Intento de acceso sin loggueo.`
  );

  res.status(404).json({
    error: "Cuenta no logueada",
  });
});

cartRouter.get("/confirm", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const emailUser = req.session.email;

    const user = await dbDAO.getUser(emailUser);
    const cart = await dbDAO.getCartById(user.cartId);

    if (cart.products.lenght > 0) {
      await createMessage(user, cart.products, req);

      const ordenToCreate = {
        products: [...cart.products],
        email: emailUser,
      };

      const ordenCreated = await createOrdenAndCleanCart(
        ordenToCreate,
        user.cartId
      );

      res.json(ordenCreated._id);
    } else {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito vacío.`
      );

      res.status(404).json({
        error: "Carrito vacio",
      });
    }

    return;
  }

  logger.error(
    `El método y la ruta son: ${method} /api/carrito${url}. Intento de acceso sin loggueo.`
  );

  res.status(404).json({
    error: "Cuenta no logueada",
  });
});

export default cartRouter;
