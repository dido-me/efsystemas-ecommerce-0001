import { indexName, searchClient } from '@src/algolia/config'
import { InstantSearch, RefinementList, Highlight, Hits, Pagination } from 'react-instantsearch'
import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types'

type HitProps = {
  hit: AlgoliaHit<{
    objectID: string
    thumbnail: string
    title: string
    handle: string
    category: string
    brand: string
  }>
}

function Hit ({ hit }: HitProps) {
  return (
    <article className="flex flex-col sm:flex-row items-center sm:items-start w-full gap-4 sm:gap-6">
      {/* Imagen del producto */}
      <a
        href={`/product/${hit.objectID}/${hit.handle}`}
        className="w-full sm:w-40 h-40 sm:h-32 lg:h-40 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 hover:shadow-md"
      >
        <img
          className="w-full h-full object-cover"
          src={hit.thumbnail}
          alt={hit.title}
        />
      </a>

      {/* Información del producto */}
      <a href={`/product/${hit.objectID}/${hit.handle}`} className="flex flex-col justify-between w-full overflow-hidden">
        <h1
          className="text-base lg:text-lg font-bold text-commerce-950 hover:text-blue-500 transition-all duration-200 break-words whitespace-normal"
          title={hit.title} // Tooltip opcional para ver el título completo
        >
          <Highlight hit={hit} attribute="title" />
        </h1>

        <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-500 mt-1 sm:mt-0">
          Id Producto: <span>{hit.objectID}</span>
        </p>

        <div className="mt-2 sm:mt-4">
          <p className="text-xs sm:text-sm text-gray-400">
            <span className="font-medium text-gray-600">Marca:</span> {hit.brand}
          </p>
          <p className="text-xs sm:text-sm text-gray-400">
            <span className="font-medium text-gray-600">Categoría:</span> {hit.category}
          </p>
        </div>
      </a>
    </article>
  )
}

export function ShopFilters () {
  return (
    <InstantSearch indexName={indexName} searchClient={searchClient} future={{ preserveSharedStateOnUnmount: true }}>
      <div className='py-10 grid grid-cols-1 sm:grid-cols-4 gap-6'>
        <aside className="col-span-1 sm:col-span-1 bg-white p-4 rounded-md shadow-sm flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Marcas</h2>
            <RefinementList
              attribute="brand"
              showMore={true}
              classNames={{
                list: 'flex flex-col gap-2 py-2',
                item: 'cursor-pointer flex items-center justify-between gap-4 p-2 rounded hover:bg-gray-100 transition-all',
                label: 'text-sm sm:text-base font-medium text-gray-600',
                checkbox: 'form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out mr-3',
                count: 'text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-0.5',
                showMore: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all cursor-pointer mt-2'
              }}

              translations={{
                showMoreButtonText ({ isShowingMore }) {
                  return isShowingMore ? 'Ver menos Marcas ' : 'Ver mas Marcas'
                }
              }}

            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Categorías</h2>
            <RefinementList
              attribute="category"
              classNames={{
                root: 'w-full',
                list: 'flex flex-wrap gap-2 sm:gap-3',
                item: 'cursor-pointer bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-sm sm:text-base text-gray-600 hover:bg-blue-50 hover:border-blue-200 transition-all',
                selectedItem: 'bg-blue-200 border-blue-400 text-blue-800 hover:bg-blue-300 hover:border-blue-500',
                label: 'font-medium',
                checkbox: 'hidden',
                count: 'ml-2 text-xs sm:text-sm text-gray-500 font-normal',
                showMore: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all cursor-pointer mt-2'
              }}
              showMore={true}
              translations={{
                showMoreButtonText ({ isShowingMore }) {
                  return isShowingMore ? 'Ver menos Categorías ' : 'Ver mas Categorías'
                }
              }}
            />
          </div>
        </aside>

        <main className="col-span-1 sm:col-span-3 flex flex-col gap-8">
          <Hits hitComponent={Hit} classNames={{ list: 'grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4' }} />

          {/* Paginación agregada aquí */}
          <div className="flex justify-center">
            <Pagination
              classNames={{
                root: 'flex items-center justify-center gap-2 mt-6',
                list: 'flex gap-1',
                item: 'cursor-pointer border border-gray-300 text-sm font-medium rounded-md px-3 py-1 hover:bg-blue-50 transition-all',
                link: 'w-full h-full flex items-center justify-center',
                selectedItem: 'bg-blue-600 text-white border-blue-600',
                disabledItem: 'opacity-50 cursor-not-allowed'
              }}
              padding={2}
              showFirst={true}
              showPrevious={true}
              showNext={true}
              showLast={true}
            />
          </div>
        </main>
      </div>
    </InstantSearch>
  )
}
