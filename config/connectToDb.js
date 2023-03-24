import mongoose from "mongoose";
import admin from "firebase-admin";
import serviceAccount from "./credentials.json" assert { type: "json" };
import MongoDAO from "../DAOs/mongoDAOs.js";
import FirebaseDAO from "../DAOs/firebaseDAOs.js";
import ArchivoDAO from "../DAOs/archivoDAOs.js";
import MemoriaDAO from "../DAOs/memoriaDAOs.js";
import { databaseUrl, databaseUrlFirebase } from "./enviroment.js";

let isConnected;
let dbDAO;
const db = "mongo";

const connectToFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseUrlFirebase,
  });
};

const connectToDb = async (db) => {
  if (!isConnected) {
    try {
      switch (db) {
        case "mongo":
          await mongoose.connect(databaseUrl);
          dbDAO = new MongoDAO();
          break;
        case "firebase":
          connectToFirebase();
          dbDAO = new FirebaseDAO();
          break;
        case "archivo":
          dbDAO = new ArchivoDAO();
          break;
        case "memoria":
          dbDAO = new MemoriaDAO();
          break;
      }

      isConnected = true;
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  return;
};

connectToDb(db);

export { dbDAO };
