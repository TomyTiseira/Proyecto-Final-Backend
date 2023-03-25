import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get("/", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

export default logoutRouter;
