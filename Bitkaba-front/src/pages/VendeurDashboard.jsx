import { useState } from 'react';
import axios from 'axios';

function VendeurDashboard() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [holdInvoiceData, setHoldInvoiceData] = useState({ amount: 1000, description: '', timestamp: '' });

  // Liste des factures
  const getInvoices = async () => {
    setError('');
    setResult(null);
    try {
      const res = await axios.get('http://localhost:3000/api/invoices');
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  // Créer une hold invoice
  const createHoldInvoice = async () => {
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:3000/api/holdinvoice', holdInvoiceData);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#232526] via-[#414345] to-[#232526] flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#232526] tracking-tight">BitKaba - Dashboard Vendeur</h1>
            <p className="text-gray-500 mt-1">Gérez vos factures Lightning et vos paiements en toute simplicité.</p>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Vendeur" className="w-16 h-16 rounded-full shadow-lg border-2 border-[#414345]" />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Créer une Hold Invoice */}
          <div className="bg-gradient-to-br from-[#6a11cb] to-[#2575fc] rounded-xl p-6 shadow-lg flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white mb-2">Créer une Hold Invoice</h2>
            <input
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              placeholder="Montant (sats)"
              value={holdInvoiceData.amount}
              onChange={e => setHoldInvoiceData({ ...holdInvoiceData, amount: Number(e.target.value) })}
            />
            <input
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Description"
              value={holdInvoiceData.description}
              onChange={e => setHoldInvoiceData({ ...holdInvoiceData, description: e.target.value })}
            />
            <input
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Timestamp (optionnel)"
              value={holdInvoiceData.timestamp}
              onChange={e => setHoldInvoiceData({ ...holdInvoiceData, timestamp: e.target.value })}
            />
            <button
              className="mt-2 bg-white text-[#2575fc] font-bold py-2 rounded-lg shadow hover:bg-blue-50 transition"
              onClick={createHoldInvoice}
            >
              Générer Hold Invoice
            </button>
          </div>

          {/* Liste des factures */}
          <div className="bg-gradient-to-br from-[#ff512f] to-[#dd2476] rounded-xl p-6 shadow-lg flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white mb-2">Voir mes factures</h2>
            <button
              className="bg-white text-[#dd2476] font-bold py-2 rounded-lg shadow hover:bg-pink-50 transition"
              onClick={getInvoices}
            >
              Afficher la liste des factures
            </button>
            {Array.isArray(result) && (
              <div className="max-h-48 overflow-y-auto mt-2 bg-white bg-opacity-80 rounded-lg p-2 text-xs text-gray-800">
                {result.length === 0 ? (
                  <div>Aucune facture trouvée.</div>
                ) : (
                  result.map((invoice, idx) => (
                    <div key={invoice.id || idx} className="mb-2 border-b border-gray-200 pb-1">
                      <span className="font-semibold">ID:</span> {invoice.id}<br />
                      <span className="font-semibold">Montant:</span> {invoice.tokens} sats<br />
                      <span className="font-semibold">Status:</span> {invoice.is_confirmed ? "Payée" : invoice.is_held ? "En attente" : "Non payée"}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Résultat création ou erreur */}
        {(error || (result && !Array.isArray(result))) && (
          <div className="mt-4">
            {error && (
              <div className="bg-red-100 text-red-700 rounded-lg px-4 py-3 mb-2 shadow">{error}</div>
            )}
            {result && !Array.isArray(result) && (
              <div className="bg-green-100 text-green-800 rounded-lg px-4 py-3 shadow">
                <div className="font-bold mb-1">Hold Invoice générée :</div>
                <div className="break-all text-xs">
                  <span className="font-semibold">Payment Request :</span> {result.invoice?.request || result.invoice?.payment_request}<br />
                  <span className="font-semibold">ID :</span> {result.invoice?.id}<br />
                  <span className="font-semibold">Secret :</span> {result.invoice?.secret}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs mt-8">
          &copy; {new Date().getFullYear()} BitKaba. Tous droits réservés.
        </div>
      </div>
    </div>
  );
}

export default VendeurDashboard;