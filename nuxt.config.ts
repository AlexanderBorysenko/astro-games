export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.scss'],

  // Production optimizations
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    minify: true,
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },

  // SEO and meta
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Astro Games',
      meta: [
        { name: 'description', content: 'Play games and earn rewards with Phantom Wallet integration' },
        { name: 'theme-color', content: '#000000' }
      ]
    }
  },

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (only available on server-side)
    databasePath: process.env.DATABASE_PATH || './database.sqlite',

    // Public keys (exposed to client-side)
    public: {
      apiBase: '/api'
    }
  },

  // Build optimizations
  build: {
    transpile: ['@solana/wallet-adapter-base', '@solana/wallet-adapter-phantom']
  }
})
