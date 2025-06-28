import { useState } from 'react';
import axios from 'axios';

function ClientDashboard() {
  const [paymentRequest, setPaymentRequest] = useState('');
  const [settleData, setSettleData] = useState({ id: '', secret: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Payer une hold invoice (payment_request)
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

  // Saisir le code secret pour débloquer la hold invoice
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
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-xl shadow-2xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Espace Client</h2>

        {/* Payer une Hold Invoice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-black">
          <div className="mb-2 font-bold">Payer une Hold Invoice</div>
          <input
            className="border px-2 py-1 rounded mr-2 w-3/4"
            type="text"
            placeholder="Payment Request (lnbc...)"
            value={paymentRequest}
            onChange={e => setPaymentRequest(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
            onClick={payHoldInvoice}
          >
            Payer
          </button>
        </div>

        {/* Débloquer la Hold Invoice avec le code secret */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-black">
          <div className="mb-2 font-bold">Débloquer la Hold Invoice (code secret reçu à la livraison)</div>
          <input
            className="border px-2 py-1 rounded mr-2"
            type="text"
            placeholder="ID de la facture"
            value={settleData.id}
            onChange={e => setSettleData({ ...settleData, id: e.target.value })}
          />
          <input
            className="border px-2 py-1 rounded mr-2"
            type="text"
            placeholder="Code secret"
            value={settleData.secret}
            onChange={e => setSettleData({ ...settleData, secret: e.target.value })}
          />
          <button
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
            onClick={settleHoldInvoice}
          >
            Valider le code
          </button>
        </div>

        {/* Résultat ou erreur */}
        {error && <div className="bg-red-100 text-red-700 rounded p-4">{error}</div>}
        {result && (
          <pre className="bg-gray-900 text-green-200 rounded p-4 overflow-x-auto text-xs mt-4">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}

        <div className="text-center text-gray-400 text-xs mt-8">
          &copy; {new Date().getFullYear()} BitKaba. Tous droits réservés.
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;