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

export const emailNodemailer = process.env.EMAIL_NODEMAILER;
export const passwordEmail = process.env.PASSWORD_EMAIL;
export const hostEmail = process.env.HOST_EMAIL;

export const accountSid = process.env.ACCOUNT_SID;
export const authToken = process.env.AUTH_TOKEN;

export const numberTwilio = process.env.NUMBER_TWILIO;
export const numberWhatsapp = process.env.NUMBER_WHATSAPP;
export const numberAdministrator = process.env.NUMBER_ADMINISTRATOR;

export const modo = process.env.MODO;
