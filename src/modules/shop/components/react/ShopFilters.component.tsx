import { indexName, searchClient } from '@src/algolia/config'
import { InstantSearch, RefinementList, Highlight, Hits, Pagination, SearchBox, Configure } from 'react-instantsearch'
import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types'

type HitProps = {
  hit: AlgoliaHit<{
    objectID: string
    nombre: string
    documentId: string
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
      return '/producto/placehold.png' // Fallback image
    }

    const image = hit.imagenes[0]
    if (image.formats?.small?.url) {
      return image.formats.small.url
    }
    if (image.formats?.thumbnail?.url) {
      return image.formats.thumbnail.url
    }
    return image.url || '/producto/placehold.png'
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price)
  }

  // Get category name
  const getCategoryName = () => {
    return hit.categorias && hit.categorias.length > 0
      ? hit.categorias[0].nombre
      : 'Sin categoría'
  }

  // Get brand name
  const getBrandName = () => {
    return hit.marca?.nombre || 'Sin marca'
  }

  return (
    <article className="product-card bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Imagen del producto */}
      <a
        href={`/product/${hit.documentId}/${hit.slug}`}
        className="block aspect-square bg-gray-100 overflow-hidden"
      >
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          src={getImageUrl()}
          alt={hit.nombre}
          loading="lazy"
        />
      </a>

      {/* Información del producto */}
      <div className="p-4">
        <a href={`/product/${hit.documentId}/${hit.slug}`} className="block">
          <h3 className="text-sm lg:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
            <Highlight hit={hit} attribute="nombre" />
          </h3>
        </a>

        {/* Precio */}
        <div className="mb-3">
          <span className="text-lg font-bold text-green-600">
            {formatPrice(hit.precio)}
          </span>
          {hit.stock > 0
            ? (
            <p className="text-xs text-green-600 mt-1">
              Stock: {hit.stock} unidades
            </p>
              )
            : (
            <p className="text-xs text-red-500 mt-1">Sin stock</p>
              )}
        </div>

        {/* Información adicional */}
        <div className="space-y-1">
          <p className="text-xs text-gray-500">
            <span className="font-medium">SKU:</span> {hit.sku}
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-medium">Marca:</span> {getBrandName()}
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-medium">Categoría:</span> {getCategoryName()}
          </p>
        </div>
      </div>
    </article>
  )
}

export function ShopFilters () {
  return (
    <InstantSearch indexName={indexName} searchClient={searchClient} future={{ preserveSharedStateOnUnmount: true }}>
      <Configure hitsPerPage={12} />

      <div className='py-10 max-w-7xl mx-auto px-4'>
        {/* Barra de búsqueda */}
        <div className="mb-8">
          <SearchBox
            classNames={{
              root: 'relative max-w-2xl mx-auto',
              form: 'relative',
              input: 'w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm',
              submit: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400',
              reset: 'absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600',
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
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Filtros laterales */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filtros</h2>

              {/* Filtro por marcas */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Marcas</h3>
                <RefinementList
                  attribute="marca.nombre"
                  showMore={true}
                  limit={8}
                  showMoreLimit={20}
                  classNames={{
                    root: 'space-y-2',
                    list: 'space-y-2',
                    item: 'flex items-center',
                    label: 'flex items-center cursor-pointer hover:text-blue-600 transition-colors',
                    checkbox: 'mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                    labelText: 'text-sm text-gray-700 flex-1',
                    count: 'ml-2 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1',
                    showMore: 'mt-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium'
                  }}
                  translations={{
                    showMoreButtonText ({ isShowingMore }) {
                      return isShowingMore ? 'Ver menos marcas' : 'Ver más marcas'
                    }
                  }}
                />
              </div>

              {/* Filtro por categorías */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Categorías</h3>
                <RefinementList
                  attribute="categorias.nombre"
                  showMore={true}
                  limit={6}
                  showMoreLimit={15}
                  classNames={{
                    root: 'space-y-2',
                    list: 'space-y-2',
                    item: 'flex items-center',
                    label: 'flex items-center cursor-pointer hover:text-blue-600 transition-colors',
                    checkbox: 'mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                    labelText: 'text-sm text-gray-700 flex-1',
                    count: 'ml-2 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1',
                    showMore: 'mt-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium'
                  }}
                  translations={{
                    showMoreButtonText ({ isShowingMore }) {
                      return isShowingMore ? 'Ver menos categorías' : 'Ver más categorías'
                    }
                  }}
                />
              </div>
            </div>
          </aside>

          {/* Resultados principales */}
          <main className="lg:col-span-3">
            <Hits
              hitComponent={Hit}
              classNames={{
                root: 'mb-8',
                list: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
                item: 'w-full'
              }}
            />

            {/* Paginación */}
            <div className="flex justify-center">
              <Pagination
                classNames={{
                  root: 'flex items-center justify-center gap-2',
                  list: 'flex gap-1',
                  item: 'cursor-pointer border border-gray-300 text-sm font-medium rounded-md px-3 py-2 hover:bg-blue-50 hover:border-blue-300 transition-all',
                  link: 'w-full h-full flex items-center justify-center',
                  selectedItem: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
                  disabledItem: 'opacity-50 cursor-not-allowed hover:bg-transparent hover:border-gray-300'
                }}
                padding={2}
                showFirst={true}
                showPrevious={true}
                showNext={true}
                showLast={true}
                translations={{
                  firstPageItemText: '««',
                  previousPageItemText: '‹',
                  nextPageItemText: '›',
                  lastPageItemText: '»»'
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </InstantSearch>
  )
}
