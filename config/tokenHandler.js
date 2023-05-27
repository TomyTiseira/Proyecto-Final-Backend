import jwt from "jsonwebtoken";
import { privateKey } from "./enviroment.js";

export const generateToken = (user) => {
  jwt.sign(user, privateKey, { expiresIn: "1m" });
};

export const verifyToken = (token) => jwt.verify(token, privateKey);
