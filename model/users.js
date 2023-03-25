import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  nombre: { type: String, require: true },
  direccion: { type: String, require: true },
  edad: { type: Number, require: true },
  numero: { type: Number, require: true },
  foto: { type: String, require: true },
  cartId: { type: Schema.Types.ObjectId, require: true },
});

const User = model("User", usersSchema);

export default User;
