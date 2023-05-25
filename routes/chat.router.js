import { Router } from "express";
import { logger } from "../config/logs.js";
import { sessionTime } from "../config/enviroment.js";

const chatRouter = Router();

chatRouter.get("/", async (req, res) => {
  const { method, url } = req;

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
  res.redirect("/login");
});

export default chatRouter;
