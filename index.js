import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import { databaseUrl, port, secret } from "./config/enviroment.js";
import cartRouter from "./routes/carts.router.js";
import loginRouter from "./routes/login.router.js";
import logoutRouter from "./routes/logout.router.js";
import productRouter from "./routes/products.router.js";
import signupRouter from "./routes/signup.router.js";

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

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/logout", logoutRouter);

app.listen(port);
