
import Link from "next/link";
import Image from "next/image";

export function ProductCard({ product }) {
  return (
    <div className="bg-slate-600 text-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <h4 className="text-xl font-semibold mt-2">{product.name}</h4>
      <Image
        src={product.image}
        alt={product.name}
        width={128}
        height={128}
        className="w-32 h-32 object-contain mt-2 rounded"
      />
      <p className="small">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>

      <span className="text-sm text-gray-400 mt-2">
        Categoria: {product.category}
      </span>

      <Link
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        href={`/products/details/${product.slug}`}
      >
        Ver detalles
      </Link>
    </div>
  );
}
