import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AetherPatch } from "../../app/patch-page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><AetherPatch /></StrictMode>,
);
