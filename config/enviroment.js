import * as dotenv from "dotenv";
dotenv.config();

export const databaseUrl = process.env.DATABASE_URL;
export const databaseUrlFirebase = process.env.DATABASE_URL_FIREBASE;

export const port = process.env.PORT;
export const secret = process.env.SECRET;

export const collectionProducts = process.env.COLLECTION_PRODUCTS;
export const collectionCarts = process.env.COLLECTION_CARTS;

export const administrator = process.env.ADMINISTRATOR;

export const collectionSession = process.env.COLLECTION_SESSION;

export const accountSid = process.env.ACCOUNT_SID;
export const authToken = process.env.AUTH_TOKEN;

export const number = process.env.NUMBER;
