import twilio from "twilio";
import { accountSid, authToken, numberTwilio } from "../config/enviroment.js";

export const sendMessage = async (to, body) => {
  try {
    const from = numberTwilio;
    const sendTo = `+${to}`;

    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({
      body,
      from,
      to: sendTo,
    });

    return {
      result: "success",
      messageId: message.sid,
    };
  } catch (e) {
    return {
      result: "error",
      message: e.message,
    };
  }
};
