import { liteClient as algoliasearch } from 'algoliasearch/lite'

const applicationId = import.meta.env.PUBLIC_APPLICATION_ID ?? ''
const searchApiKey = import.meta.env.PUBLIC_SEARCH_API_KEY ?? ''
export const indexName = import.meta.env.PUBLIC_ALGOLIA_INDEX ?? ''

export const searchClient = algoliasearch(applicationId, searchApiKey)
