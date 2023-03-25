import { Router } from "express";
import { compareSync } from "bcrypt";
import { dbDAO } from "../config/connectToDb.js";
import { logger } from "../config/logs.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { url, method } = req;
  const { email, password } = req.body;
  const user = await dbDAO.getUser(email);

  if (!user) {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Usuario no encontrado.`
    );
    res.status(403).send("Usuario no encontrado");
    return;
  }

  const validUser = compareSync(password, user.password);

  if (!validUser) {
    logger.error(`El método y la ruta son: ${method} ${url}. Datos inválidos.`);

    res.status(403).send("Datos inválidos");
    return;
  }

  req.session.email = email;

  logger.info(
    `El método y la ruta son: ${method} ${url}. ${req.session.email}`
  );

  res.redirect("/");
});

export default loginRouter;
