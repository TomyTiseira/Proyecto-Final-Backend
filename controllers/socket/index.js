import { Server } from "socket.io";
import { daoMessages } from "../../DAOs/mongoDAOs.js";
import { logger } from "../../config/logs.js";
import dao from "../../DAOs/mongoDAOs.js";

export const createIo = (server) => {
  const io = new Server(server);

  io.on("connection", async (client) => {
    const messagesArray = (await daoMessages.getMessages()) || [];

    client.emit("messages", messagesArray);

    client.on("new-message", async (message) => {
      const date = new Date().toLocaleString();

      const user = await dao.getUser(message.author.email);

      const messageToAdd = {
        author: {
          email: user.email,
          name: user.nombre,
          age: user.edad,
          avatar: user.foto,
        },
        text: message.text,
        date,
      };

      try {
        await daoMessages.addMessage(messageToAdd);
        messagesArray.messages.push(messageToAdd);
      } catch (e) {
        logger.error(`Fallo al agregar el mensaje.`);
      }

      io.sockets.emit("message-added", messageToAdd);
    });
  });
};
