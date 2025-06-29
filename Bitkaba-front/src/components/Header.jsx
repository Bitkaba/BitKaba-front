import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
const navigation = [
  { name: 'Fonctionnalités', href: '#features' },
  { name: 'Sécurité', href: '#security' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex lg:flex-1">
          <a href="#" className="text-2xl font-bold text-white">
            BitKaba
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center p-2.5 text-white"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-base font-medium hover:text-fuchsia-300">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-base font-semibold hover:text-fuchsia-300">
            Connexion →
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/70" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-indigo-950 p-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">BitKaba</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 divide-y divide-gray-700">
            <div className="space-y-4 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-4 py-2 text-base font-medium text-white hover:bg-fuchsia-700"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <a
                href="#"
                className="block rounded-md px-4 py-2 text-base font-medium text-white hover:bg-fuchsia-700"
              >
                Connexion
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}