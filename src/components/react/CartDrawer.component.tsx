import { useStore } from '@nanostores/react'
import { cartItems, isCartOpen, type Product } from '@src/store/cartStore'
import { Drawer } from 'flowbite-react'

export function CartDrawer () {
  const $isCartOpen = useStore(isCartOpen)
  const $cartItems = useStore(cartItems)
  const handleClose = () => isCartOpen.set(!$isCartOpen)

  const parsedCartItems = Object.keys($cartItems).reduce((acc, key) => {
    const value = $cartItems[key]
    try {
      acc[key] = typeof value === 'string' ? JSON.parse(value) : value
    } catch (error) {
      console.error(`Error parsing cart item with key ${key}:`, error)
      acc[key] = null
    }
    return acc
  }, {} as Record<string, Product | null>)

  return (
        <>
            <Drawer open={$isCartOpen} onClose={handleClose}>
                <Drawer.Header title="Mi carrito de compras" />
                <Drawer.Items>
                    {Object.keys(parsedCartItems).length > 0
                      ? (
                            <div className="grid grid-cols-1 gap-4">
                                {Object.keys(parsedCartItems).map(key => {
                                  const item = parsedCartItems[key]
                                  if (item) {
                                    return (
                                            <div key={item.idProduct} className="flex items-center space-x-4 p-4 border-b border-gray-200 dark:border-gray-700">
                                                <a href={`/product/${item.idProduct}/${item.handle}`}>
                                                    <img
                                                        src={item.imageProduct}
                                                        alt={item.title}
                                                        className="h-16 w-16 object-cover rounded"
                                                    />
                                                </a>
                                                <div className="flex-1">
                                                    <a href={`/product/${item.idProduct}/${item.handle}`}>
                                                        <h2 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h2>
                                                    </a>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.description.length > 200 ? `${item.description.substring(0, 50)}...` : item.description}</p>
                                                    <p className="text-xs text-gray-800 dark:text-gray-300">UND: &nbsp;${(item.price / 100).toFixed(2)}</p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-300">
                                                        {item.priceAfter && item.priceAfter > 0
                                                          ? (
                                                                <>
                                                                    <span className="line-through text-gray-500">${(item.price / 100).toFixed(2)}</span>
                                                                    &nbsp;<span className="text-cyan-600">${(item.priceAfter / 100).toFixed(2)}</span>
                                                                </>
                                                            )
                                                          : (
                                                                `$${(item.price * item.quantity / 100).toFixed(2)}`
                                                            )}
                                                    </p>

                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Cantidad: {item.quantity}</p>
                                                </div>
                                            </div>
                                    )
                                  }
                                  return null
                                })}
                            </div>
                        )
                      : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Tu carrito está vacío.
                            </p>
                        )}
                    <div className="mt-6 flex justify-end">
                        <a
                            href="/cart"
                            className="btn inline-flex items-center gap-x-2 bg-commerce-500 text-white border-gray-800 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-commerce-700 hover:border-gray-900 active:bg-gray-900 active:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 px-5 py-2 rounded-lg transition-all duration-300"
                        >
                            Realizar Pedido
                        </a>
                    </div>
                </Drawer.Items>
            </Drawer>
        </>
  )
}
