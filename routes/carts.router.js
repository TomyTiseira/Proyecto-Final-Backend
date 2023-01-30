import { Router } from "express";
import Cart from "../Class/Cart.js";
import archivoDAO from "../DAOs/archivoDAOs.js";
import firebaseDAO from "../DAOs/firebaseDAOs.js";
import memoriaDAO from "../DAOs/memoriaDAOs.js";
import mongoDAO from "../DAOs/mongoDAOs.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  const cartToAdd = new Cart();

  await mongoDAO.saveCart(cartToAdd);

  // await archivoDAO.saveCart(cartToAdd);

  // memoriaDAO.saveCart(cartToAdd);

  // await firebaseDAO.saveCart(cartToAdd);

  res.json("Ok");
});

cartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const cart = await mongoDAO.getCartById(id);

  if (!cart) {
    res.status(404).json({ error: "Carrito no encontrado" });
    return;
  }

  await mongoDAO.deleteCart(id);

  // await archivoDAO.deleteCart(id);

  // memoriaDAO.deleteCart(id);

  // await firebaseDAO.deleteCart(id);

  res.json(id);
});

cartRouter.get("/:id/productos", async (req, res) => {
  const { id } = req.params;

  const cart = await mongoDAO.getCartById(id);

  // const cartArchivo = await archivoDAO.getCartById(id);
  // console.log(cartArchivo.products);

  // const cartMemoria = memoriaDAO.getCartById(id);
  // console.log(cartMemoria.products);

  // const cartFirebase = await firebaseDAO.getCartById(id);
  // console.log(cartFirebase);

  if (!cart) {
    res.status(404).json({ error: "Carrito no encontrado" });
    return;
  }

  res.json(cart.products);
});

cartRouter.post("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;

  const cart = await mongoDAO.getCartById(id);
  const product = await mongoDAO.getProductById(id_prod);

  if (!cart || !product) {
    res.status(404).json({ error: "Carrito o producto no encontrado" });
    return;
  }

  await mongoDAO.addProductInCart(id, id_prod);

  // await archivoDAO.addProductInCart(id, id_prod);

  // memoriaDAO.addProductInCart(id, id_prod);

  // await firebaseDAO.addProductInCart(id, id_prod);

  res.json(id);
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;

  const cart = await mongoDAO.getCartById(id);
  const product = await mongoDAO.getProductById(id_prod);

  if (!cart || !product) {
    res.status(404).json({ error: "Carrito o producto no encontrado" });
    return;
  }

  const productToDelete = cart.products.find(
    (product) => product.id === id_prod
  );

  if (!productToDelete) {
    res
      .status(404)
      .json({ error: "Producto no se encuentra dentro del carrito" });
    return;
  }

  await mongoDAO.deleteProductInCart(id, id_prod);

  // await archivoDAO.deleteProductInCart(id, id_prod);

  // memoriaDAO.deleteProductInCart(id, id_prod);

  // firebaseDAO.deleteProductInCart(id, id_prod);

  res.json(id);
});

export default cartRouter;
