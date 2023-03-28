import { logger } from "../config/logs.js";
import containerMongoDb from "../controllers/containerMongoDb.js";

class MongoDAO {
  saveProduct = async (productToAdd) => {
    try {
      await containerMongoDb.saveProduct(productToAdd);
    } catch (e) {
      logger.error(`Fallo al agregar un producto.`);
    }
  };

  getProducts = async () => {
    try {
      return await containerMongoDb.getProducts();
    } catch (e) {
      logger.error(`Fallo al obtener los productos.`);
    }
  };

  getProductById = async (id) => {
    try {
      return await containerMongoDb.getProductById(id);
    } catch (e) {
      logger.error(`Fallo al agregar un producto según si id. Id: ${id}.`);
    }
  };

  updateProduct = async (id, productToUpdate) => {
    try {
      await containerMongoDb.updateProduct(id, productToUpdate);
    } catch (e) {
      logger.error(
        `Fallo al actualizar un producto según si id. Id: ${id}, producto actualizado: ${productToUpdate}.`
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      await containerMongoDb.deleteProduct(id);
    } catch (e) {
      logger.error(`Fallo al eliminar un producto según su id. Id: ${id}.`);
    }
  };

  saveCart = async (cartToAdd) => {
    try {
      return await containerMongoDb.saveCart(cartToAdd);
    } catch (e) {
      logger.error(`Fallo al agregar un carrito.`);
    }
  };

  getCarts = async () => {
    try {
      return await containerMongoDb.getCarts();
    } catch (e) {
      logger.error(`Fallo al obtener los carritos.`);
    }
  };

  getCartById = async (id) => {
    try {
      return await containerMongoDb.getCartById(id);
    } catch (e) {
      logger.error(`Fallo al obtener un carrito según su id. Id: ${id}.`);
    }
  };

  deleteCart = async (id) => {
    try {
      await containerMongoDb.deleteCart(id);
    } catch (e) {
      logger.error(`Fallo al eliminar un carrito según su id. Id: ${id}.`);
    }
  };

  addProductInCart = async (id, id_prod, quantity) => {
    try {
      await containerMongoDb.addProductInCart(id, id_prod, quantity);
    } catch (e) {
      logger.error(
        `Fallo al agregar un producto al carrito. Id del carrito: ${id}, id del producto: ${id_prod}.`
      );
    }
  };

  deleteProductInCart = async (id, id_prod) => {
    try {
      await containerMongoDb.deleteProductInCart(id, id_prod);
    } catch (e) {
      logger.error(
        `Fallo al eliminar un producto del carrito. Id del carrito: ${id}. Id del producto: ${id_prod}.`
      );
    }
  };

  getUser = async (email) => {
    try {
      return await containerMongoDb.getUser(email);
    } catch (e) {
      logger.error(
        `Fallo al obtener un usuario según su email. Email: ${email}.`
      );
    }
  };

  addUser = async (userToAdd) => {
    try {
      await containerMongoDb.addUser(userToAdd);
    } catch (e) {
      logger.error(`Fallo al agregar un usuario.`);
    }
  };
}

export default MongoDAO;
