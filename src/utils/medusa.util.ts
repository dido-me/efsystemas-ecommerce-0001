import Medusa from '@medusajs/medusa-js'

export const medusa = new Medusa({
  baseUrl: import.meta.env.BACKEND_URL_API ?? 'http://localhost:9000',
  maxRetries: 3
})
