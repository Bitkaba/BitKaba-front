import './App.css'
import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Security from './components/Security'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-100">
      <Header />
      <main className="relative isolate px-6 pt-36 sm:pt-48 lg:px-12">
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          <Hero />
          <Features />
          <Security />
          <Faq />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}