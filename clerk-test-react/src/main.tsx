import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/react-router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Authcontext.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <AuthProvider>
        <App />
        </AuthProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);
