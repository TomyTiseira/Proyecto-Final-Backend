import { Router } from "express";
import { hashSync } from "bcrypt";
import { dbDAO } from "../config/connectToDb.js";
import { sendEmail } from "../helpers/sendEmail.js";
import { logger } from "../config/logs.js";
import Cart from "../Class/Cart.js";

const signupRouter = Router();

signupRouter.post("/", async (req, res) => {
  const { url, method } = req;

  const { email, password, nombre, direccion, edad, numero, foto } = req.body;
  const user = await dbDAO.getUser(email);

  if (user) {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Cuenta existente.`
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
    direccion,
    edad,
    numero,
    foto,
    cartId: cart._id,
  };

  await dbDAO.addUser(userToAdd);

  const messageSendAdministrator = `
    Correo de cuenta: ${email}.
    Nombre de cuenta: ${nombre}.
    Dirección: ${direccion}.
    Edad del usuario: ${edad}.
    Número del usuario: +${numero}.
    Foto de cuenta: ${foto}.
    `;

  const html = `
  <h2>Correo de cuenta: ${email}</h2>
  <h2>Nombre de cuenta: ${nombre}</h2>
  <h2>Dirección: ${direccion}</h2>
  <h2>Edad del usuario: ${edad}</h2>
  <h2>Número del usuario: ${numero}</h2>
  <h2>Foto de cuenta: ${foto}</h2>
`;

  await sendEmail(email, messageSendAdministrator, "Nuevo registro", html);

  req.session.email = email;

  logger.info(
    `El método y la ruta son: ${method} ${url}. ${req.session.email}.`
  );

  res.json({ result: "success" });
});

export default signupRouter;
