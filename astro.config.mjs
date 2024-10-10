// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  output: 'server',
  adapter: vercel({ imageService: true }),
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })],
  site: import.meta.env.SITE || ''
})
