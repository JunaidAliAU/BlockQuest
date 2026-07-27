import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/ai/openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ai\/openai/, '/v1/chat/completions'),
      },
      '/api/ai/openrouter': {
        target: 'https://openrouter.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ai\/openrouter/, '/api/v1/chat/completions'),
      },
      '/api/ai/googleai': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ai\/googleai/, '/v1beta/models/gemini-2.0-flash:generateContent'),
      },
    },
  },
})
