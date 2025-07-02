import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({ email: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici tu peux intégrer un service comme EmailJS ou une API backend
    alert('Message envoyé !')
    setFormData({ email: '', message: '' })
  }

  return (
    <section id="contact" className="px-6 sm:px-12 lg:px-20 py-20 bg-slate-950/40 rounded-3xl">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-6">
          Contact
        </h2>
        <p className="text-slate-300 mb-10">Une question, une suggestion, un partenariat ? Envoyez-nous un message.</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Adresse email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="vous@exemple.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-slate-800/70 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Votre message</label>
            <textarea
              name="message"
              id="message"
              required
              placeholder="Décrivez votre demande ici..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-slate-800/70 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 px-8 py-3 rounded-full font-semibold text-white shadow-lg transition"
            >
              Envoyer le message
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
