import containerMemoria from "../controllers/containerMemoria.js";

class MemoriaDAO {
  saveProduct = (productToAdd) => containerMemoria.saveProduct(productToAdd);

  getProducts = () => containerMemoria.getProducts();

  getProductById = (id) => containerMemoria.getProductById(id);

  updateProduct = (id, productToUpdate) =>
    containerMemoria.updateProduct(id, productToUpdate);

  deleteProduct = (id) => containerMemoria.deleteProduct(id);

  saveCart = (cartToAdd) => containerMemoria.saveCart(cartToAdd);

  getCarts = () => containerMemoria.getCarts();

  getCartById = (id) => containerMemoria.getCartById(id);

  deleteCart = (id) => containerMemoria.deleteCart(id);

  addProductInCart = (id, id_prod) =>
    containerMemoria.addProductInCart(id, id_prod);

  deleteProductInCart = (id, id_prod) =>
    containerMemoria.deleteProductInCart(id, id_prod);
}

export default MemoriaDAO;
