"use client"
import { useCartContext } from "@/context/CartContext"
import { useState } from "react"

export default function AddToCartButton({ product }) {
    const { addToCart } = useCartContext()
    const [loading, setLoading] = useState(false)

    const handleAddToCart = async () => {
        if (loading) return

        setLoading(true)

        setTimeout(() => {
            addToCart(product)
            setLoading(false)
        }, 1000)
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading}
            className={`mt-4 px-4 py-2 rounded text-white hover:cursor-pointer ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
            }`}
        >
            {loading ? "Agregando..." : "Agregar al carrito"}
        </button>
    )
}
