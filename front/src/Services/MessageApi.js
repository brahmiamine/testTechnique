import axios from "axios";
import { getSession } from "../Utils/SessionUtils";

const api_url = process.env.REACT_APP_API;

const config = {
  headers: { Authorization: `Bearer ${getSession("token")}` },
};

/**
 * The function sends a message with a subject, content, recipient, and sender using an API endpoint.
 * @param subject - The subject of the message you want to send.
 * @param content - The `content` parameter in the `sendMessage` function represents the content or body of the message that you want to send. It can be
 * a string or any other data type that represents the content of the message.
 * @param to - The "to" parameter in the sendMessage function represents the recipient of the message. It specifies the email address or contact
 * information of the person or entity you want to send the message to.
 * @param from - The "from" parameter represents the sender of the message. It is the email address or identifier of the person or entity who is sending
 * the message.
 * @returns the response from the axios post request.
 */
export async function sendMessage(subject, content, to, from) {
  const body = { subject: subject, content: content, to: to, from: from };
  try {
    const response = await axios.post(api_url + "messages", body, config);
    return response;
  } catch (error) {
    console.error(error);
  }
}

/**
 * The function `getMyOwnMessage` is an asynchronous function that retrieves messages owned by a specific email address.
 * @param email - The email parameter is the email address of the user whose messages you want to retrieve.
 * @returns The response from the API call is being returned.
 */
export async function getMyOwnMessage(email) {
  try {
    const response = await axios.get(api_url + "messages/owner/" + email, config);
    return response;
  } catch (error) {
    console.error(error);
  }
}

/**
 * The function `setMessageRead` sends a PUT request to mark a message as read using the provided ID.
 * @param id - The `id` parameter is the unique identifier of the message that you want to mark as read.
 * @returns The response from the API call is being returned.
 */
export async function setMessageRead(id) {
  try {
    const response = await axios.put(api_url + "messages/" + id, config);
    return response;
  } catch (error) {
    console.error(error);
  }
}
