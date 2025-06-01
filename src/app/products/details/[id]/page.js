import Image from "next/image"
import Link from "next/link"
import AddToCartButton from "../../components/AddToCartButton"

export default async function Page({ params }) {
  const { id } = params

  const res = await fetch(`http://localhost:3000/api/product/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-blue-800 rounded-lg p-10 max-w-lg flex flex-col items-center">
          <h3 className="text-2xl font-bold text-center text-red-500">
            Error al cargar el producto ({res.status})
          </h3>
        </div>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Regresar a la página principal
        </Link>
      </div>
    )
  }

  const product = await res.json()

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-blue-800 rounded-lg p-10 max-w-lg flex flex-col items-center">
          <h3 className="text-2xl font-bold text-center">
            Producto no encontrado
          </h3>
          <p className="text-lg text-center">
            Lo sentimos, el producto que estás buscando no existe.
          </p>
        </div>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Regresar a la página principal
        </Link>
      </div>
    )
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
          <p className="text-lg text-center">Stock: {product.stock}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>
          <span className="text-sm text-gray-400 mt-2">
            Categoría: {product.category}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
