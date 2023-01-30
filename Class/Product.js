class Product {
  constructor(name, description, code, photo, price, stock) {
    this.timestamp = Date.now();
    this.name = name;
    this.description = description;
    this.code = code;
    this.photo = photo;
    this.price = price;
    this.stock = stock;
  }
}

export default Product;
