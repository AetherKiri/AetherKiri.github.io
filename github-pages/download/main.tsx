import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AetherDownload } from "../../app/download-page";
import "../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><AetherDownload /></StrictMode>,
);
