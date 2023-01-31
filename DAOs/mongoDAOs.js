import containerMongoDb from "../controllers/containerMongoDb.js";

class MongoDAO {
  saveProduct = async (productToAdd) => {
    try {
      await containerMongoDb.saveProduct(productToAdd);
    } catch (e) {
      console.log(e.message);
    }
  };

  getProducts = async () => {
    try {
      return await containerMongoDb.getProducts();
    } catch (e) {
      console.log(e.message);
    }
  };

  getProductById = async (id) => {
    try {
      return await containerMongoDb.getProductById(id);
    } catch (e) {
      console.log(e.message);
    }
  };

  updateProduct = async (id, productToUpdate) => {
    try {
      await containerMongoDb.updateProduct(id, productToUpdate);
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteProduct = async (id) => {
    try {
      await containerMongoDb.deleteProduct(id);
    } catch (e) {
      console.log(e.message);
    }
  };

  saveCart = async (cartToAdd) => {
    try {
      await containerMongoDb.saveCart(cartToAdd);
    } catch (e) {
      console.log(e.message);
    }
  };

  getCarts = async () => {
    try {
      return await containerMongoDb.getCarts();
    } catch (e) {
      console.log(e.message);
    }
  };

  getCartById = async (id) => {
    try {
      return await containerMongoDb.getCartById(id);
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteCart = async (id) => {
    try {
      await containerMongoDb.deleteCart(id);
    } catch (e) {
      console.log(e.message);
    }
  };

  addProductInCart = async (id, id_prod) => {
    try {
      await containerMongoDb.addProductInCart(id, id_prod);
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteProductInCart = async (id, id_prod) => {
    try {
      await containerMongoDb.deleteProductInCart(id, id_prod);
    } catch (e) {
      console.log(e.message);
    }
  };
}

export default MongoDAO;
