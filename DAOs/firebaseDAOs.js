import { connectToFirebase } from "../config/connectToDb.js";
import containerFirebase from "../controllers/containerFirebase.js";

class FirebaseDAO {
  constructor(connectToDb) {
    connectToDb();
  }

  saveProduct = async (productToAdd) => {
    try {
      const products = await this.getProducts();

      const id = products ? products.length : 0;

      await containerFirebase.saveProduct({ ...productToAdd, id });
    } catch (e) {
      console.log(e.message);
    }
  };

  getProducts = async () => {
    try {
      const products = await containerFirebase.getProducts();

      return products;
    } catch (e) {
      console.log(e.message);
    }
  };

  getProductById = async (id) => {
    try {
      const products = await containerFirebase.getProducts();

      const product = products.find((product) => product.id === parseInt(id));
      return product;
    } catch (e) {
      console.log(e.message);
    }
  };

  updateProduct = async (id, productToUpdate) => {
    try {
      const product = await this.getProductById(parseInt(id));

      if (!product) return;

      await containerFirebase.updateProduct(id, productToUpdate);
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteProduct = async (id) => {
    try {
      const product = await this.getProductById(parseInt(id));

      if (!product) return;

      await containerFirebase.deleteProduct(id);
    } catch (e) {
      console.log(e.message);
    }
  };

  saveCart = async (cartToAdd) => {
    try {
      const products = await this.getCarts();

      const id = products ? products.length : 0;
      await containerFirebase.saveCart({ ...cartToAdd, id });
    } catch (e) {
      console.log(e.message);
    }
  };

  getCarts = async () => {
    try {
      return await containerFirebase.getCarts();
    } catch (e) {
      console.log(e.message);
    }
  };

  getCartById = async (id) => {
    try {
      return await containerFirebase.getCartById(parseInt(id));
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteCart = async (id) => {
    try {
      await containerFirebase.deleteCart(id);
    } catch (e) {
      console.log(e.message);
    }
  };

  addProductInCart = async (id, id_prod) => {
    try {
      await containerFirebase.addProductInCart(id, parseInt(id_prod));
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteProductInCart = async (id, id_prod) => {
    try {
      await containerFirebase.deleteProductInCart(id, parseInt(id_prod));
    } catch (e) {
      console.log(e.message);
    }
  };
}

const firebaseDAO = new FirebaseDAO(connectToFirebase);

export default firebaseDAO;
