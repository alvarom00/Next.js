"use client";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();

    return (
        <>
            <p className="mt-4 text-lg max-w-lg">Modo administrador</p>

            <button className="mt-4 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.back()}>Volver</button>
        </>
    )
}