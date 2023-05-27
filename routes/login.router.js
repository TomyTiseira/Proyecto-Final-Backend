import { Router } from "express";
import { logger } from "../config/logs.js";
import passport from "passport";
import "../config/auth.js";
import { generateToken } from "../config/tokenHandler.js";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  const { url, method } = req;
  logger.info(`El método y la ruta son: ${method} /login${url}`);
  res.render("login");
});

loginRouter.post("/", passport.authenticate("login"), async (req, res) => {
  const { url, method } = req;
  const { email, password } = req.body;

  req.session.email = email;

  // Generar token
  const token = generateToken({ email, password });
  console.log({ token });

  logger.info(
    `El método y la ruta son: ${method} /login${url}. Email: ${req.session.email}.`
  );

  res.cookie("token", token).redirect("/");
});

export default loginRouter;
