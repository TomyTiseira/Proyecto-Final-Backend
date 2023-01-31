import express from "express";
import { connectToDb } from "./config/connectToDb.js";
import cartRouter from "./routes/carts.router.js";
import productRouter from "./routes/products.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
const db = "mongo";

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

connectToDb(db).then(() => app.listen(PORT));
