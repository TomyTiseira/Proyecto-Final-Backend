class ContainerMemoria {
  constructor() {
    this.products = [];
    this.carts = [];
  }

  getProducts = () => this.products;

  saveProduct = (productToAdd) => {
    const id = this.products.length ? this.products.length : 0;

    this.products.push({ ...productToAdd, id: id.toString() });
  };

  getProductById = (id) => this.products.find((product) => product.id === id);

  updateProduct = (id, productToUpdate) => {
    this.products[parseInt(id)] = { ...productToUpdate, id };
  };

  deleteProduct = (id) => {
    this.products = this.products.filter((product) => product.id !== id);
  };

  getCarts = () => this.carts;

  getCartById = (id) => this.carts.find((cart) => cart.id === id);

  saveCart = (cartToAdd) => {
    const id = this.carts.length ? this.carts.length : 0;

    this.carts.push({ ...cartToAdd, id: id.toString() });
  };

  deleteCart = (id) => {
    this.carts = this.carts.filter((cart) => cart.id !== id);
  };

  addProductInCart = (id, id_prod) => {
    const cart = this.carts.find((cart) => cart.id === id);

    const isInCart = () =>
      cart.products.find((product) => product.id === id_prod) ? true : false;

    if (!isInCart()) {
      cart.products.push({ id: id_prod, quantity: 1 });

      return;
    }

    cart.products[id_prod].quantity++;
  };

  deleteProductInCart = (id, id_prod) => {
    const cart = this.carts.find((cart) => cart.id === id);

    const isInCart = () =>
      cart.products.find((product) => product.id === id_prod) ? true : false;

    if (!isInCart()) return;

    const productsUpdate = cart.products.filter(
      (product) => product.id !== id_prod
    );

    cart.products = productsUpdate;
  };
}

const containerMemoria = new ContainerMemoria();

export default containerMemoria;
