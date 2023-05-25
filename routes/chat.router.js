import { Router } from "express";
import { logger } from "../config/logs.js";
import { sessionTime } from "../config/enviroment.js";

const chatRouter = Router();

chatRouter.get("/", async (req, res) => {
  const { method, url } = req;

  // Validar que exista una sesión actual
  if (req.session.email) {
    const email = req.session.email;
    req.session.cookie.maxAge = sessionTime;

    logger.info(`El método y la ruta son: ${method} ${url}.`);

    res.render("chat", {
      email,
    });
    return;
  }

  logger.error(`El método y la ruta son: ${method} ${url}. Acceso sin sesión.`);

  // Redirigir a vista de error por cuenta no logueada
  res.render("error", {
    error: "Cuenta no logueada",
    url: `${url}`,
    metodo: method,
  });
});

export default chatRouter;
