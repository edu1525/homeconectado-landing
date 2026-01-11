import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true,
    proxy: {
      '/api/tuya': {
        target: 'https://openapi.tuyaus.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/tuya/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('=== PROXY REQUEST ===')
            console.log('URL:', req.url)
            console.log('Method:', req.method)
            console.log('Headers recebidos:', Object.keys(req.headers))
            
            // Extrair headers da Tuya
            const tuyaHeaders = {
              'client_id': req.headers['client_id'] || req.headers['client-id'],
              'sign': req.headers['sign'],
              't': req.headers['t'],
              'sign_method': req.headers['sign_method'] || req.headers['sign-method']
            }
            
            console.log('Headers da Tuya extraídos:', tuyaHeaders)
            
            // Limpar TODOS os headers primeiro
            const currentHeaders = proxyReq.getHeaders()
            Object.keys(currentHeaders).forEach(header => {
              proxyReq.removeHeader(header)
            })
            
            // Adicionar APENAS os headers da Tuya
            Object.entries(tuyaHeaders).forEach(([key, value]) => {
              if (value) {
                proxyReq.setHeader(key, value)
                console.log(`Header adicionado: ${key} = ${value.substring(0, 20)}...`)
              }
            })
            
            // Adicionar headers básicos necessários
            proxyReq.setHeader('accept', '*/*')
            // User-Agent que parece uma requisição normal (não de proxy)
            proxyReq.setHeader('user-agent', 'Tuya-API-Client/1.0')
            
            const finalHeaders = proxyReq.getHeaders()
            console.log('Headers finais (após limpeza):', Object.keys(finalHeaders))
            console.log('Headers completos:', finalHeaders)
            console.log('====================')
          })
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Log da resposta do servidor Tuya
            console.log('=== PROXY RESPONSE ===')
            console.log('Status:', proxyRes.statusCode)
            console.log('Status Message:', proxyRes.statusMessage)
            console.log('Headers da resposta Tuya:', proxyRes.headers)
            
            // Capturar o body da resposta para debug
            let body = ''
            proxyRes.on('data', (chunk) => {
              body += chunk.toString()
            })
            proxyRes.on('end', () => {
              console.log('Body da resposta Tuya:', body)
              console.log('=====================')
            })
          })
          
          proxy.on('error', (err, req, res) => {
            console.error('=== ERRO NO PROXY ===')
            console.error('Mensagem:', err.message)
            console.error('Código:', err.code)
            console.error('Stack:', err.stack)
            console.error('====================')
            if (!res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json'
              })
              res.end(JSON.stringify({
                error: 'Erro no proxy',
                message: err.message,
                code: err.code
              }))
            }
          })
        }
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  },
  base: './'
})
