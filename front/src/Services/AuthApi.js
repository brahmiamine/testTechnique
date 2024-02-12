import axios from "axios";

const api_url = process.env.REACT_APP_API;

/**
 * The above function is an asynchronous function that sends a POST request to the "register" endpoint of an API with the provided email, password, and
 * name, and returns the response.
 * @param email - The email parameter is the email address of the user who wants to register.
 * @param password - The `password` parameter is the password that the user wants to set for their account.
 * @param name - The `name` parameter is a string that represents the name of the user who is registering.
 * @returns the response from the API call.
 */
export async function register(email, password, name) {
  const body = { email: email, password: password, name: name };

  try {
    const response = await axios.post(api_url + "register", body);
    return response;
  } catch (error) {
    console.error(error);
  }
}

/**
 * The login function sends a POST request to the API with the provided email and password, and returns the response.
 * @param email - The `email` parameter is the email address of the user trying to log in. It is used to identify the user and verify their identity
 * during the login process.
 * @param password - The `password` parameter is the user's password that they enter when trying to log in. It is a string value.
 * @returns The response from the API call is being returned.
 */
export async function login(email, password) {
  const body = { email: email, password: password };
  try {
    const response = await axios.post(api_url + "login", body);
    return response;
  } catch (error) {
    console.error(error);
  }
}
