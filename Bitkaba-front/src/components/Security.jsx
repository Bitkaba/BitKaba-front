import React from 'react';
export default function Security() {
  return (
    <section id="security" className="mt-32 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold">Sécurité</h2>
      <p className="mt-6 text-lg text-fuchsia-200">
        BitKaba repose sur des mécanismes de double validation. Le vendeur ne reçoit les fonds qu'après vérification du code secret par l'acheteur. Toutes les communications sont chiffrées, et les paiements sont inviolables grâce au protocole Lightning.
      </p>
    </section>
  )
}