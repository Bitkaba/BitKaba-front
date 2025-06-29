import { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

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

  // Génère l'URL pour le QR code (vers l'interface client avec le payment request)
  const getQrValue = () => {
    const paymentRequest = result?.invoice?.request || result?.invoice?.payment_request;
    if (!paymentRequest) return '';
    return `${window.location.origin.replace('vendeur', 'client')}?pr=${encodeURIComponent(paymentRequest)}`;
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
          <span className="font-semibold text-indigo-100">Dashboard</span>
          <span className="text-indigo-200">Factures</span>
          <span className="text-indigo-200">Paramètres</span>
        </nav>
        <div className="mt-auto text-xs text-indigo-200 pt-8">&copy; {new Date().getFullYear()} BitKaba</div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">Dashboard Vendeur</h1>
            <p className="text-sm text-indigo-400">Gérez vos factures Lightning et vos paiements</p>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Vendeur" className="w-10 h-10 rounded-full border-2 border-indigo-200" />
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Créer une Hold Invoice */}
            <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 border border-indigo-100">
              <h2 className="text-lg font-bold text-indigo-700 mb-2">Nouvelle Hold Invoice</h2>
              <input
                className="border border-indigo-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                type="number"
                placeholder="Montant (sats)"
                value={holdInvoiceData.amount}
                onChange={e => setHoldInvoiceData({ ...holdInvoiceData, amount: Number(e.target.value) })}
              />
              <input
                className="border border-indigo-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                type="text"
                placeholder="Description"
                value={holdInvoiceData.description}
                onChange={e => setHoldInvoiceData({ ...holdInvoiceData, description: e.target.value })}
              />
              <input
                className="border border-indigo-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                type="text"
                placeholder="Timestamp (optionnel)"
                value={holdInvoiceData.timestamp}
                onChange={e => setHoldInvoiceData({ ...holdInvoiceData, timestamp: e.target.value })}
              />
              <button
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded shadow transition"
                onClick={createHoldInvoice}
              >
                Générer
              </button>
            </section>

            {/* Liste des factures */}
            <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 border border-indigo-100">
              <h2 className="text-lg font-bold text-indigo-700 mb-2">Mes factures</h2>
              <button
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2 rounded shadow transition"
                onClick={getInvoices}
              >
                Afficher la liste
              </button>
              {Array.isArray(result) && (
                <div className="max-h-48 overflow-y-auto mt-2 bg-indigo-50 rounded p-2 text-xs text-indigo-900 border border-indigo-100">
                  {result.length === 0 ? (
                    <div>Aucune facture trouvée.</div>
                  ) : (
                    result.map((invoice, idx) => (
                      <div key={invoice.id || idx} className="mb-2 border-b border-indigo-100 pb-1">
                        <span className="font-semibold">ID:</span> {invoice.id}<br />
                        <span className="font-semibold">Montant:</span> {invoice.tokens} sats<br />
                        <span className="font-semibold">Status:</span> {invoice.is_confirmed ? (
                          <span className="text-green-600 font-bold">Payée</span>
                        ) : invoice.is_held ? (
                          <span className="text-yellow-600 font-bold">En attente</span>
                        ) : (
                          <span className="text-red-600 font-bold">Non payée</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Résultat création ou erreur */}
          {(error || (result && !Array.isArray(result))) && (
            <div className="max-w-4xl">
              {error && (
                <div className="bg-red-100 text-red-700 rounded-lg px-4 py-3 mb-2 shadow text-center">{error}</div>
              )}
              {result && !Array.isArray(result) && (
                <div className="bg-green-50 border border-green-200 text-green-900 rounded-lg px-8 py-8 shadow flex flex-col md:flex-row gap-8 items-start justify-start">
                  <div className="flex-1 flex flex-col gap-4 min-w-[340px] max-w-full">
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Hold Invoice générée !</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Bloc code secret + infos */}
                      <div className="bg-white border border-green-200 rounded-lg p-6 flex-1 min-w-[320px] max-w-full">
                        <span className="font-semibold text-green-800 block mb-2">Secret (à imprimer et coller sur le colis) :</span>
                        <button
                          className="mb-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow transition w-full md:w-auto"
                          onClick={() => {
                            const printContents = document.getElementById('printable-secret').outerHTML;
                            const win = window.open('', '', 'height=400,width=600');
                            win.document.write('<html><head><title>Imprimer le code secret</title>');
                            win.document.write('<style>body{font-family:sans-serif;padding:20px;background:#f8fafc;} .font-mono{font-family:monospace;} .text-lg{font-size:1.25rem;} .rounded{border-radius:0.5rem;} .bg-white{background:#fff;} .text-green-700{color:#047857;} .font-bold{font-weight:bold;} .inline-block{display:inline-block;} .border{border:1px solid #bbf7d0;} .px-3{padding-left:0.75rem;padding-right:0.75rem;} .py-2{padding-top:0.5rem;padding-bottom:0.5rem;} .break-all{word-break:break-all;} </style>');
                            win.document.write('</head><body>');
                            win.document.write(printContents);
                            win.document.write('</body></html>');
                            win.document.close();
                            win.focus();
                            setTimeout(() => win.print(), 500);
                          }}
                        >
                          Imprimer le secret
                        </button>
                        <div
                          id="printable-secret"
                          className="font-mono text-lg bg-white text-green-700 rounded px-3 py-2 inline-block mt-2 border border-green-200 w-full break-all"
                        >
                          {result.invoice?.secret}
                        </div>
                        {/* Affichage Payment Request, ID et Secret */}
                        <div className="mt-4 text-sm text-gray-700 break-all">
                          <div>
                            <span className="font-semibold text-indigo-700">Payment Request :</span>
                            <div className="font-mono text-xs bg-gray-100 rounded px-2 py-1 mt-1">{result.invoice?.request || result.invoice?.payment_request}</div>
                          </div>
                          <div className="mt-2">
                            <span className="font-semibold text-indigo-700">ID :</span>
                            <span className="font-mono text-xs ml-1">{result.invoice?.id}</span>
                          </div>
                          <div className="mt-2">
                            <span className="font-semibold text-indigo-700">Secret :</span>
                            <span className="font-mono text-xs ml-1">{result.invoice?.secret}</span>
                          </div>
                        </div>
                      </div>
                      {/* Bloc QR code */}
                      <div className="flex flex-col items-center justify-center bg-white border border-indigo-100 rounded-lg p-6 min-w-[220px]">
                        {result.invoice?.request || result.invoice?.payment_request ? (
                          <>
                            <QRCode
                              value={getQrValue()}
                              size={140}
                              bgColor="#fff"
                              fgColor="#6366f1"
                              level="H"
                              includeMargin={true}
                            />
                            <div className="text-xs text-indigo-700 mt-2 text-center">Scannez pour payer</div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default VendeurDashboard;