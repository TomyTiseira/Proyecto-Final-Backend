import { logger } from "../config/logs.js";
import dao from "../DAOs/mongoDAOs.js";

class MongoController {
  saveProduct = async (productToAdd) => {
    try {
      return await dao.saveProduct(productToAdd);
    } catch (e) {
      logger.error(`Fallo al agregar un producto.`);
    }
  };

  getProducts = async () => {
    try {
      return await dao.getProducts();
    } catch (e) {
      logger.error(`Fallo al obtener los productos.`);
    }
  };

  getProductById = async (id) => {
    try {
      return await dao.getProductById(id);
    } catch (e) {
      logger.error(`Fallo al agregar un producto según su id. Id: ${id}.`);
    }
  };

  updateProduct = async (id, productToUpdate) => {
    try {
      await dao.updateProduct(id, productToUpdate);
    } catch (e) {
      logger.error(
        `Fallo al actualizar un producto según si id. Id: ${id}, producto actualizado: ${productToUpdate}.`
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      await dao.deleteProduct(id);
    } catch (e) {
      logger.error(`Fallo al eliminar un producto según su id. Id: ${id}.`);
    }
  };

  getProductsByCategory = async (id) => {
    try {
      return await dao.getProductsByCategory(id);
    } catch (e) {
      logger.error(`Fallo al obtener los productos. ${e.messsage}`);
    }
  };

  clearProducts = async () => {}; // Not implemented for segurity reasons.

  saveCart = async (cartToAdd) => {
    try {
      return await dao.saveCart(cartToAdd);
    } catch (e) {
      logger.error(`Fallo al agregar un carrito.`);
    }
  };

  getCarts = async () => {
    try {
      return await dao.getCarts();
    } catch (e) {
      logger.error(`Fallo al obtener los carritos.`);
    }
  };

  getCartById = async (id) => {
    try {
      return await dao.getCartById(id);
    } catch (e) {
      logger.error(`Fallo al obtener un carrito según su id. Id: ${id}.`);
    }
  };

  deleteCart = async (id) => {
    try {
      await dao.deleteCart(id);
    } catch (e) {
      logger.error(`Fallo al eliminar un carrito según su id. Id: ${id}.`);
    }
  };

  addProductInCart = async (id, id_prod, quantity) => {
    try {
      await dao.addProductInCart(id, id_prod, quantity);
    } catch (e) {
      logger.error(
        `Fallo al agregar un producto al carrito. Id del carrito: ${id}, id del producto: ${id_prod}.`
      );
    }
  };

  deleteProductInCart = async (id, id_prod) => {
    try {
      await dao.deleteProductInCart(id, id_prod);
    } catch (e) {
      logger.error(
        `Fallo al eliminar un producto del carrito. Id del carrito: ${id}. Id del producto: ${id_prod}.`
      );
    }
  };

  cleanCart = async (id_cart) => {
    try {
      await dao.cleanCart(id_cart);
    } catch (e) {
      logger.error(
        `Fallo al eliminar los productos del carrito. Id del carrito: ${id}. ${e.message}`
      );
    }
  };

  saveOrden = async (orden) => {
    try {
      const ordens = await this.getOrdens();

      const number = ordens ? ordens.length + 1 : 1;
      const date = new Date().toLocaleString();

      const ordenToAdd = {
        ...orden,
        number,
        date,
      };

      return await dao.saveOrden(ordenToAdd);
    } catch (e) {
      logger.error(`Fallo al obtener guardar la orden.`);
    }
  };

  getOrdens = async () => {
    try {
      return await dao.getOrdens();
    } catch (e) {
      logger.error(`Fallo al obtener las ordenes.`);
    }
  };

  getUser = async (email) => {
    try {
      return await dao.getUser(email);
    } catch (e) {
      logger.error(
        `Fallo al obtener un usuario según su email. Email: ${email}.`
      );
    }
  };

  addUser = async (userToAdd) => {
    try {
      await dao.addUser(userToAdd);
    } catch (e) {
      logger.error(`Fallo al agregar un usuario.`);
    }
  };
}

export default MongoController;
