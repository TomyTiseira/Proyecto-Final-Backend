import { Router } from "express";
import { logger } from "../config/logs.js";
import { dbDAO } from "../config/connectToDb.js";

const userRouter = Router();

userRouter.get("/cartId", async (req, res) => {
  const { method, url } = req;

  if (req.session.email) {
    const email = req.session.email;

    const user = await dbDAO.getUser(email);

    if (!user) {
      logger.error(
        `El método y la ruta son: ${method} ${url}. Cuenta no se encuentra.`
      );
      res.status(403).json({ result: "error" });
      return;
    }

    res.json(user.cartId);
  } else {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Acceso sin sesión.`
    );
    res.status(403).json({ result: "error" });
  }
});

export default userRouter;
