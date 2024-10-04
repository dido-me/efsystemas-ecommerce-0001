import { addCartItem, removeCartItem, deleteCartItem, type Product } from '@src/store/cartStore'

export function ItemProduct (parm: Product) {
  const handleAddToCart = () => {
    addCartItem({ ...parm, quantity: 1 })
  }

  const handleRemoveFromCart = () => {
    removeCartItem(parm.idProduct)
  }

  const handleDeleteFromCart = () => {
    deleteCartItem(parm.idProduct)
  }

  return (
    <li className="py-4 border-t border-gray-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        {/* Sección de Información del Producto */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-2/3">
          <img
            src={parm.imageProduct}
            alt="Ecommerce"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-md drop-shadow-gift"
          />
          <div className="flex flex-col gap-2">
            <a href={`/product/${parm.idProduct}/${parm.handle}`} className="text-inherit">
              <h6 className="font-semibold text-lg sm:text-xl text-commerce-950">
                {parm.title}
              </h6>
            </a>
            <span className="text-commerce-600">${(parm.price / 100).toFixed(2)}</span>

            <button
              onClick={handleDeleteFromCart}
              className="text-red-500 flex items-center gap-1 hover:text-red-700 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trash"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0"></path>
                <path d="M10 11l0 6"></path>
                <path d="M14 11l0 6"></path>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
              <span>Remove</span>
            </button>
          </div>
        </div>

        {/* Sección del Contador */}
        <div className="w-full sm:w-1/3 lg:w-1/6 flex justify-between sm:justify-center">
          <div className="input-group input-spinner flex justify-between items-center gap-2 rounded-lg">
            <button
              onClick={handleRemoveFromCart}
              className={`bg-commerce-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-commerce-700 transition-colors ${parm.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={parm.quantity === 1}
            >
              -1
            </button>

            <span className="text-lg font-bold text-commerce-600 bg-commerce-100 px-4 py-2 rounded-md shadow-md">
              {parm.quantity}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-commerce-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-commerce-700 transition-colors"
            >
              +1
            </button>
          </div>
        </div>

        {/* Sección del Total */}
        <div className="w-full sm:w-1/5 text-right mt-2 sm:mt-0">
          <span className="font-bold text-gray-800">${((parm.price * parm.quantity) / 100).toFixed(2)}</span>
        </div>
      </div>
    </li>
  )
}
