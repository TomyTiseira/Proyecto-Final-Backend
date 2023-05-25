import Product from "../model/products.js";
import Cart from "../model/carts.js";
import User from "../model/users.js";
import Message from "../model/messages.js";
import Orden from "../model/ordens.js";

class MongoDao {
  saveProduct = async (productToAdd) => {
    const product = new Product(productToAdd);
    return await product.save();
  };

  getProducts = async () => await Product.find({});

  getProductById = async (id) => await Product.findOne({ _id: id });

  updateProduct = async (id, productToUpdate) => {
    return await Product.updateOne(
      { _id: id },
      { $set: { ...productToUpdate } }
    );
  };

  deleteProduct = async (id) => await Product.deleteOne({ _id: id });

  getProductsByCategory = async (id) => await Product.find({ category: id });

  saveCart = async (cartToAdd) => {
    const cart = new Cart(cartToAdd);
    return await cart.save();
  };

  getCarts = async () => await Cart.find({});

  getCartById = async (id) => await Cart.findOne({ _id: id });

  deleteCart = async (id) => await Cart.deleteOne({ _id: id });

  addProductInCart = async (id, id_prod, quantity) => {
    const cart = await this.getCartById(id);

    const isInCart = () =>
      cart.products.find((product) => product.id === id_prod) ? true : false;

    if (!isInCart()) {
      await Cart.updateOne(
        { _id: id },
        {
          $set: {
            products: [
              ...cart.products,
              { id: id_prod, quantity: quantity || 1 },
            ],
          },
        }
      );
      return;
    }

    const indexProductUpdate = cart.products.findIndex(
      (product) => product.id === id_prod
    );

    cart.products[indexProductUpdate].quantity += quantity || 1;

    await Cart.updateOne(
      { _id: id },
      { $set: { products: [...cart.products] } }
    );
  };

  deleteProductInCart = async (id_cart, id_prod) => {
    const cart = await Cart.findOne({ _id: id_cart });

    const productsUpdate = cart.products.filter(
      (product) => product.id !== id_prod
    );

    await Cart.updateOne(
      { _id: id_cart },
      { $set: { products: [...productsUpdate] } }
    );
  };

  cleanCart = async (id_cart) => {
    await Cart.updateOne({ _id: id_cart }, { $set: { products: [] } });
  };

  saveOrden = async (ordenToAdd) => {
    const orden = new Orden(ordenToAdd);
    return await orden.save();
  };

  getOrdens = async () => await Orden.find({});

  getUser = async (email) => await User.findOne({ email: email });

  addUser = async (userToAdd) => {
    const user = new User(userToAdd);
    await user.save();
  };
}

class Messages {
  addMessage = async (messageToAdd) => {
    const message = new Message(messageToAdd);

    await message.save();
  };

  getMessages = async () => await Message.find({});
}

const dao = new MongoDao();
export const daoMessages = new Messages();

export default dao;
