import { Router } from "express";
import { hashSync } from "bcrypt";
import { dbDAO } from "../config/connectToDb.js";

const signupRouter = Router();

signupRouter.post("/", async (req, res) => {
  const { email, password, nombre, direccion, edad, numero, foto } = req.body;
  const user = await dbDAO.getUser(email);

  if (user) {
    res.status(403).send("El usuario ya existe");
    return;
  }

  const userToAdd = {
    email,
    password: hashSync(password, 10),
    nombre,
    direccion,
    edad,
    numero,
    foto,
  };

  await dbDAO.addUser(userToAdd);

  req.session.email = email;

  res.redirect("/login");
});

export default signupRouter;
