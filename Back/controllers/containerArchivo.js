import fs from "fs";
import { fileCart, fileProduct } from "../config/constans.js";

class ContainerArchivo {
  constructor(fileProduct, fileCart) {
    this.fileProduct = fileProduct;
    this.fileCart = fileCart;
  }

  getProducts = () => {
    try {
      return fs.promises
        .readFile(this.fileProduct, "utf-8")
        .then((value) => value)
        .catch((e) => console.error(e));
    } catch (e) {
      console.log(e.message);
    }
  };

  saveProduct = (products) => {
    try {
      fs.promises.writeFile(this.fileProduct, products);
    } catch (e) {
      console.log(e.message);
    }
  };

  getCarts = () => {
    try {
      return fs.promises
        .readFile(this.fileCart, "utf-8")
        .then((value) => JSON.parse(value))
        .catch((e) => console.error(e));
    } catch (e) {
      console.log(e.message);
    }
  };

  saveCarts = (carts) => {
    try {
      fs.promises.writeFile(this.fileCart, carts);
    } catch (e) {
      console.log(e.message);
    }
  };
}

const containerArchive = new ContainerArchivo(fileProduct, fileCart);

export default containerArchive;
