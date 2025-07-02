import React from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  // Crée un effet de parallaxe : le texte monte de 50px quand on scrolle les 20% du haut de la page.
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden p-4">
      {/* Image de fond et superposition */}
      <div className="absolute inset-0 -z-10">
        <img
          src="public/images/image3.jpg"
          alt="Circuit électronique en arrière-plan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      </div>

      {/* Contenu animé */}
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ y }}
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
          Sécurisez vos paiements
          <br className="hidden sm:inline" /> en Bitcoin Lightning
        </h1>

        <p className="mt-6 text-lg sm:text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
          BitKaba protège les acheteurs et vendeurs en garantissant que les fonds ne sont transférés qu'après réception de la commande.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <a
            href="/choix"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 text-base font-semibold text-white shadow-xl hover:from-emerald-600 hover:to-green-700 transition duration-300"
          >
            Commencer
          </a>
          <a
            href="#features"
            className="text-base font-semibold text-slate-300 hover:text-emerald-400 transition"
          >
            En savoir plus →
          </a>
        </div>
      </motion.div>
    </section>
  )
}
