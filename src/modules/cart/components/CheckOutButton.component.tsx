import { useStore } from '@nanostores/react'
import { numberContact } from '@src/consts/numberContact'
import { cartItems, type Product } from '@src/store/cartStore'
import { useState, useEffect } from 'react'

export default function CheckOutButton () {
  const $cartItems = useStore(cartItems)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const parsedCartItems = Object.keys($cartItems || {}).reduce((acc, key) => {
    const value = $cartItems[key]
    try {
      acc[key] = typeof value === 'string' ? JSON.parse(value) : value
    } catch (error) {
      console.error(`Error parsing cart item with key ${key}:`, error)
      acc[key] = null
    }
    return acc
  }, {} as Record<string, Product | null>)

  const total = Object.keys(parsedCartItems).reduce((acc, key) => {
    const item = parsedCartItems[key]
    if (item && item.price && item.quantity) {
      acc += item.price * item.quantity
    }
    return acc
  }, 0)

  const handleCheckout = () => {
    const domain = window.location.origin

    const productDetails = Object.keys(parsedCartItems)
      .map(key => {
        const item = parsedCartItems[key]
        if (item) {
          const productLink = `${domain}/product/${item.idProduct}/${item.handle}`
          return `${item.title} (ID: ${item.idProduct}), Cantidad: ${item.quantity}, Precio: ${(item.price / 100).toFixed(2)}\nLink: ${productLink}`
        }
        return null
      })
      .filter(Boolean)
      .join('\n\n')

    const message = `Estoy interesado en los siguientes productos:\n${productDetails}\n\nTotal: ${(total / 100).toFixed(2)}`

    const whatsappURL = `https://api.whatsapp.com/send?phone=51${numberContact}&text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }
  if (!hydrated || !$cartItems || Object.keys($cartItems).length === 0) {
    return (
      <div>
        <button
          className="btn flex justify-between bg-commerce-600 text-white border-commerce-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-commerce-700 hover:border-commerce-700 active:bg-commerce-700 active:border-commerce-700 focus:outline-none focus:ring-4 focus:ring-commerce-300 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
          type="button"
          disabled
        >
          Realizar Pedido &nbsp;
          <span className="font-bold">{(total / 100).toFixed(2)}</span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleCheckout}
      className="btn flex justify-between bg-commerce-600 text-white border-commerce-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-commerce-700 hover:border-commerce-700 active:bg-commerce-700 active:border-commerce-700 focus:outline-none focus:ring-4 focus:ring-commerce-300 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
      type="button"
    >
      Relizar Pedido
      <span className="font-bold">{(total / 100).toFixed(2)}</span>
    </button>
  )
}
