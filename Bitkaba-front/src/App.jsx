import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Security from './components/Security'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-fuchsia-700 to-indigo-900 min-h-screen text-white">
      <Header />
      <main className="relative isolate px-6 pt-36 sm:pt-48 lg:px-12">
        <Hero />
        <Features />
        <Security />
        <Faq />
        <Footer />
      </main>
    </div>
  )
}