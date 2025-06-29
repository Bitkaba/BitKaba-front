import React from 'react';
export default function Hero() {
  
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
        Sécurisez vos paiements en Bitcoin Lightning
      </h1>
      <p className="mt-6 text-lg leading-8 text-fuchsia-200">
        BitKaba est une solution de paiement locale basée sur le réseau Bitcoin Lightning qui protège acheteurs et vendeurs en assurant que les fonds ne sont transférés qu'une fois la commande livrée.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <a
          href="/choix"
          className="rounded-md bg-fuchsia-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-fuchsia-500"
        >
          Commencer
        </a>
        <a href="#features" className="text-base font-semibold text-white hover:underline">
          En savoir plus →
        </a>
      </div>
    </div>
  )
}