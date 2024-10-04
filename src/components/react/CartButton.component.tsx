import { useStore } from '@nanostores/react'
import { isCartOpen, cartItems } from '@src/store/cartStore'
import { useEffect, useState } from 'react'

export function CartButton () {
  const $isCartOpen = useStore(isCartOpen)
  const $cartItems = useStore(cartItems)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const cartCount = hydrated ? Object.values($cartItems).length : 0

  return (
    <button
      onClick={() => isCartOpen.set(!$isCartOpen)}
      title="Ir a la página carrito de compra"
      aria-label="Ir a la página carrito de compra"
      className="flex items-center md:w-auto justify-center md:px-4 md:py-2 hover:bg-brand-gray/5 md:rounded-2xl border border-transparent hover:border-brand-gray/10 transition-all min-h-[50px] md:text-base px-0 py-4 text-xl duration-300 w-full hover:bg-gray-600/10 cursor-pointer relative"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256"><path fill="currentColor" d="M233.21 56.31A12 12 0 0 0 224 52H66l-5.47-30.15A12 12 0 0 0 48.73 12H24a12 12 0 0 0 0 24h14.71l24.91 137a28 28 0 0 0 4.07 10.21A32 32 0 1 0 123 196h34a32 32 0 1 0 31-24H91.17a4 4 0 0 1-3.93-3.28L84.92 156H196.1a28 28 0 0 0 27.55-23l12.16-66.86a12 12 0 0 0-2.6-9.83M100 204a8 8 0 1 1-8-8a8 8 0 0 1 8 8m88 8a8 8 0 1 1 8-8a8 8 0 0 1-8 8m12-83.28a4 4 0 0 1-3.9 3.28H80.56L70.38 76h139.24Z" /></svg>
      <span className="absolute top-0 right-0 mt-0 md:mt-1 bg-commerce-600 text-white font-bold rounded-full px-2 py-0 md:px-2 md:py-1 text-xs">
        {cartCount}
      </span>
    </button>
  )
}
