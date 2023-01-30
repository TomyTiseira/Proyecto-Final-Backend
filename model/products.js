import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const productsSchema = new Schema({
  name: { type: String, require: true },
  timestamp: { type: Number, require: true },
  description: { type: String, require: true },
  code: { type: String, require: true },
  photo: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true, default: true },
});

const Product = model("Product", productsSchema);

export default Product;
