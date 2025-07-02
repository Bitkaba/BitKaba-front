import React, { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Fonctionnalités', href: '#features' },
  { name: 'Sécurité', href: '#security' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center px-6 py-4 lg:px-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500/20 rounded-full p-2 shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#fff" />
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#34d399"
              />
            </svg>
          </div>
          <a
            href="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg"
          >
            BitKaba
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex flex-1 justify-evenly">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-base font-semibold text-slate-200 px-2 py-1 transition group"
            >
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-300 group-hover:w-full"></span>
              <span className="relative z-10 group-hover:text-emerald-400">{item.name}</span>
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden ml-auto">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="inline-flex items-center justify-center p-2.5 text-slate-200 hover:bg-emerald-500/20 rounded-md transition"
          >
            <Bars3Icon aria-hidden="true" className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-slate-900 p-6 shadow-2xl transition-transform duration-300 ease-out">
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent tracking-tight">
              BitKaba
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Fermer le menu"
              className="text-slate-200 hover:bg-emerald-500/20 rounded-md p-1 transition"
            >
              <XMarkIcon aria-hidden="true" className="h-7 w-7" />
            </button>
          </div>
          <div className="space-y-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-lg font-semibold text-slate-100 rounded-md px-4 py-2 hover:bg-emerald-500/20 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
