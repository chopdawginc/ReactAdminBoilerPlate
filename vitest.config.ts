import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      context: path.resolve(__dirname, 'src/context'),
      services: path.resolve(__dirname, 'src/services'),
      constant: path.resolve(__dirname, 'src/constant'),
      utils: path.resolve(__dirname, 'src/utils'),
      libs: path.resolve(__dirname, 'src/libs'),
      hocs: path.resolve(__dirname, 'src/hocs'),
      features: path.resolve(__dirname, 'src/features'),
      layout: path.resolve(__dirname, 'src/layout'),
      collections: path.resolve(__dirname, 'src/collections'),
      styles: path.resolve(__dirname, 'src/styles'),
      screens: path.resolve(__dirname, 'src/screens'),
      validations: path.resolve(__dirname, 'src/validations'),
      core: path.resolve(__dirname, 'src/core'),
      assets: path.resolve(__dirname, 'public/assets'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'src/setupTests.ts')],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
