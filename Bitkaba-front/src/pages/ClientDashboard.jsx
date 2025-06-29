import { useState } from 'react';
import axios from 'axios';

function ClientDashboard() {
  const [paymentRequest, setPaymentRequest] = useState('');
  const [settleData, setSettleData] = useState({ id: '', secret: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const payHoldInvoice = async () => {
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:3000/api/pay', { request: paymentRequest });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const settleHoldInvoice = async () => {
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:3000/api/settleholdinvoice', settleData);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-indigo-800 text-white flex flex-col py-8 px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white rounded-full p-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#6366f1" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#fff"/>
            </svg>
          </div>
          <span className="font-bold text-lg">BitKaba</span>
        </div>
        <nav className="flex flex-col gap-4">
          <span className="font-semibold text-indigo-100">Espace Client</span>
          <span className="text-indigo-200">Paiement</span>
          <span className="text-indigo-200">Déblocage</span>
        </nav>
        <div className="mt-auto text-xs text-indigo-200 pt-8">&copy; {new Date().getFullYear()} BitKaba</div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">Espace Client</h1>
            <p className="text-sm text-indigo-400">Payez et débloquez vos commandes Lightning</p>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="Client" className="w-10 h-10 rounded-full border-2 border-indigo-200" />
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Payer une Hold Invoice */}
            <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 border border-indigo-100">
              <h2 className="text-lg font-bold text-indigo-700 mb-2">Payer une Hold Invoice</h2>
              {/* Données fictives produit */}
              <div className="bg-indigo-50 border border-indigo-200 rounded p-4 mb-2">
                <div className="font-semibold text-indigo-800 mb-1">Produit : Casque Bluetooth</div>
                <div className="text-sm text-indigo-700">Description : Casque sans fil, autonomie 20h, réduction de bruit.</div>
                <div className="text-sm text-indigo-700">Montant : <span className="font-bold">1000 sats</span></div>
              </div>
              {/* Champ Payment Request pré-rempli (fictif) */}
              <input
                
                value={paymentRequest}
                onChange={e => setPaymentRequest(e.target.value)}
                // Valeur fictive si vide
                onFocus={() => {
                  if (!paymentRequest) {
                    setPaymentRequest('lnbcrt10u1p59lkkppp5778qewtzxxhfrzc272mw08mrkgrxyamya2n8e7vlewx40kugcqjsdqd0fjhyarew45k7cqzzsxqyz5vqsp5s58rszce888d6pa27fn9a88ddehs6q3juwq63apd7hz0s2p3wm5q9qxpqysgqtw9skxzhsz9yrap7ed0g3t4jd78v304l242ze3zj3ct9u2sg8jl588eqqjwsv7e7dd6kflhy4ylwuh8dn8ge2vxkr0xq0nh05hrfl4gp3d96e4');
                  }
                }}
              />
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded shadow transition"
                onClick={payHoldInvoice}
              >
                Payer
              </button>
            </section>

            {/* Débloquer la Hold Invoice */}
            <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 border border-green-200">
              <h2 className="text-lg font-bold text-green-700 mb-2">Débloquer la Hold Invoice</h2>
              <input
                className="border border-green-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                type="text"
                placeholder="ID de la facture"
                value={settleData.id}
                onChange={e => setSettleData({ ...settleData, id: e.target.value })}
              />
              <input
                className="border border-green-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                type="text"
                placeholder="Code secret"
                value={settleData.secret}
                onChange={e => setSettleData({ ...settleData, secret: e.target.value })}
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow transition"
                onClick={settleHoldInvoice}
              >
                Valider le code
              </button>
            </section>
          </div>

          {/* Résultat ou erreur */}
          {error && <div className="bg-red-100 text-red-700 rounded-lg px-4 py-3 mb-4 shadow text-center">{error}</div>}
          {result && settleData.secret ? (
            <div className="bg-green-100 text-green-800 rounded-lg px-4 py-3 mb-4 shadow text-center font-semibold">
              La transaction a été bien effectuée
            </div>
          ) : result && (
            <pre className="bg-gray-900 text-green-200 rounded p-4 overflow-x-auto text-xs mt-4">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </main>
      </div>
    </div>
  );
}

export default ClientDashboard;