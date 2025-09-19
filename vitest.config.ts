import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'src/**/*.test.ts', 
      'src/**/*.test.tsx',
      'src/**/__tests__/**/*.test.tsx'
    ],
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: false,
    globals: true
  },
})
