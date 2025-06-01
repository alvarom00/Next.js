"use client"
import { useCartContext } from "@/context/CartContext"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/Spinner/Spinner"

export default function CartPage() {
  const { cart, removeFromCart } = useCartContext()
  const [loadingId, setLoadingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timeout)
  }, [])

  const [globalLoading, setGlobalLoading] = useState(false)

  const handleRemove = async (id) => {
    if (globalLoading) return // Bloquea todas las interacciones mientras se elimina

    setGlobalLoading(true) // Bloquea interacciones
    await removeFromCart(id)
    setGlobalLoading(false) // Permite interacciones nuevamente
  }

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    )
  }

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
                  onClick={() => handleRemove(item.id)}
                  disabled={loadingId === item.id}
                  className={`px-4 py-2 rounded text-white ${
                    loadingId === item.id
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-500"
                  }`}
                >
                  {loadingId === item.id ? "Eliminando..." : "Eliminar"}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Total: ${calculateTotal()}</h2>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
