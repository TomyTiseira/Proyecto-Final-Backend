import { Router } from "express";
import { logger } from "../config/logs.js";

const logoutRouter = Router();

logoutRouter.get("/", async (req, res) => {
  const { url, method } = req;
  logger.info(`El método y la ruta son: ${method} ${url}.`);

  req.session.destroy(() => {
    res.redirect("/login");
  });
});

export default logoutRouter;
