import containerMemoria from "../controllers/containerMemoria.js";

class MemoriaDAO {
  getproducts = () => containerMemoria.getProducts();

  getProductById = (id) => containerMemoria.getProductById(parseInt(id));

  saveProduct = (productToAdd) => containerMemoria.saveProduct(productToAdd);

  updateProduct = (id, productToUpdate) =>
    containerMemoria.updateProduct(parseInt(id), productToUpdate);

  deleteProduct = (id) => containerMemoria.deleteProduct(parseInt(id));

  getCarts = () => containerMemoria.getCarts();

  getCartById = (id) => containerMemoria.getCartById(parseInt(id));

  saveCart = (cartToAdd) => containerMemoria.saveCart(cartToAdd);

  deleteCart = (id) => containerMemoria.deleteCart(parseInt(id));

  addProductInCart = (id, id_prod) =>
    containerMemoria.addProductInCart(parseInt(id), parseInt(id_prod));

  deleteProductInCart = (id, id_prod) =>
    containerMemoria.deleteProductInCart(parseInt(id), parseInt(id_prod));
}

const memoriaDAO = new MemoriaDAO();

export default memoriaDAO;
