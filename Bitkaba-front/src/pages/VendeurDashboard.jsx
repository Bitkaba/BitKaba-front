import React from 'react';

export default function VendorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-600 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold mb-6">Bienvenue Vendeur !</h1>
      <p className="mb-8 max-w-xl text-center text-lg">
        Gérez vos commandes, générez des factures avec QR codes sécurisés et suivez vos ventes en temps réel.
      </p>
      <button className="bg-white text-pink-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
        Créer une facture
      </button>
    </div>
  );
}
