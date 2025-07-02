import { useNavigate } from "react-router-dom"
import React from "react"
import Header from "../components/Header"

export default function ChoixRole() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <Header />

      {/* Arrière-plan unifié */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/images/image3.jpg"
          alt="Circuit électronique en arrière-plan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      </div>

      {/* Contenu de la page */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 px-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent drop-shadow-md mb-12">
          Qui êtes-vous&nbsp;?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate("/client")}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 font-semibold text-lg text-white shadow-xl hover:from-emerald-600 hover:to-green-700 transition duration-300 transform hover:scale-105"
          >
            Je suis un Client
          </button>
          <button
            onClick={() => navigate("/vendeur")}
            className="px-10 py-4 rounded-full bg-blue-900/80 border border-blue-700 font-semibold text-lg text-blue-100 shadow-xl hover:bg-blue-800/80 hover:border-blue-500 transition duration-300 transform hover:scale-105"
          >
            Je suis un Vendeur
          </button>
        </div>
      </div>
    </main>
  )
}