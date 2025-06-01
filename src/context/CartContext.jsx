"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { db } from "@/firebase/config"
import { runTransaction } from "firebase/firestore"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore"
import { DATABASES } from "@/firebase/databases"

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const fetchCart = async () => {
    const snapshot = await getDocs(collection(db, "cart"))
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setCart(items)
  };

  const addToCart = async (product) => {
    const productRef = doc(db, DATABASES.PRODUCTS, product.id)
    const cartRef = doc(db, "cart", product.id)

    try {
      await runTransaction(db, async (transaction) => {
        const productSnapshot = await transaction.get(productRef)

        if (!productSnapshot.exists()) {
          throw new Error("El producto no existe en la base de datos.")
        }

        const productData = productSnapshot.data()

        if (productData.stock <= 0) {
          throw new Error("No hay suficiente stock disponible.")
        }

        const cartSnapshot = await transaction.get(cartRef)
        let newQuantity = 1

        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data()

          if (typeof cartData.quantity !== "number") {
            throw new Error("La cantidad en el carrito es inválida.")
          }

          newQuantity = cartData.quantity + 1
        }

        if (productData.stock - 1 < 0) {
          throw new Error(
            "El stock no es suficiente para agregar este producto al carrito."
          )
        }

        transaction.update(productRef, {
          stock: productData.stock - 1,
        })

        transaction.set(
          cartRef,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: newQuantity,
          },
          { merge: true }
        )
      })

      console.log("Producto agregado al carrito correctamente.")
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message)
      alert(`Error: ${error.message}`)
    }
  }

  const removeFromCart = async (id) => {
    const item = cart.find((i) => i.id === id)
    if (!item) return

    setCart((prevCart) => prevCart.filter((i) => i.id !== id))

    try {
      const productRef = doc(db, DATABASES.PRODUCTS, item.productId)
      const productSnapshot = await getDoc(productRef)

      if (productSnapshot.exists()) {
        const productData = productSnapshot.data()
        await updateDoc(productRef, {
          stock: productData.stock + item.quantity,
        });
      }

      const ref = doc(db, "cart", id)
      await deleteDoc(ref)
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error)
      alert("Ocurrió un error al eliminar el producto.")
    }
  };

  useEffect(() => {
    fetchCart()
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
