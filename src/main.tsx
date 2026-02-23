import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force correct title and favicon (bypass browser cache)
document.title = "Borge Comercial — Produtos Alimentares, Higiene e Limpeza";

const existingFavicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
existingFavicons.forEach((el) => el.remove());

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = `/favicon.png?v=${Date.now()}`;
document.head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(<App />);
