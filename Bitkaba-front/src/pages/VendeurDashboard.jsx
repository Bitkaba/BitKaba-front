import { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import React from 'react';
import { toPng } from 'html-to-image';
import {
  ArrowDownTrayIcon,
  ShareIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

function VendeurDashboard() {
  const [result, setResult] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');
  const [holdInvoiceData, setHoldInvoiceData] = useState({ amount: 1000, description: '' });
  const qrCodeRef = useRef(null);
  const invoicesSectionRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [filterDate, setFilterDate] = useState('');

  // Liste des factures
  const getInvoices = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await axios.get('http://localhost:3000/api/invoices');
      setInvoices(res.data);
      setError(''); // Clear previous errors on success
    } catch (err) {
      setError(err.response?.data?.error || 'Impossible de charger les factures.');
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Créer une hold invoice
  const createHoldInvoice = async () => {
    setError('');
    setResult(null);
    setIsCreating(true);
    try {
      const dataWithTimestamp = {
        ...holdInvoiceData,
        timestamp: new Date().toISOString(),
      };
      const res = await axios.post('http://localhost:3000/api/holdinvoice', dataWithTimestamp);
      setResult(res.data);
      await getInvoices(); // Refresh invoice list
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Fetch invoices on component mount
  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  // Génère l'URL pour le QR code (vers l'interface client avec le payment request)
  const getQrValue = () => {
    const paymentRequest = result?.invoice?.request || result?.invoice?.payment_request;
    if (!paymentRequest) return '';
    return `${window.location.origin.replace('vendeur', 'client')}?pr=${encodeURIComponent(paymentRequest)}`;
  };

  const downloadQrCode = useCallback(() => {
    if (qrCodeRef.current === null) {
      return;
    }
    toPng(qrCodeRef.current, { cacheBust: true, backgroundColor: '#fff', pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'bitkaba-qrcode.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Erreur lors du téléchargement du QR code.', err);
        setError('Erreur lors du téléchargement du QR code.');
      });
  }, []);

  const exportQrCode = useCallback(async () => {
    if (qrCodeRef.current === null || !navigator.clipboard?.write) {
      alert("La copie dans le presse-papiers n'est pas supportée sur ce navigateur.");
      return;
    }
    try {
      const dataUrl = await toPng(qrCodeRef.current, { cacheBust: true, backgroundColor: '#fff', pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      alert('QR Code copié dans le presse-papiers !');
    } catch (err) {
      console.error('La copie a échoué.', err);
      setError('La copie a échoué.');
    }
  }, []);

  const shareQrCode = useCallback(async () => {
    if (qrCodeRef.current === null) return;
    try {
      const dataUrl = await toPng(qrCodeRef.current, { cacheBust: true, backgroundColor: '#fff', pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'bitkaba-qrcode.png', { type: blob.type });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: 'BitKaba Hold Invoice', text: 'Scannez ce QR code pour payer la facture.', files: [file] });
      } else {
        alert("Le partage de fichiers n'est pas supporté sur ce navigateur.");
      }
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Le partage a échoué.', err);
    }
  }, []);

  const handleScrollToInvoices = () => {
    invoicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (!filterDate) return true;
    if (!invoice.timestamp) return false;
    try {
      const invoiceDate = new Date(invoice.timestamp).toISOString().split('T')[0];
      return invoiceDate === filterDate;
    } catch (e) {
      return false;
    }
  });
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-blue-900 text-white flex flex-col py-8 px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white rounded-full p-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#1e3a8a" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#fff"/>
            </svg>
          </div>
          <span className="font-bold text-lg">BitKaba</span>
        </div>
        <nav className="flex flex-col gap-4">
          <span className="font-semibold text-blue-200">Dashboard</span>
          <span onClick={handleScrollToInvoices} className="text-blue-300 cursor-pointer hover:text-white transition">Factures</span>
          <span className="text-blue-300 cursor-not-allowed opacity-50">Paramètres</span>
        </nav>
        <div className="mt-auto text-xs text-blue-300 pt-8">&copy; {new Date().getFullYear()} BitKaba</div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Dashboard Vendeur</h1>
            <p className="text-sm text-blue-500">Gérez vos factures Lightning et vos paiements</p>
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Vendeur" className="w-10 h-10 rounded-full border-2 border-blue-300" />
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          {/* Créer une Hold Invoice */}
          <div className="max-w-2xl mx-auto">
            <section className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 border border-blue-200 mb-8">
              <h2 className="text-lg font-bold text-blue-800 mb-2">Nouvelle Hold Invoice</h2>
              <input
                className="border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="number"
                placeholder="Montant (sats)"
                value={holdInvoiceData.amount}
                onChange={e => setHoldInvoiceData({ ...holdInvoiceData, amount: Number(e.target.value) })}
              />
              <input
                className="border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                placeholder="Description"
                value={holdInvoiceData.description}
                onChange={e => setHoldInvoiceData({ ...holdInvoiceData, description: e.target.value })}
              />
              <button
                className="mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded shadow transition flex items-center justify-center disabled:opacity-50"
                onClick={createHoldInvoice}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Génération...</span>
                  </>
                ) : (
                  'Générer'
                )}
              </button>
            </section>
          </div>

          {/* Résultat création ou erreur */}
          {(error || (result && !Array.isArray(result))) && (
            <div className="max-w-4xl mx-auto mb-8">
              {error && (
                <div className="bg-red-100 text-red-700 rounded-lg px-4 py-3 mb-2 shadow text-center">{error}</div>
              )}
              {result && !Array.isArray(result) && (
                <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg px-8 py-8 shadow flex flex-col md:flex-row gap-8 items-start justify-start">
                  <div className="flex-1 flex flex-col gap-4 min-w-[340px] max-w-full">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">Hold Invoice générée !</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Bloc code secret + infos */}
                      <div className="bg-white border border-blue-200 rounded-lg p-6 flex-1 min-w-[320px] max-w-full">
                        <span className="font-semibold text-blue-900 block mb-2">Secret (à imprimer et coller sur le colis) :</span>
                        <button
                          className="mb-3 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow transition w-full md:w-auto"
                          onClick={() => {
                            const printContents = document.getElementById('printable-secret').outerHTML;
                            const win = window.open('', '', 'height=400,width=600');
                            win.document.write('<html><head><title>Imprimer le code secret</title>');
                            win.document.write('<style>body{font-family:sans-serif;padding:20px;background:#f8fafc;} .font-mono{font-family:monospace;} .text-lg{font-size:1.25rem;} .rounded{border-radius:0.5rem;} .bg-white{background:#fff;} .text-blue-800{color:#1e40af;} .font-bold{font-weight:bold;} .inline-block{display:inline-block;} .border{border:1px solid #bfdbfe;} .px-3{padding-left:0.75rem;padding-right:0.75rem;} .py-2{padding-top:0.5rem;padding-bottom:0.5rem;} .break-all{word-break:break-all;} </style>');
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
                          className="font-mono text-lg bg-white text-blue-800 rounded px-3 py-2 inline-block mt-2 border border-blue-200 w-full break-all"
                        >
                          {result.invoice?.secret}
                        </div>
                        {/* Affichage Payment Request, ID et Secret */}
                        <div className="mt-4 text-sm text-gray-700 break-all">
                          <div>
                            <span className="font-semibold text-blue-800">Payment Request :</span>
                            <div className="font-mono text-xs bg-gray-100 rounded px-2 py-1 mt-1">{result.invoice?.request || result.invoice?.payment_request}</div>
                          </div>
                          <div className="mt-2">
                            <span className="font-semibold text-blue-800">ID :</span>
                            <span className="font-mono text-xs ml-1">{result.invoice?.id}</span>
                          </div>
                          <div className="mt-2">
                            <span className="font-semibold text-blue-800">Secret :</span>
                            <span className="font-mono text-xs ml-1">{result.invoice?.secret}</span>
                          </div>
                        </div>
                      </div>
                      {/* Bloc QR code */}
                      <div className="flex flex-col items-center justify-center bg-white border border-blue-200 rounded-lg p-6 min-w-[220px]">
                        {result.invoice?.request || result.invoice?.payment_request ? (
                          <>
                            <div ref={qrCodeRef} className="p-2 bg-white">
                              <QRCode
                                value={getQrValue()}
                                size={140}
                                bgColor="#fff"
                                fgColor="#1e3a8a"
                                level="H"
                                includeMargin={true}
                              />
                            </div>
                            <div className="text-xs text-blue-800 mt-2 text-center">Scannez pour payer</div>
                            <div className="flex items-center gap-2 mt-4 border-t border-blue-100 pt-3 w-full justify-center">
                              <button onClick={exportQrCode} title="Copier l'image" className="p-2 rounded-full hover:bg-blue-100 text-blue-700 transition"><ClipboardDocumentIcon className="h-5 w-5" /></button>
                              <button onClick={downloadQrCode} title="Télécharger l'image" className="p-2 rounded-full hover:bg-blue-100 text-blue-700 transition"><ArrowDownTrayIcon className="h-5 w-5" /></button>
                              {navigator.share && <button onClick={shareQrCode} title="Partager" className="p-2 rounded-full hover:bg-blue-100 text-blue-700 transition"><ShareIcon className="h-5 w-5" /></button>}
                            </div>
                          </>
                        ) : null}
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Liste des factures */}
          <section ref={invoicesSectionRef} id="invoices-list" className="bg-white rounded-lg shadow p-6 border border-blue-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl font-bold text-blue-800 flex-shrink-0">Mes factures</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <input
                  type="date"
                  value={filterDate}
                  onChange={e => setFilterDate(e.target.value)}
                  className="border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full sm:w-auto"
                />
                <button
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-2 px-4 rounded shadow transition flex items-center justify-center disabled:opacity-50 w-full sm:w-auto"
                  onClick={getInvoices}
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Chargement...</span>
                    </>
                  ) : (
                    'Rafraîchir'
                  )}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-blue-800 uppercase bg-blue-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-l-lg">Description</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Montant</th>
                    <th scope="col" className="px-6 py-3 rounded-r-lg">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="bg-white border-b hover:bg-blue-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{invoice.description || <span className="text-gray-400">N/A</span>}</td>
                        <td className="px-6 py-4">
                          {invoice.timestamp ? (
                            new Date(invoice.timestamp).toLocaleString('fr-FR', {
                              day: '2-digit', month: '2-digit', year: 'numeric',
                              hour: '2-digit', minute: '2-digit'
                            })
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-semibold">{invoice.tokens} sats</td>
                        <td className="px-6 py-4">
                          {invoice.is_confirmed ? (
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Payée</span>
                          ) : invoice.is_held ? (
                            <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">En attente</span>
                          ) : (
                            <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Non payée</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">{filterDate ? 'Aucune facture pour cette date.' : 'Aucune facture trouvée.'}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default VendeurDashboard;