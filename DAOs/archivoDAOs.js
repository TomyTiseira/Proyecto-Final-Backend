import containerArchive from "../controllers/containerArchivo.js";

class ArchivoDAO {
  saveProduct = async (productToAdd) => {
    const products = await this.getProducts();

    if (!products) {
      await containerArchive.saveProduct([
        JSON.stringify([{ ...productToAdd, id: "0" }], null, 2),
      ]);
      return;
    }

    productToAdd.id = products.length.toString();

    await containerArchive.saveProduct(
      JSON.stringify([...products, productToAdd], null, 2)
    );
  };

  getProducts = async () => {
    let products = (await containerArchive.getProducts()) || [];

    if (products.length > 0) {
      products = JSON.parse(products);
    }
    return products;
  };

  getProductById = async (id) => {
    const products = await this.getProducts();

    const product = products.find((product) => product.id === id);
    return product;
  };

  updateProduct = async (id, productToUpdate) => {
    const products = await this.getProducts();

    if (!products) return;

    const productsUpdate = products.filter((product) => product.id !== id);

    await containerArchive.saveProduct(
      JSON.stringify(
        [...productsUpdate, { ...productToUpdate, id: id }],
        null,
        2
      )
    );
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();

    if (!products) return;

    const productsUpdate = products.filter((product) => product.id !== id);

    await containerArchive.saveProduct(
      JSON.stringify([...productsUpdate], null, 2)
    );
  };

  saveCart = async (cartToAdd) => {
    const carts = await this.getCarts();

    if (!carts) {
      await containerArchive.saveCarts([
        JSON.stringify([{ ...cartToAdd, id: "0" }], null, 2),
      ]);
      return;
    }

    cartToAdd.id = carts.length.toString();

    await containerArchive.saveCarts(
      JSON.stringify([...carts, cartToAdd], null, 2)
    );
  };

  getCarts = async () => {
    return await containerArchive.getCarts();
  };

  getCartById = async (id) => {
    const carts = await this.getCarts();

    const cart = carts.find((cart) => cart.id === id);
    return cart;
  };

  deleteCart = async (id) => {
    const carts = await this.getCarts();

    if (!carts) return;

    const cartsUpdate = carts.filter((cart) => cart.id !== id);

    await containerArchive.saveCarts(JSON.stringify([...cartsUpdate], null, 2));
  };

  addProductInCart = async (id, id_prod) => {
    const carts = await this.getCarts();
    const cart = await this.getCartById(id);

    const cartsUpdate = carts.filter((cart) => cart.id !== id);

    const isInCart = () =>
      cart.products.find((product) => product.id === id_prod) ? true : false;

    if (!isInCart()) {
      cart.products.push({ id: id_prod, quantity: 1 });
    } else {
      cart.products[id].quantity++;
    }

    cartsUpdate.push(cart);

    await containerArchive.saveCarts(JSON.stringify([...cartsUpdate], null, 2));
  };

  deleteProductInCart = async (id, id_prod) => {
    const carts = await this.getCarts();
    const cart = await this.getCartById(id);

    const cartsUpdate = carts.filter((cart) => cart.id !== id);

    const productsUpdate = cart.products.filter(
      (product) => product.id !== id_prod
    );

    cart.products = productsUpdate;

    cartsUpdate.push(cart);

    await containerArchive.saveCarts(JSON.stringify([...cartsUpdate], null, 2));
  };
}

export default ArchivoDAO;
