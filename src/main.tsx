import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeStorage } from "./lib/initStorage";

// Initialize localStorage with mock data
initializeStorage();

createRoot(document.getElementById("root")!).render(<App />);
