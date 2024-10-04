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
    thumbnail: string
    title: string
    handle: string
    category: string
    brand: string
  }>
}

function Hit ({ hit }: HitProps) {
  return (
    <article className="flex flex-col sm:flex-row w-full gap-4 sm:gap-7">
      <a
        href={`/product/${hit.objectID}/${hit.handle}`}
        className="w-full sm:w-32 h-32 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src={hit.thumbnail}
          alt={hit.title}
        />
      </a>
      <a href={`/product/${hit.objectID}/${hit.handle}`} className="flex flex-col justify-between">
        <h1 className="text-sm sm:text-base font-bold text-commerce-950">
          <Highlight hit={hit} attribute="title" />
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          Id Producto: <span>{hit.objectID}</span>
        </p>
      </a>
    </article>
  )
}

const DynamicConfigure = () => {
  const { query } = useSearchBox()
  return <Configure hitsPerPage={query ? 30 : 5} />
}

export const ModalSearch = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Ir a la página carrito de compra"
        aria-label="Ir a la página carrito de compra"
        className="flex items-center md:w-auto justify-center gap-2 md:px-4 md:py-2 hover:bg-brand-gray/5 md:rounded-2xl border border-transparent hover:border-brand-gray/10 transition-all min-h-[50px] md:text-base px-5 py-4 text-xl duration-300 w-full hover:bg-gray-600/10 cursor-pointer relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M11 8a3 3 0 0 0-3 3m12 9l-3-3" /></g></svg>
      </button>
      <Modal show={isOpen} size="2xl" onClose={() => setIsOpen(false)} className="rounded-lg">
        <Modal.Header className="text-xl font-bold text-commerce-950">
          <span>Buscar productos</span>
        </Modal.Header>
        <Modal.Body className="p-4 ">
          <InstantSearch
            searchClient={searchClient}
            indexName={indexName}
            future={{ preserveSharedStateOnUnmount: true }}
          >
            <DynamicConfigure />

            <header className="w-full mb-4">
              <SearchBox
                classNames={{
                  root: 'p-3 shadow-sm',
                  input: 'block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
                  submitIcon: 'hidden',
                  resetIcon: 'hidden'
                }}
                placeholder='Buscar productos...'
              />
            </header>

            <main className="flex flex-col gap-5">
              <Hits hitComponent={Hit} classNames={{ list: 'grid grid-cols-1 gap-5' }} />
            </main>
          </InstantSearch>
        </Modal.Body>
      </Modal>
    </>
  )
}
