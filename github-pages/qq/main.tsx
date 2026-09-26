import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AetherQQ } from "../../app/qq-page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AetherQQ />
  </StrictMode>,
);
