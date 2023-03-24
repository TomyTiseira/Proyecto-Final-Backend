import * as dotenv from "dotenv";
dotenv.config();

export const databaseUrl = process.env.DATABASE_URL;
export const databaseUrlFirebase = process.env.DATABASE_URL_FIREBASE;
export const port = process.env.PORT;
export const secret = process.env.SECRET;
