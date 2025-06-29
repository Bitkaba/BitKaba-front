import React from 'react';
export default function Faq() {
  return (
    <section id="faq" className="mt-32 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center">FAQ</h2>
      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Comment fonctionne le code secret ?</h3>
          <p className="mt-2 text-fuchsia-200">Un mot-clé unique est caché dans le QR code et aussi écrit sur le colis. Il doit être entré sur la plateforme pour libérer les fonds.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Dois-je avoir un wallet Lightning ?</h3>
          <p className="mt-2 text-fuchsia-200">Oui, l'utilisateur doit disposer d’un portefeuille compatible Lightning pour effectuer les paiements.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Et si le colis n’est pas livré ?</h3>
          <p className="mt-2 text-fuchsia-200">Les fonds restent bloqués jusqu’à la confirmation manuelle par le client. Aucun paiement automatique n’est effectué sans validation.</p>
        </div>
      </div>
    </section>
  )
}