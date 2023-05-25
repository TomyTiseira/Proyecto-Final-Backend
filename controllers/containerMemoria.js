import dao from "../DAOs/memoriaDAOs.js";

class MemoriaController {
  saveProduct = async (productToAdd) => dao.saveProduct(productToAdd);

  getProducts = async () => dao.getProducts();

  getProductById = async (id) =>
    dao.getProductById(id) ? dao.getProductById(id) : null;

  updateProduct = async (id, productToUpdate) =>
    dao.updateProduct(id, productToUpdate);

  deleteProduct = async (id) => dao.deleteProduct(id);

  clearProducts = async () => dao.clearProducts();

  saveCart = async (cartToAdd) => dao.saveCart(cartToAdd);

  getCarts = async () => dao.getCarts();

  getCartById = async (id) => dao.getCartById(id);

  deleteCart = async (id) => dao.deleteCart(id);

  addProductInCart = async (id, id_prod) => dao.addProductInCart(id, id_prod);

  deleteProductInCart = async (id, id_prod) =>
    dao.deleteProductInCart(id, id_prod);
}

export default MemoriaController;
