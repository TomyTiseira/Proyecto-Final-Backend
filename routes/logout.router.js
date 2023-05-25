import { Router } from "express";
import { logger } from "../config/logs.js";

const logoutRouter = Router();

logoutRouter.get("/", async (req, res) => {
  const { url, method } = req;
  if (req.session.email) {
    const email = req.session.email;

    req.session.destroy(() => {
      res.render("logout", {
        email,
      });
    });

    logger.info(`El método y la ruta son: ${method} /logout${url}.`);
    return;
  }

  logger.info(
    `No se encuentra sesión iniciada. El método y la ruta son: ${method} ${url}.`
  );

  // Redirigir a vista de error por cuenta no logueada
  res.render("error", {
    error: "Cuenta no logueada",
    url: `/logout${url}`,
    metodo: method,
  });
});

export default logoutRouter;
