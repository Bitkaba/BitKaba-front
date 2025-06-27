import { useNavigate } from "react-router-dom"

export default function ChoixRole() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-700 to-indigo-900 text-white">
      <h2 className="text-3xl font-bold mb-8">Qui êtes-vous&nbsp;?</h2>
      <div className="flex gap-8">
        <button
          onClick={() => navigate("/client")}
          className="px-8 py-4 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 font-semibold text-lg shadow"
        >
          Client
        </button>
        <button
          onClick={() => navigate("/vendeur")}
          className="px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-lg shadow"
        >
          Vendeur
        </button>
      </div>
    </div>
  )
}