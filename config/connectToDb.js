import mongoose from "mongoose";
import admin from "firebase-admin";
import serviceAccount from "./credentials.json" assert { type: "json" };

let isConnected;

const connectToFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coff-fe-default-rtdb.firebaseio.com",
  });
};

const connectToDb = async (db) => {
  if (!isConnected) {
    try {
      // switch (db) {
      //   case "mongo":
      //     await mongoose.connect("mongodb://127.0.0.1:27017/Coff-fe");
      //     break;
      //   case "firestore":
      //     connectToFirebase();
      //     break;
      //   case "archivo":
      //     break;
      //   case "memoria":
      //     break;
      // }

      await mongoose.connect("mongodb://127.0.0.1:27017/Coff-fe");
      isConnected = true;
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  return;
};

export { connectToDb, connectToFirebase };
