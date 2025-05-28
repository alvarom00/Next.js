'use client';

import Link from "next/link";
import Image from "next/image";

export default function DetailPage({ product }) {
  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = storedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert(`${product.name} agregado al carrito.`);
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-blue-800 rounded-lg p-10 max-w-lg flex flex-col items-center">
          <div className="text-2xl font-bold text-center">
            <h3 className="text-2xl font-bold text-center">
              Producto no encontrado
            </h3>
            <p className="text-lg text-center">
              Lo sentimos, el producto que estás buscando no existe.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Regresar a la página principal
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-blue-800 rounded-lg p-10 max-w-lg flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <h3 className="text-2xl font-bold text-center">{product.name}</h3>
          <Image
            src={product.image}
            alt={product.name}
            width={128}
            height={128}
            className="w-48 h-48 object-contain rounded-lg"
          />
          <p className="text-lg text-center">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>
          <span className="text-sm text-gray-400 mt-2">
            Categoría: {product.category}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
