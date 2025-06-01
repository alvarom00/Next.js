'use client'

import { useCartContext } from '@/context/CartContext'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/Spinner/Spinner'

export default function CartContent() {
    const { cart, removeFromCart } = useCartContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1200)
        return () => clearTimeout(timeout)
    }, [])

    const calculateTotal = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)

    if (loading) return <Spinner />

    if (cart.length === 0)
        return <p className="text-lg">Tu carrito está vacío.</p>

    return (
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
                                                onClick={() => removeFromCart(item.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                                Eliminar
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
    )
}
