import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const cartsSchema = new Schema({
  timestamp: { type: Number, require: true },
  products: { type: Array, require: true, default: [] },
});

const Cart = model("Cart", cartsSchema);

export default Cart;
