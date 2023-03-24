import { Router } from "express";
import { compareSync } from "bcrypt";
import { dbDAO } from "../config/connectToDb.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await dbDAO.getUser(email);

  if (!user) {
    res.status(403).send("Usuario inexistente");
  }

  const validUser = compareSync(password, user.password);

  if (!validUser) {
    res.status(403).send("Datos inválidos");
    return;
  }

  req.session.email = email;

  res.redirect("/");
});

export default loginRouter;
