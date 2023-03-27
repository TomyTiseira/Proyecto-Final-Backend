import { Router } from "express";
import { compareSync } from "bcrypt";
import { dbDAO } from "../config/connectToDb.js";
import { logger } from "../config/logs.js";
import passport from "passport";
import "../config/auth.js";

const loginRouter = Router();

loginRouter.post("/", passport.authenticate("login"), async (req, res) => {
  const { url, method } = req;
  const { email } = req.body;

  req.session.email = email;

  logger.info(
    `El método y la ruta son: ${method} ${url}. Email: ${req.session.email}.`
  );

  res.json({ result: "success" });
});

export default loginRouter;
