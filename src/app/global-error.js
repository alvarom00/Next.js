"use client"

import { useEffect } from "react"

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error("Error occurred:", error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-red-600">Algo salió mal</h1>
            <p className="mt-4 text-gray-700">
                {error.message || "Ocurrió un error inesperado."}
            </p>
            <button onClick={() => reset()} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Volver a intentar
            </button>
        </div>
    )
}