import { Router } from "express";
import Cart from "../Class/Cart.js";
import { dbDAO } from "../config/connectToDb.js";
import { logger } from "../config/logs.js";
import { createMessage } from "../helpers/createMessage.js";
import { createOrdenAndCleanCart } from "../helpers/createOrdenAndCleanCart.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  const { url, method } = req;

  // Validar que exista una sesión actual
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

  // Redirigir a vista de error por cuenta no logueada
  res.render("error", {
    error: "Cuenta no logueada",
    url: `/api/carrito${url}`,
    metodo: method,
  });
});

cartRouter.delete("/:id", async (req, res) => {
  const { url, method } = req;

  // Validar que exista una sesión actual
  if (req.session.email) {
    const { id } = req.params;

    const cart = await dbDAO.getCartById(id);

    // Validar que exista el carrito
    if (!cart) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito no encontrado.`
      );

      res.render("error", {
        error: "Carrito no encontrado",
        url: `/api/carrito${url}`,
        metodo: method,
      });
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

  // Redirigir a vista de error por cuenta no logueada
  res.render("error", {
    error: "Cuenta no logueada",
    url: `/api/carrito${url}`,
    metodo: method,
  });
});

cartRouter.get("/:id/productos", async (req, res) => {
  const { url, method } = req;

  // Validar que exista una sesión actual
  if (req.session.email) {
    const { id } = req.params;

    const cart = await dbDAO.getCartById(id);

    // Validar que exista el carrito
    if (!cart) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito no encontrado.`
      );

      // Redirigir a vista de error por carrito no encontrado
      res.render("error", {
        error: "Carrito no encontrado",
        url: `/api/carrito${url}`,
        metodo: method,
      });
      return;
    }

    logger.info(`El método y la ruta son: ${method} /api/carrito${url}.`);

    res.json(cart.products);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} /api/carrito${url}. Intento de acceso sin loggueo.`
  );

  // Redirigir a vista de error por cuenta no logueada
  res.render("error", {
    error: "Cuenta no logueada",
    url: `/api/carrito${url}`,
    metodo: method,
  });
});

cartRouter.post("/:id/productos/:id_prod", async (req, res) => {
  const { url, method } = req;

  // Validar que exista una sesión actual
  if (req.session.email) {
    const { id, id_prod } = req.params;
    const { quantity } = req.body;

    const cart = await dbDAO.getCartById(id);
    const product = await dbDAO.getProductById(id_prod);

    // Validar que exista el carrito y el producto
    if (!cart || !product) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito o producto no encontrado.`
      );

      // Redirigir a vista de error por carrito o producto no existentes
      res.render("error", {
        error: "Carrito o producto no encontrado",
        url: `/api/carrito${url}`,
        metodo: method,
      });
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

  // Validar que exista una sesión actual
  res.render("error", {
    error: "Cuenta no logueada",
    url: `/api/carrito${url}`,
    metodo: method,
  });
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const { url, method } = req;

  // Validar que exista una sesión actual
  if (req.session.email) {
    const { id, id_prod } = req.params;

    const cart = await dbDAO.getCartById(id);
    const product = await dbDAO.getProductById(id_prod);

    if (!cart || !product) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito o producto no encontrado.`
      );

      // Redirigir a vista de error por carrito o producto no encontrado
      res.render("error", {
        error: "Carrito o producto no encontrado",
        url: `/api/carrito${url}`,
        metodo: method,
      });
      return;
    }

    const productToDelete = cart.products.find(
      (product) => product.id === id_prod
    );

    if (!productToDelete) {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Producto no se encuentra dentro del carrito.`
      );

      // Redirigir a vista de error porque el producto no está dentro del carrito
      res.render("error", {
        error: "Producto no se encuentra dentro del carrito",
        url: `/api/carrito${url}`,
        metodo: method,
      });
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

  // Validar que exista una sesión actual
  res.render("error", {
    error: "Cuenta no logueada",
    url: `/api/carrito${url}`,
    metodo: method,
  });
});

cartRouter.get("/confirm", async (req, res) => {
  const { url, method } = req;

  // Validar que exista una sesión actual
  if (req.session.email) {
    const emailUser = req.session.email;

    const user = await dbDAO.getUser(emailUser);
    const cart = await dbDAO.getCartById(user.cartId);

    // Validar que haya al menos 1 producto para completar la compra
    if (cart.products.lenght > 0) {
      await createMessage(user, cart.products, req);

      const ordenToCreate = {
        products: [...cart.products],
        email: emailUser,
      };

      // Crear orden
      const ordenCreated = await createOrdenAndCleanCart(
        ordenToCreate,
        user.cartId
      );

      res.json(ordenCreated._id);
    } else {
      logger.error(
        `El método y la ruta son: ${method} /api/carrito${url}. Carrito vacío.`
      );

      res.render("error", {
        error: "Carrito vacío",
        url: `/api/carrito${url}`,
        metodo: method,
      });
    }

    return;
  }

  logger.error(
    `El método y la ruta son: ${method} /api/carrito${url}. Intento de acceso sin loggueo.`
  );

  // Validar que exista una sesión actual
  res.render("error", {
    error: "Cuenta no logueada",
    url: `/api/carrito${url}`,
    metodo: method,
  });
});

export default cartRouter;
