import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const faqs = [
  {
    question: "Comment fonctionne le code secret ?",
    answer: "Un mot-clé unique est caché dans le QR code et aussi écrit sur le colis. Il doit être entré sur la plateforme pour libérer les fonds.",
  },
  {
    question: "Dois-je avoir un wallet Lightning ?",
    answer: "Oui, l'utilisateur doit disposer d’un portefeuille compatible Lightning pour effectuer les paiements.",
  },
  {
    question: "Et si le colis n’est pas livré ?",
    answer: "Les fonds restent bloqués jusqu’à la confirmation manuelle par le client. Aucun paiement automatique n’est effectué sans validation.",
  },
]

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 sm:px-12">
      <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 drop-shadow-md mb-10">
        FAQ
      </h2>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800/60 rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-slate-100 text-left focus:outline-none"
            >
              <span className="text-lg font-semibold ">{item.question}</span>
              <ChevronDownIcon
                className={`h-6 w-6 text-emerald-400 transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-slate-300"
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
