export default function Features() {
  return (
    <section id="features" className="mt-32 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Fonctionnalités</h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="p-6 bg-white/5 rounded-lg shadow transition duration-200 hover:bg-fuchsia-800/40 hover:scale-105 hover:shadow-xl cursor-pointer">
          <h3 className="text-xl font-semibold text-white">Paiement sécurisé</h3>
          <p className="mt-2 text-fuchsia-200">Les fonds sont conservés jusqu'à confirmation de livraison via un code secret inscrit sur le colis.</p>
        </div>
        <div className="p-6 bg-white/5 rounded-lg shadow transition duration-200 hover:bg-fuchsia-800/40 hover:scale-105 hover:shadow-xl cursor-pointer">
          <h3 className="text-xl font-semibold text-white">QR Code intelligent</h3>
          <p className="mt-2 text-fuchsia-200">Chaque transaction génère un QR code contenant les détails et le mot-clé secret à vérifier.</p>
        </div>
        <div className="p-6 bg-white/5 rounded-lg shadow transition duration-200 hover:bg-fuchsia-800/40 hover:scale-105 hover:shadow-xl cursor-pointer">
          <h3 className="text-xl font-semibold text-white">Protection du vendeur</h3>
          <p className="mt-2 text-fuchsia-200">Les fonds sont débloqués uniquement si le bon mot-clé est entré, garantissant une livraison authentifiée.</p>
        </div>
        <div className="p-6 bg-white/5 rounded-lg shadow transition duration-200 hover:bg-fuchsia-800/40 hover:scale-105 hover:shadow-xl cursor-pointer">
          <h3 className="text-xl font-semibold text-white">Lightning rapide</h3>
          <p className="mt-2 text-fuchsia-200">Grâce au réseau Lightning, les paiements sont quasi-instantanés, à très faibles frais.</p>
        </div>
      </div>
    </section>
  )
}