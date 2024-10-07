// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import partytown from '@astrojs/partytown'

export default defineConfig({
  output: 'server',
  adapter: vercel({ imageService: true }),
  integrations: [
    tailwind(),
    react(),
    partytown({
      config: {
        debug: false,
        logCalls: false,
        logGetters: false,
        logSetters: false,
        logImageRequests: false,
        logScriptExecution: false,
        logStackTraces: false,
        forward: [
          ['dataLayer.push']
        ],
        resolveUrl: (url) => {
          const siteUrl = 'https://www.efsystemas.net/'
          const proxyUrl = new URL(siteUrl)
          if (
            url.hostname === 'googleads.g.doubleclick.net' ||
            url.hostname === 'www.googleadservices.com' ||
            url.hostname === 'googletagmanager.com' ||
            url.hostname === 'www.googletagmanager.com' ||
            url.hostname === 'region1.google-analytics.com' ||
            url.hostname === 'google.com'
          ) {
            proxyUrl.searchParams.append('apiurl', url.href)
            return proxyUrl
          }
          return url
        }
      }
    })],
  site: 'https://www.servidorperu.net'
})
