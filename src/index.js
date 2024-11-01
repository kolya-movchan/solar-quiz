import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./styles/index.css";
import "./styles/mobile.css";
import "./styles/desktop.css";
import "./styles/App.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/quizz" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
