import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import { databaseUrl, modo, port, secret } from "./config/enviroment.js";
import { logger } from "./config/logs.js";
import cartRouter from "./routes/carts.router.js";
import loginRouter from "./routes/login.router.js";
import logoutRouter from "./routes/logout.router.js";
import productRouter from "./routes/products.router.js";
import signupRouter from "./routes/signup.router.js";
import cluster from "cluster";
import { cpus } from "os";
// import userRouter from "./routes/users.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: databaseUrl,
      collectionName: "sessions",
    }),
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000,
    },
  })
);

if (cluster.isPrimary && modo === "cluster") {
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  app.use("/api/productos", productRouter);
  app.use("/api/carrito", cartRouter);
  app.use("/login", loginRouter);
  app.use("/signup", signupRouter);
  app.use("/logout", logoutRouter);
  // app.use("/user", userRouter);

  app.get("*", (req, res) => {
    const { url, method } = req;

    logger.warn(`Ruta ${url} y método ${method} no implementada`);
    res.send(`Ruta ${url} y método ${method} no implementada`);
  });

  app.listen(port);
}
