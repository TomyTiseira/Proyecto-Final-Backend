import { Router } from "express";
import { hashSync } from "bcrypt";
import { dbDAO } from "../config/connectToDb.js";
import { sendEmail } from "../helpers/sendEmail.js";
import { logger } from "../config/logs.js";
import Cart from "../Class/Cart.js";

const signupRouter = Router();

signupRouter.get("/", (req, res) => {
  const { url, method } = req;
  logger.info(`El método y la ruta son: ${method} /signup${url}`);
  res.render("signup");
});

signupRouter.post("/", async (req, res) => {
  const { url, method } = req;

  const { nombre, numero, foto, email, password } = req.body;
  const user = await dbDAO.getUser(email);

  if (user) {
    logger.error(
      `El método y la ruta son: ${method} /signup${url}. Cuenta existente.`
    );
    res.status(403).json({ result: "error" });
    return;
  }

  const cartToAdd = new Cart();
  const cart = await dbDAO.saveCart(cartToAdd);

  const userToAdd = {
    email,
    password: hashSync(password, 10),
    nombre,
    numero,
    foto,
    cartId: cart._id,
  };

  await dbDAO.addUser(userToAdd);

  const messageSendAdministrator = `
    Correo de cuenta: ${email}.
    Nombre de cuenta: ${nombre}.
    Número del usuario: +${numero}.
    Foto de cuenta: ${foto}.
    `;

  const html = `
    <h2>Correo de cuenta: ${email}</h2>
    <h2>Nombre de cuenta: ${nombre}</h2>
    <h2>Número del usuario: ${numero}</h2>
    <h2>Foto de cuenta: ${foto}</h2>
  `;

  await sendEmail(email, messageSendAdministrator, "Nuevo registro", html);

  req.session.email = email;

  logger.info(
    `El método y la ruta son: ${method} /signup${url}. ${req.session.email}.`
  );

  res.redirect("/login");
});

export default signupRouter;
