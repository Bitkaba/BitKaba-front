import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Paiement sécurisé',
    description: "Les fonds sont conservés jusqu'à confirmation de livraison via un code secret inscrit sur le colis.",
  },
  {
    title: 'QR Code intelligent',
    description: "Chaque transaction génère un QR code contenant les détails et le mot-clé secret à vérifier.",
  },
  {
    title: 'Protection du vendeur',
    description: "Les fonds sont débloqués uniquement si le bon mot-clé est entré, garantissant une livraison authentifiée.",
  },
  {
    title: 'Lightning rapide',
    description: "Grâce au réseau Lightning, les paiements sont quasi-instantanés, à très faibles frais.",
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6 sm:px-12 lg:px-20 bg-slate-950/40 rounded-3xl">
      {/* Décoration arrière plan */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800/10 to-transparent opacity-25"></div>

      {/* Titre animé */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent drop-shadow-md"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Fonctionnalités
      </motion.h2>

      {/* Cartes animées */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-slate-800/50 backdrop-blur rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition duration-300 border border-slate-700 hover:border-emerald-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-2">{feature.title}</h3>
            <p className="text-slate-300 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
