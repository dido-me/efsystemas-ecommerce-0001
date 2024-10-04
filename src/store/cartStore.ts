import { persistentMap } from '@nanostores/persistent'
import { atom } from 'nanostores'

export type Product = {
  title: string;
  description: string;
  price: number;
  priceAfter?: number;
  handle: string;
  idProduct: string;
  imageProduct: string;
  quantity: number;
};

export const isCartOpen = atom(false)
export const cartItems = persistentMap<Record<string, string|undefined>>('cart', {})

export function addCartItem (product: Product) {
  const existingEntry = cartItems.get()[product.idProduct]

  const updatedProduct = existingEntry
    ? {
        ...JSON.parse(existingEntry),
        quantity: JSON.parse(existingEntry).quantity + product.quantity
      }
    : product

  cartItems.setKey(product.idProduct, JSON.stringify(updatedProduct))
}

export function removeCartItem (productId: string) {
  const existingEntry = cartItems.get()[productId]

  if (!existingEntry) return

  const parsedProduct = JSON.parse(existingEntry)

  if (parsedProduct.quantity > 1) {
    const updatedProduct = {
      ...parsedProduct,
      quantity: parsedProduct.quantity - 1
    }
    cartItems.setKey(productId, JSON.stringify(updatedProduct))
  } else {
    cartItems.setKey(productId, undefined)
  }
}

export function deleteCartItem (productId: string) {
  const existingEntry = cartItems.get()[productId]

  if (!existingEntry) return

  cartItems.setKey(productId, undefined)
}

export function getTotalPrice () {
  return Object.values(cartItems.get())
    .filter(Boolean)
    .reduce((total, item) => {
      const parsedProduct: Product = JSON.parse(item as string)
      return total + parsedProduct.price * parsedProduct.quantity
    }, 0)
}
