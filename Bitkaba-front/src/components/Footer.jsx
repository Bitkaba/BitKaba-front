import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-slate-950/50 py-10 mt-24 sm:mt-32 md:mt-40 text-slate-300">
      <motion.div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Colonne 1 : Logo + Nom */}
        <div>
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-3">
            BitKaba
          </h3>
          <p className="text-sm text-slate-400">Sécurisez vos paiements grâce au réseau Lightning.</p>
        </div>

        {/* Colonne 2 : Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-400 mb-2">Navigation</h4>
          <ul className="space-y-1 text-slate-400 text-sm">
            <li><a href="#features" className="hover:text-emerald-300 transition">Fonctionnalités</a></li>
            <li><a href="#security" className="hover:text-emerald-300 transition">Sécurité</a></li>
            <li><a href="#faq" className="hover:text-emerald-300 transition">FAQ</a></li>
            <li><a href="#contact" className="hover:text-emerald-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Colonne 3 : Ressources */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-400 mb-2">Ressources</h4>
          <ul className="space-y-1 text-slate-400 text-sm">
            <li><a href="https://lightning.network" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition">Lightning Network</a></li>
            <li><a href="https://lnbits.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition">LNBits</a></li>
            <li><a href="https://bitcoin.org" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition">Bitcoin.org</a></li>
          </ul>
        </div>

        {/* Colonne 4 : Contact rapide */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-400 mb-2">Nous contacter</h4>
          <p className="text-sm text-slate-400 mb-1">bitkaba@contact.bj</p>
          <p className="text-sm text-slate-400">(+229) 97 00 00 00</p>
        </div>
      </motion.div>

      {/* Bas du footer */}
      <div className="text-center text-sm text-slate-400 mt-10 border-t border-slate-800 pt-6">
        © {new Date().getFullYear()} BitKaba. Tous droits réservés.
      </div>
    </footer>
  )
}
