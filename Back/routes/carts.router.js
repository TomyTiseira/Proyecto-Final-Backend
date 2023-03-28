import { Router } from "express";
import Cart from "../Class/Cart.js";
import { dbDAO } from "../config/connectToDb.js";
import { numberAdministrator } from "../config/enviroment.js";
import { logger } from "../config/logs.js";
import { handleResponse } from "../helpers/handleResponse.js";
import { sendEmail } from "../helpers/sendEmail.js";
import { sendMessage } from "../helpers/sendMessage.js";

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  const { method, url } = req;

  if (req.session.email) {
    const email = req.session.email;

    const user = await dbDAO.getUser(email);

    if (!user) {
      logger.error(
        `El método y la ruta son: ${method} ${url}. Cuenta no se encuentra.`
      );
      res.status(403).json({ result: "error" });
      return;
    }

    res.json(user);
  } else {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Acceso sin sesión.`
    );
    res.status(403).json({ result: "error" });
  }
});

cartRouter.post("/", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const cartToAdd = new Cart();

    await dbDAO.saveCart(cartToAdd);

    logger.info(`El método y la ruta son: ${method} ${url}.`);

    res.json("Ok");
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} ${url}. Intento de acceso sin loggueo.`
  );

  res.redirect("/login");
});

cartRouter.delete("/:id", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const { id } = req.params;

    const cart = await dbDAO.getCartById(id);

    if (!cart) {
      logger.error(
        `El método y la ruta son: ${method} ${url}. Carrito no encontrado.`
      );

      res.status(404).json({ error: "Carrito no encontrado." });
      return;
    }

    await dbDAO.deleteCart(id);

    logger.info(`El método y la ruta son: ${method} ${url}.`);

    res.json(id);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} ${url}. Intento de acceso sin loggueo.`
  );

  res.redirect("/login");
});

cartRouter.get("/:id/productos", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const { id } = req.params;

    const cart = await dbDAO.getCartById(id);

    if (!cart) {
      logger.error(
        `El método y la ruta son: ${method} ${url}. Carrito no encontrado.`
      );

      res.status(404).json({ error: "Carrito no encontrado." });
      return;
    }

    logger.info(`El método y la ruta son: ${method} ${url}.`);

    console.log(cart.products);

    res.json(cart.products);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} ${url}. Intento de acceso sin loggueo.`
  );

  res.redirect("/login");
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
        `El método y la ruta son: ${method} ${url}. Carrito o producto no encontrado.`
      );
      res.status(404).json({ error: "Carrito o producto no encontrado." });
      return;
    }

    await dbDAO.addProductInCart(id, id_prod, quantity);

    logger.info(`El método y la ruta son: ${method} ${url}.`);

    res.json(id);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} ${url}. Intento de acceso sin loggueo.`
  );

  res.redirect("/login");
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const { id, id_prod } = req.params;

    const cart = await dbDAO.getCartById(id);
    const product = await dbDAO.getProductById(id_prod);

    if (!cart || !product) {
      logger.error(
        `El método y la ruta son: ${method} ${url}. Carrito o producto no encontrado.`
      );
      res.status(404).json({ error: "Carrito o producto no encontrado." });
      return;
    }

    const productToDelete = cart.products.find(
      (product) => product.id === id_prod
    );

    if (!productToDelete) {
      logger.error(
        `El método y la ruta son: ${method} ${url}. Producto no se encuentra dentro del carrito.`
      );

      res
        .status(404)
        .json({ error: "Producto no se encuentra dentro del carrito." });
      return;
    }

    await dbDAO.deleteProductInCart(id, id_prod);

    logger.info(`El método y la ruta son: ${method} ${url}.`);

    res.json(id);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} ${url}. Intento de acceso sin loggueo.`
  );

  res.redirect("/login");
});

cartRouter.get("/confirm", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const emailUser = req.session.email;

    const user = await dbDAO.getUser(emailUser);
    const cart = await dbDAO.getCartById(user.cartId);

    let messageToSend = `Productos:`;
    let html = `<h1>Productos:</h1>`;

    for (const productInCart of cart.products) {
      const product = await dbDAO.getProductById(productInCart.id);

      messageToSend += `
      - nombre: ${product.name}, precio: ${product.price}, quantity: ${productInCart.quantity}`;

      html += `
      <h2>- nombre: ${product.name}, precio: ${product.price}, quantity: ${productInCart.quantity}</h2>`;
    }

    const resultSendMessageUser = await sendMessage(user.numero, messageToSend);
    handleResponse(resultSendMessageUser, req);

    const resultSendMessageAdministrator = await sendMessage(
      numberAdministrator,
      messageToSend,
      true
    );
    handleResponse(resultSendMessageAdministrator, req);

    const resultSendEmail = await sendEmail(
      emailUser,
      messageToSend,
      `Nuevo pedido de ${user.nombre} - ${emailUser}`,
      html
    );
    handleResponse(resultSendEmail, req);

    res.send(messageToSend);
    return;
  }

  logger.error(
    `El método y la ruta son: ${method} ${url}. Intento de acceso sin loggueo.`
  );

  res.redirect("/login");
});

export default cartRouter;
