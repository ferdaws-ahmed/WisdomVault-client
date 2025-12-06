import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Router.jsx";
import AuthProvider from "./Context/AuthContext.jsx";
import ThemeProvider from "./Context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </ThemeProvider>
  </AuthProvider>
);
