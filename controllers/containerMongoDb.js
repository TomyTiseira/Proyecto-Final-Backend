import Product from "../model/products.js";
import Cart from "../model/carts.js";

class ContainerMongoDb {
  saveProduct = async (productToAdd) => {
    const product = new Product(productToAdd);
    await product.save();
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

  saveCart = async (cartToAdd) => {
    const cart = new Cart(cartToAdd);
    await cart.save();
  };

  getCarts = async () => await Cart.find({});

  getCartById = async (id) => await Cart.findOne({ _id: id });

  deleteCart = async (id) => await Cart.deleteOne({ _id: id });

  addProductInCart = async (id, id_prod) => {
    const cart = await this.getCartById(id);

    const isInCart = () =>
      cart.products.find((product) => product.id === id_prod) ? true : false;

    if (!isInCart()) {
      await Cart.updateOne(
        { _id: id },
        {
          $set: {
            products: [...cart.products, { id: id_prod, quantity: 1 }],
          },
        }
      );
      return;
    }

    const indexProductUpdate = cart.products.findIndex(
      (product) => product.id === id_prod
    );

    cart.products[indexProductUpdate].quantity++;

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
}

const containerMongoDb = new ContainerMongoDb();

export default containerMongoDb;
