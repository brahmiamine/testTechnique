import React, { createContext, useEffect, useReducer, useState } from "react";

let tokenReducer = (token, newToken) => {
  if (newToken === "") {
    localStorage.removeItem("token");
    return "";
  }
  return newToken;
};

const tokenLocalState = localStorage.getItem("token");

export const GlobalContext = createContext();

/**
 * The Global function is a React component that provides a global context for token and messages state,
 * @returns The Global component is returning a GlobalContext.Provider component with the provided children as its content.
 */
function Global({ children }) {
  const [token, setToken] = useReducer(tokenReducer, tokenLocalState || "");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [token, messages]);

  return (
    <GlobalContext.Provider
      value={{
        token,
        setToken,
        messages,
        setMessages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default Global;
