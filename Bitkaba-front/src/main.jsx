import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import ChoixRole from "./pages/ChoixRole"
import ClientDashboard from "./pages/ClientDashboard"
import VendeurDashboard from "./pages/VendeurDashboard"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/choix" element={<ChoixRole />} />
        <Route path="/client" element={<ClientDashboard/>} />
        <Route path="/vendeur" element={<VendeurDashboard/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)