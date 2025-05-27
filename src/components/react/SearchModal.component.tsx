import { Modal } from 'flowbite-react'
import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types'
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
  useSearchBox
} from 'react-instantsearch'
import { useState } from 'react'
import { indexName, searchClient } from '@src/algolia/config'

type HitProps = {
  hit: AlgoliaHit<{
    objectID: string
    documentId: string
    nombre: string
    slug: string
    precio: number
    stock: number
    sku: string
    categorias: Array<{
      nombre: string
      slug: string
    }>
    marca: {
      nombre: string
      slug: string
    }
    imagenes: Array<{
      url: string
      formats?: {
        thumbnail?: { url: string }
        small?: { url: string }
        medium?: { url: string }
      }
    }>
  }>
}

function Hit ({ hit }: HitProps) {
  // Get the best image URL available
  const getImageUrl = () => {
    if (!hit.imagenes || hit.imagenes.length === 0) {
      return '/placeholder-product.jpg'
    }

    const image = hit.imagenes[0]
    if (image.formats?.thumbnail?.url) {
      return image.formats.thumbnail.url
    }
    if (image.formats?.small?.url) {
      return image.formats.small.url
    }
    return image.url || '/placeholder-product.jpg'
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price)
  }

  // Get brand name
  const getBrandName = () => {
    return hit.marca?.nombre || 'Sin marca'
  }

  return (
    <article className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <a
        href={`/product/${hit.documentId}/${hit.slug}`}
        className="w-16 h-16 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src={getImageUrl()}
          alt={hit.nombre}
          loading="lazy"
        />
      </a>

      <div className="flex-1 min-w-0">
        <a
          href={`/product/${hit.documentId}/${hit.slug}`}
          className="block hover:text-blue-600 transition-colors"
        >
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            <Highlight hit={hit} attribute="nombre" />
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-medium text-green-600">
              {formatPrice(hit.precio)}
            </span>
            <span className="text-xs text-gray-500">
              {getBrandName()}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            SKU: {hit.sku}
          </p>
        </a>
      </div>
    </article>
  )
}

const DynamicConfigure = () => {
  const { query } = useSearchBox()
  return <Configure hitsPerPage={query ? 8 : 5} />
}

export const ModalSearch = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Buscar productos"
        aria-label="Buscar productos"
        className="flex items-center md:w-auto justify-center gap-2 md:px-4 md:py-2 hover:bg-brand-gray/5 md:rounded-2xl border border-transparent hover:border-brand-gray/10 transition-all min-h-[50px] md:text-base px-5 py-4 text-xl duration-300 w-full hover:bg-gray-600/10 cursor-pointer relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M11 8a3 3 0 0 0-3 3m12 9l-3-3" />
          </g>
        </svg>
      </button>

      <Modal show={isOpen} onClose={() => setIsOpen(false)} size="2xl">
        <Modal.Header className="text-xl font-bold text-commerce-950">
          <span>Buscar productos</span>
        </Modal.Header>
        <Modal.Body className="p-6">
          <InstantSearch
            searchClient={searchClient}
            indexName={indexName}
            future={{ preserveSharedStateOnUnmount: true }}
          >
            <DynamicConfigure />

            <header className="w-full mb-6">
              <SearchBox
                classNames={{
                  root: 'relative',
                  form: 'relative',
                  input: 'w-full pl-10 pr-4 py-3 bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg',
                  submit: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400',
                  reset: 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600',
                  submitIcon: 'w-5 h-5',
                  resetIcon: 'w-5 h-5'
                }}
                placeholder='Buscar productos por nombre, marca, SKU...'
                submitIconComponent={() => (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                resetIconComponent={() => (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              />
            </header>

            <main className="max-h-96 overflow-y-auto">
              <Hits
                hitComponent={Hit}
                classNames={{
                  root: 'space-y-2',
                  list: 'space-y-2',
                  item: 'w-full'
                }}
              />
            </main>
          </InstantSearch>
        </Modal.Body>
      </Modal>
    </>
  )
}
