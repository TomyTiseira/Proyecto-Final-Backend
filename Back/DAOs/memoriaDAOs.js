import containerMemoria from "../controllers/containerMemoria.js";

class MemoriaDAO {
  saveProduct = async (productToAdd) =>
    containerMemoria.saveProduct(productToAdd);

  getProducts = async () => containerMemoria.getProducts();

  getProductById = async (id) =>
    containerMemoria.getProductById(id)
      ? containerMemoria.getProductById(id)
      : null;

  updateProduct = async (id, productToUpdate) =>
    containerMemoria.updateProduct(id, productToUpdate);

  deleteProduct = async (id) => containerMemoria.deleteProduct(id);

  clearProducts = async () => containerMemoria.clearProducts();

  saveCart = async (cartToAdd) => containerMemoria.saveCart(cartToAdd);

  getCarts = async () => containerMemoria.getCarts();

  getCartById = async (id) => containerMemoria.getCartById(id);

  deleteCart = async (id) => containerMemoria.deleteCart(id);

  addProductInCart = async (id, id_prod) =>
    containerMemoria.addProductInCart(id, id_prod);

  deleteProductInCart = async (id, id_prod) =>
    containerMemoria.deleteProductInCart(id, id_prod);
}

export default MemoriaDAO;
