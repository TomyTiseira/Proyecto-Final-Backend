import { dbDAO } from "../config/connectToDb.js";
import { logger } from "../config/logs.js";

export const createOrdenAndCleanCart = async (ordenToAdd, cartId) => {
  try {
    await dbDAO.cleanCart(cartId);
    return await dbDAO.saveOrden(ordenToAdd);
  } catch (e) {
    logger.error(`Error al crear la orden y limpiar el carrito. ${e.message}`);
  }
};
