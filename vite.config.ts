import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import type { PluginConfig } from 'svgo'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
      svgrOptions: { 
        // icon: true,
        svgo: true, 
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeDimensions: true
                }
              }
            } as unknown as PluginConfig
          ]
        }
      }
    }),
  ],
})
