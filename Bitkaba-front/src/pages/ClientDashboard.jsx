import React, { useState } from 'react';

const mockOrders = [
  {
    id: 'CMD001',
    item: 'Smartphone',
    status: 'En attente de livraison',
    codeSecret: 'ABC123',
    paymentStatus: 'En attente',
    orderDate: '2024-06-01',
    deliveryAddress: '12 rue de Paris, 75001 Paris',
    price: '499€',
    carrier: 'DHL',
  },
  {
    id: 'CMD002',
    item: 'Casque audio',
    status: 'Livré',
    codeSecret: 'XYZ789',
    paymentStatus: 'Payé',
    orderDate: '2024-05-28',
    deliveryAddress: '34 avenue Victor Hugo, 69006 Lyon',
    price: '89€',
    carrier: 'La Poste',
  },
];

export default function ClientDashboard() {
  const [orders, setOrders] = useState(mockOrders);
  const [inputCode, setInputCode] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [message, setMessage] = useState('');

  const handleConfirmDelivery = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    if (inputCode === order.codeSecret) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { ...o, status: 'Livré', paymentStatus: 'Payé' }
            : o
        )
      );
      setMessage('Livraison confirmée et paiement débloqué !');
    } else {
      setMessage('Code secret incorrect, veuillez réessayer.');
    }
    setInputCode('');
    setSelectedOrderId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-8">
      <h2 className="text-4xl font-bold mb-8">Mes commandes</h2>
      {orders.length === 0 && <p>Aucune commande pour le moment.</p>}

      <ul className="space-y-6">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-white rounded-lg p-6 shadow-lg text-black"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">{order.item}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === 'Livré'
                    ? 'bg-green-600 text-green-100'
                    : 'bg-yellow-500 text-yellow-100'
                }`}
              >
                {order.status}
              </span>
            </div>
            <p>Commande ID: {order.id}</p>
            <p>Date de commande: {order.orderDate}</p>
            <p>Adresse de livraison: {order.deliveryAddress}</p>
            <p>Transporteur: {order.carrier}</p>
            <p>Prix: {order.price}</p>
            <p>Statut paiement: {order.paymentStatus}</p>

            {order.status !== 'Livré' && (
              <>
                {selectedOrderId === order.id ? (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Entrez le code secret"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="px-3 py-2 rounded text-black"
                    />
                    <button
                      onClick={() => handleConfirmDelivery(order.id)}
                      className="ml-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
                    >
                      Confirmer la livraison
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedOrderId(order.id)}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded font-semibold"
                  >
                    Confirmer réception
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      {message && (
        <p className="mt-8 text-center text-lg font-semibold">{message}</p>
      )}
    </div>
  );
}
