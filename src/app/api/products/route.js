import { db } from "@/firebase/config"
import { DATABASES } from "@/firebase/databases"
import { NextResponse } from "next/server"
import { setDoc } from "firebase/firestore"
import { doc } from "firebase/firestore"

export async function POST(request) {
  const body = await request.json()

  const { name, slug, description, price, stock, image, category } = body

  if (!name || !slug || !description) {
    return NextResponse.json(
        {
            error: "Por favor, completa todos los campos obligatorios."
        },
        { status: 400 }
    )
  }

  if (price <= 0 || stock <= 0) {
    return NextResponse.json(
        {
            error: "El precio y el stock deben ser mayores a cero."
        },
        { status: 400 }
    )
  }

  if (
  image &&
  !/^(https?:\/\/.*\.(png|jpg|jpeg|gif))(?:\?.*)?$/i.test(image)
) {
    return NextResponse.json(
        {
            error: "Por favor, ingresa una URL de imagen válida."
        },
        { status: 400 }
    )
  }

  const product = {
        name,
        slug,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        image: image || ""
    }

  try {
    const docRef = doc(db, DATABASES.PRODUCTS, slug)

    await setDoc(docRef, product)

    return NextResponse.json(
        {
            message: "Producto creado exitosamente.", product: { id: product.slug, ...product }
        },
        { status: 201 }
    )
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
        {
            error: "Error al crear el producto. Por favor, inténtalo de nuevo más tarde."
        },
        { status: 500}
    )
  }
}
