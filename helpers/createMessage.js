import { handleResponse } from "../helpers/handleResponse.js";
import { sendEmail } from "../helpers/sendEmail.js";
import { sendMessage } from "../helpers/sendMessage.js";
import { numberAdministrator } from "../config/enviroment.js";
import { dbDAO } from "../config/connectToDb.js";

export const createMessage = async (user, products, req) => {
  let messageToSend = `Productos:`;
  let html = `<h1>Productos:</h1>`;

  for (const productInCart of products) {
    const product = await dbDAO.getProductById(productInCart.id);

    messageToSend += `
      - nombre: ${product.name}, precio: $${product.price}, quantity: ${productInCart.quantity}`;

    html += `
      <h2>- nombre: ${product.name}, precio: $${product.price}, quantity: ${productInCart.quantity}</h2>`;
  }

  const resultSendMessageUser = await sendMessage(user.numero, messageToSend);
  handleResponse(resultSendMessageUser, req);

  const resultSendMessageAdministrator = await sendMessage(
    numberAdministrator,
    messageToSend,
    true
  );

  handleResponse(resultSendMessageAdministrator, req);

  const resultSendEmail = await sendEmail(
    user.email,
    messageToSend,
    `Nuevo pedido de ${user.nombre} - ${user.email}`,
    html
  );

  handleResponse(resultSendEmail, req);
};
