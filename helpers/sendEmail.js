import nodemailer from "nodemailer";
import {
  emailNodemailer,
  hostEmail,
  passwordEmail,
} from "../config/enviroment.js";

export const sendEmail = async (to, body, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: hostEmail,
    port: 587,
    auth: {
      user: emailNodemailer,
      pass: passwordEmail,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `Servidor Node.js <${emailNodemailer}>`,
      to,
      subject,
      text: body,
      html,
    });

    return {
      result: "success",
      messageId: info.messageId,
    };
  } catch (e) {
    return {
      result: "error",
      message: e.message,
    };
  }
};
