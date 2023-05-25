import { Router } from "express";
import { logger } from "../config/logs.js";
import passport from "passport";
import "../config/auth.js";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  const { url, method } = req;
  logger.info(`El método y la ruta son: ${method} /login${url}`);
  res.render("login");
});

loginRouter.post("/", passport.authenticate("login"), async (req, res) => {
  const { url, method } = req;
  const { email } = req.body;

  req.session.email = email;

  logger.info(
    `El método y la ruta son: ${method} /login${url}. Email: ${req.session.email}.`
  );

  res.redirect("/");
});

export default loginRouter;
