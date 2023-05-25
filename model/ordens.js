import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const ordensSchema = new Schema({
  products: { type: Array, require: true, default: [] },
  number: { type: Number, require: true },
  date: { type: Date, require: true },
  state: { type: String, require: true, default: "Generada" },
  email: { type: String, require: true },
});

const Orden = model("Orden", ordensSchema);

export default Orden;
