import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'

export default function Security() {
  return (
    <section
      id="security"
      className="relative py-24 px-6 sm:px-12 lg:px-20 overflow-hidden rounded-3xl"
    >
      {/* Image de fond et superposition */}
      <div className="absolute inset-0 -z-10">
        <img
          src="public/images/image3.jpg"
          alt="Circuit électronique en arrière-plan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-500/10 p-4 rounded-full">
            <ShieldCheckIcon className="h-10 w-10 text-emerald-400" />
          </div>
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent drop-shadow-md">
          Sécurité
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-slate-300">
          BitKaba repose sur des mécanismes de double validation. Le vendeur ne reçoit les fonds qu'après vérification du code secret par l'acheteur.
          Toutes les communications sont chiffrées, et les paiements sont inviolables grâce au protocole Lightning.
        </p>
      </motion.div>
    </section>
  )
}
