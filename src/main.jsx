import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LearningProvider } from "./context/LearningContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LearningProvider>
          <App />
        </LearningProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
