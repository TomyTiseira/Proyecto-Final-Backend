import { logger } from "../config/logs.js";

export const handleResponse = (result, req) => {
  const { url, method } = req;
  if (result.result === "success") {
    logger.info(
      `El método y la ruta son: ${method} ${url}. Enviado correctamente.`
    );
  } else {
    logger.error(
      `El método y la ruta son: ${method} ${url}. Fallo el envio, ${result.message}.`
    );
  }
};
