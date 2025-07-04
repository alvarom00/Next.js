"use client"

import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminLayout({ children, login }) {
  const { user, logout } = useAuthContext()

  return (
    <>
      {user.isAuthenticated ? (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Admin</h1>
            <div className="flex justify-between items-center mb-4">
              <Link className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' href="/admin">
                Volver al panel de administración
              </Link>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800" onClick={logout} title= "Logout">
                Cerrar sesión
              </button>
            </div>  
          </div>
          {children}
        </div>
      ) : (
        <div className="flex items-center justify-center">{login}</div>
      )}
    </>
  );
}
