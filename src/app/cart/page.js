'use client';

import { useState, useEffect } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="bg-gray-800 p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-400">
                    Cantidad: {item.quantity} | Precio: ${item.price}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="text-2xl font-bold">
              Total: ${calculateTotal()}
            </h2>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}