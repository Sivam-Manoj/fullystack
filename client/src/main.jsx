import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer limit={1} />
    </React.StrictMode>
  </Provider>
);
