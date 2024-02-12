import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../Context/Global";

/**
 * The custom React hook that retrieves the user information from a token and updates it whenever the token changes.
 * @returns The `useUser` function returns the `user` state variable.
 */
export const useUser = () => {
  const { token } = useContext(GlobalContext);
  const getPayloadFromToken = (token) => {
    const encodedPayload = token.split(".")[1];
    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);
  return user;
};
