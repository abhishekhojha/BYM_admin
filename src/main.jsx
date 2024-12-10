import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./Css/index.css";
import { ToastContainer } from "react-toastify";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
