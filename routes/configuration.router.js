import { Router } from "express";
import { logger } from "../config/logs.js";
import {
  databaseUrl,
  port,
  secret,
  administrator,
  collectionSession,
  sessionTime,
  emailNodemailer,
  passwordEmail,
  hostEmail,
  accountSid,
  authToken,
  numberTwilio,
  modo,
  nodeEnv,
} from "../config/enviroment.js";

const configurationRouter = Router();

configurationRouter.get("/", async (req, res) => {
  const { method, url } = req;

  const config = {
    databaseUrl,
    port,
    secret,
    administrator,
    collectionSession,
    sessionTime,
    emailNodemailer,
    passwordEmail,
    hostEmail,
    accountSid,
    authToken,
    numberTwilio,
    modo,
    nodeEnv,
  };

  logger.info(`El método y la ruta son: ${method} ${url}.`);

  res.render("configuration", {
    ...config,
  });
});

export default configurationRouter;
