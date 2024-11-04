import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import "./styles/mobile.css";
import "./styles/desktop.css";
import "./styles/App.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
