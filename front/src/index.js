import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Global from "./Context/Global";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Global>
    <React.StrictMode>
      <App />
      <ToastContainer />
    </React.StrictMode>
  </Global>
);
