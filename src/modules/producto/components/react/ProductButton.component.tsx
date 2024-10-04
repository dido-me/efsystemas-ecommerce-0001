import { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { addCartItem, cartItems, removeCartItem } from '@src/store/cartStore'

export function ProductButton (param: {
  title: string,
  description: string,
  price: number,
  priceAfter?: number,
  handle: string,
  idProduct: string,
  imageProduct: string
}) {
  const $cartItems = useStore(cartItems)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const productInCart = hydrated && $cartItems[param.idProduct]
    ? JSON.parse($cartItems[param.idProduct] as string)
    : null

  const handleAddToCart = () => {
    addCartItem({ ...param, quantity: 1 })
  }

  const handleRemoveFromCart = () => {
    if (productInCart) {
      removeCartItem(param.idProduct)
    }
  }

  if (!hydrated) {
    return (<h1>Cargando...</h1>)
  }

  return (
    <>
      {productInCart
        ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleRemoveFromCart}
              className="bg-commerce-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-commerce-700 transition-colors"
            >
              -1
            </button>

            <span className="text-xl font-bold text-commerce-600 bg-commerce-100 px-4 py-2 rounded-md shadow-md">
              {productInCart.quantity}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-commerce-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-commerce-700 transition-colors"
            >
              +1
            </button>
          </div>

          )
        : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-commerce-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-commerce-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256">
              <path fill="currentColor" d="M233.21 56.31A12 12 0 0 0 224 52H66l-5.47-30.15A12 12 0 0 0 48.73 12H24a12 12 0 0 0 0 24h14.71l24.91 137a28 28 0 0 0 4.07 10.21A32 32 0 1 0 123 196h34a32 32 0 1 0 31-24H91.17a4 4 0 0 1-3.93-3.28L84.92 156H196.1a28 28 0 0 0 27.55-23l12.16-66.86a12 12 0 0 0-2.6-9.83M100 204a8 8 0 1 1-8-8a8 8 0 0 1 8 8m88 8a8 8 0 1 1 8-8a8 8 0 0 1-8 8m12-83.28a4 4 0 0 1-3.9 3.28H80.56L70.38 76h139.24Z" />
            </svg>
            <span>Agregar</span>
          </button>
          )
      }

    </>
  )
}
