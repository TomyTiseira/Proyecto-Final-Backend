import mongoose from "mongoose";
import MongoController from "../controllers/containerMongoDb.js";
import MemoriaController from "../controllers/containerMemoria.js";
import { databaseUrl, nodeEnv } from "./enviroment.js";
import { logger } from "./logs.js";

let isConnected;
let dbDAO;

const connectToDb = async (db) => {
  if (!isConnected) {
    try {
      if (nodeEnv === "test") {
        dbDAO = new MemoriaController();
      } else {
        await mongoose.connect(databaseUrl);
        dbDAO = new MongoController();
      }

      isConnected = true;
      return;
    } catch (e) {
      logger.error(
        `A ocurrido un error inesperado en la inicialización de la Base de Datos.`
      );
    }
  }

  return;
};

connectToDb();

export { dbDAO };
