import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AetherSite } from "../app/site";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AetherSite />
  </StrictMode>,
);
