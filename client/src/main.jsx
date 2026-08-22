import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Invitation from "./Invitation.jsx";
import GroomInvitation from "./GroomInvitation.jsx";
import Dashboard from "./Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/sohela" element={<Invitation />} />
        <Route path="/ahmed" element={<GroomInvitation />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
