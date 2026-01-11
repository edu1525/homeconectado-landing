import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import crypto from 'crypto'

const app = express()
const PORT = 3002

app.use(express.json())

app.use((req, res, next) => {
  console.log(`\n=== NOVA REQUISIÇÃO ===`)
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  console.log(`Origin: ${req.headers.origin || 'N/A'}`)
  console.log(`Headers recebidos:`, Object.keys(req.headers).filter(h => h.includes('client') || h.includes('sign') || h.includes('t')))
  
  const origin = req.headers.origin
  if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, client_id, sign, t, sign_method')
  
  if (req.method === 'OPTIONS') {
    console.log(`✅ OPTIONS respondido - Status: 200`)
    return res.sendStatus(200)
  }
  
  const originalEnd = res.end
  res.end = function(...args) {
    console.log(`\n📊 RESPOSTA FINAL ===`)
    console.log(`Status HTTP: ${res.statusCode}`)
    console.log(`Method: ${req.method}`)
    console.log(`Path: ${req.path}`)
    console.log(`====================\n`)
    originalEnd.apply(res, args)
  }
  
  next()
})

app.post('/api/tuya/authenticate', async (req, res) => {
  try {
    const { clientId, clientSecret } = req.body

    if (!clientId || !clientSecret) {
      return res.status(400).json({ error: 'clientId e clientSecret são obrigatórios' })
    }

    const method = 'GET'
    const path = '/v1.0/token?grant_type=1'
    const timestamp = Date.now().toString()

    // 🔹 GET → body vazio
    const bodyHash = crypto
      .createHash('sha256')
      .update('')
      .digest('hex')

    const stringToSign =
      method + '\n' +
      bodyHash + '\n' +
      '\n' +
      path

    const signStr =
      clientId +
      timestamp +
      stringToSign

    const sign = crypto
      .createHmac('sha256', clientSecret)
      .update(signStr)
      .digest('hex')
      .toUpperCase()

    console.log('=== TUYA AUTH (SERVER) ===')
    console.log('stringToSign:\n', stringToSign)
    console.log('signStr:\n', signStr)
    console.log('sign:', sign)
    console.log('=========================')

    const response = await fetch(`https://openapi.tuyaus.com${path}`, {
      method,
      headers: {
        client_id: clientId,
        sign,
        t: timestamp,
        sign_method: 'HMAC-SHA256'
      }
    })

    const text = await response.text()
    const data = text ? JSON.parse(text) : {}

    console.log('=== AUTHENTICATE RESPONSE ===')
    console.log('Uid retornado:', data.result?.uid)
    console.log('Full result:', JSON.stringify(data.result, null, 2))
    console.log('===========================')

    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'application/json')

    res.status(response.status).json(data)
  } catch (error) {
    console.error('Erro na autenticação Tuya:', error)
    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/tuya/homes', async (req, res) => {
  try {
    const { clientId, clientSecret, accessToken, uid } = req.body

    if (!clientId || !clientSecret || !accessToken || !uid) {
      return res.status(400).json({ error: 'clientId, clientSecret, accessToken e uid são obrigatórios' })
    }

    const method = 'GET'
    const possiblePaths = [
      `/v1.0/users/${uid}/homes`,
      `/v1.0/homes`,
      `/v1.0/iot-03/users/${uid}/homes`
    ]
    
    let lastError = null
    let response = null
    let data = null
    
    for (const path of possiblePaths) {
      try {
        console.log(`\n=== TENTANDO ENDPOINT HOMES: ${path} ===`)
        
        const timestamp = Date.now().toString()
        const bodyHash = crypto
          .createHash('sha256')
          .update('')
          .digest('hex')

        const stringToSign =
          method + '\n' +
          bodyHash + '\n' +
          '\n' +
          path

        const signStr =
          clientId +
          accessToken +
          timestamp +
          stringToSign

        const sign = crypto
          .createHmac('sha256', clientSecret)
          .update(signStr)
          .digest('hex')
          .toUpperCase()

        response = await fetch(`https://openapi.tuyaus.com${path}`, {
          method,
          headers: {
            client_id: clientId,
            access_token: accessToken,
            sign,
            t: timestamp,
            sign_method: 'HMAC-SHA256'
          }
        })

        const text = await response.text()
        data = text ? JSON.parse(text) : {}

        if (response.ok && data.success !== false) {
          console.log(`✅ Endpoint funcionou: ${path}`)
          break
        } else if (data.code === 1108) {
          console.log(`❌ Endpoint inválido: ${path} - ${data.msg}`)
          lastError = data
          continue
        } else {
          console.log(`⚠️ Endpoint retornou erro: ${path} - ${data.msg || 'Unknown'}`)
          lastError = data
          break
        }
      } catch (err) {
        console.error(`Erro ao tentar endpoint ${path}:`, err.message)
        lastError = { error: err.message }
        continue
      }
    }

    if (!response || !data) {
      const origin = req.headers.origin
      if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
        res.setHeader('Access-Control-Allow-Origin', origin)
      }
      res.status(404).json({ 
        success: false, 
        code: 1108, 
        msg: 'Endpoint não encontrado',
        error: lastError 
      })
      return
    }

    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'application/json')

    res.status(response.status).json(data)
  } catch (error) {
    console.error('Erro ao obter homes Tuya:', error)
    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/tuya/devices', async (req, res) => {
  try {
    const { clientId, clientSecret, accessToken, uid } = req.body

    console.log('=== TUYA GET DEVICES REQUEST ===')
    console.log('Body recebido:', { 
      hasClientId: !!clientId, 
      hasClientSecret: !!clientSecret, 
      hasAccessToken: !!accessToken,
      hasUid: !!uid,
      uid: uid
    })

    if (!clientId || !clientSecret || !accessToken || !uid) {
      console.error('❌ Parâmetros faltando:', {
        clientId: !!clientId,
        clientSecret: !!clientSecret,
        accessToken: !!accessToken,
        uid: !!uid
      })
      return res.status(400).json({ error: 'clientId, clientSecret, accessToken e uid são obrigatórios' })
    }

    if (clientId.trim() === '' || clientSecret.trim() === '' || accessToken.trim() === '' || uid.trim() === '') {
      console.error('❌ Parâmetros vazios:', {
        clientId: clientId.trim() === '',
        clientSecret: clientSecret.trim() === '',
        accessToken: accessToken.trim() === '',
        uid: uid.trim() === ''
      })
      return res.status(400).json({ error: 'clientId, clientSecret, accessToken e uid não podem estar vazios' })
    }

    const method = 'GET'
    const path = `/v1.0/users/${uid}/devices`
    const timestamp = Date.now().toString()

    const bodyHash = crypto
      .createHash('sha256')
      .update('')
      .digest('hex')

    const stringToSign =
      method + '\n' +
      bodyHash + '\n' +
      '\n' +
      path

    const signStr =
      clientId +
      accessToken +
      timestamp +
      stringToSign

    const sign = crypto
      .createHmac('sha256', clientSecret)
      .update(signStr)
      .digest('hex')
      .toUpperCase()

    const headers = {
      client_id: clientId,
      access_token: accessToken,
      sign,
      t: timestamp,
      sign_method: 'HMAC-SHA256'
    }

    console.log('=== TUYA GET DEVICES (SERVER) ===')
    console.log('Path:', path)
    console.log('Uid usado:', uid)
    console.log('stringToSign:\n', stringToSign)
    console.log('signStr:\n', signStr)
    console.log('sign:', sign)
    console.log('=========================')

    const response = await fetch(`https://openapi.tuyaus.com${path}`, {
      method,
      headers
    })

    const text = await response.text()
    const data = text ? JSON.parse(text) : {}

    console.log('=== GET DEVICES RESPONSE ===')
    console.log('Status:', response.status)
    console.log('Response data:', JSON.stringify(data, null, 2))
    console.log('===========================')

    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'application/json')

    res.status(response.status).json(data)
  } catch (error) {
    console.error('Erro ao obter dispositivos Tuya:', error)
    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/tuya/scenes', async (req, res) => {
  try {
    const { clientId, clientSecret, accessToken, uid, homeId } = req.body

    if (!clientId || !clientSecret || !accessToken || !uid) {
      return res.status(400).json({ error: 'clientId, clientSecret, accessToken e uid são obrigatórios' })
    }

    const method = 'GET'
    const possiblePaths = []
    
    if (homeId) {
      possiblePaths.push(`/v1.0/homes/${homeId}/scenes`)
    }
    
    possiblePaths.push(
      `/v1.0/users/${uid}/scenes`,
      `/v1.0/scenes`,
      `/v1.0/iot-03/users/${uid}/scenes`
    )
    
    let lastError = null
    let response = null
    let data = null
    
    for (const path of possiblePaths) {
      try {
        console.log(`\n=== TENTANDO ENDPOINT: ${path} ===`)
        
        const timestamp = Date.now().toString()
        const bodyHash = crypto
          .createHash('sha256')
          .update('')
          .digest('hex')

        const stringToSign =
          method + '\n' +
          bodyHash + '\n' +
          '\n' +
          path

        const signStr =
          clientId +
          accessToken +
          timestamp +
          stringToSign

        const sign = crypto
          .createHmac('sha256', clientSecret)
          .update(signStr)
          .digest('hex')
          .toUpperCase()

        console.log('Path:', path)
        console.log('Full URL:', `https://openapi.tuyaus.com${path}`)
        console.log('Uid:', uid)
        console.log('sign:', sign)

        response = await fetch(`https://openapi.tuyaus.com${path}`, {
          method,
          headers: {
            client_id: clientId,
            access_token: accessToken,
            sign,
            t: timestamp,
            sign_method: 'HMAC-SHA256'
          }
        })

        const text = await response.text()
        data = text ? JSON.parse(text) : {}

        console.log('Status:', response.status)
        console.log('Response data:', JSON.stringify(data, null, 2))

        if (response.ok && data.success !== false) {
          console.log(`✅ Endpoint funcionou: ${path}`)
          break
        } else if (data.code === 1108) {
          console.log(`❌ Endpoint inválido: ${path} - ${data.msg}`)
          lastError = data
          continue
        } else {
          console.log(`⚠️ Endpoint retornou erro: ${path} - ${data.msg || 'Unknown'}`)
          lastError = data
          break
        }
      } catch (err) {
        console.error(`Erro ao tentar endpoint ${path}:`, err.message)
        lastError = { error: err.message }
        continue
      }
    }

    if (!response || !data) {
      console.log('=== TODOS OS ENDPOINTS FALHARAM ===')
      console.log('Último erro:', lastError)
      const origin = req.headers.origin
      if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
        res.setHeader('Access-Control-Allow-Origin', origin)
      }
      res.status(404).json({ 
        success: false, 
        code: 1108, 
        msg: 'Endpoint não encontrado. Verifique a documentação da Tuya.',
        error: lastError 
      })
      return
    }

    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'application/json')

    res.status(response.status).json(data)
  } catch (error) {
    console.error('Erro ao obter cenas Tuya:', error)
    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/tuya/automations', async (req, res) => {
  try {
    const { clientId, clientSecret, accessToken, uid, homeId } = req.body

    if (!clientId || !clientSecret || !accessToken || !uid) {
      return res.status(400).json({ error: 'clientId, clientSecret, accessToken e uid são obrigatórios' })
    }

    const method = 'GET'
    const possiblePaths = []
    
    if (homeId) {
      possiblePaths.push(`/v1.0/homes/${homeId}/automations`)
    }
    
    possiblePaths.push(
      `/v1.0/users/${uid}/automations`,
      `/v1.0/automations`,
      `/v1.0/iot-03/users/${uid}/automations`
    )
    
    let lastError = null
    let response = null
    let data = null
    
    for (const path of possiblePaths) {
      try {
        console.log(`\n=== TENTANDO ENDPOINT AUTOMATIONS: ${path} ===`)
        
        const timestamp = Date.now().toString()
        const bodyHash = crypto
          .createHash('sha256')
          .update('')
          .digest('hex')

        const stringToSign =
          method + '\n' +
          bodyHash + '\n' +
          '\n' +
          path

        const signStr =
          clientId +
          accessToken +
          timestamp +
          stringToSign

        const sign = crypto
          .createHmac('sha256', clientSecret)
          .update(signStr)
          .digest('hex')
          .toUpperCase()

        console.log('Path:', path)
        console.log('Full URL:', `https://openapi.tuyaus.com${path}`)
        console.log('Uid:', uid)
        console.log('sign:', sign)

        response = await fetch(`https://openapi.tuyaus.com${path}`, {
          method,
          headers: {
            client_id: clientId,
            access_token: accessToken,
            sign,
            t: timestamp,
            sign_method: 'HMAC-SHA256'
          }
        })

        const text = await response.text()
        data = text ? JSON.parse(text) : {}

        console.log('Status:', response.status)
        console.log('Response data:', JSON.stringify(data, null, 2))

        if (response.ok && data.success !== false) {
          console.log(`✅ Endpoint funcionou: ${path}`)
          break
        } else if (data.code === 1108) {
          console.log(`❌ Endpoint inválido: ${path} - ${data.msg}`)
          lastError = data
          continue
        } else {
          console.log(`⚠️ Endpoint retornou erro: ${path} - ${data.msg || 'Unknown'}`)
          lastError = data
          break
        }
      } catch (err) {
        console.error(`Erro ao tentar endpoint ${path}:`, err.message)
        lastError = { error: err.message }
        continue
      }
    }

    if (!response || !data) {
      console.log('=== TODOS OS ENDPOINTS AUTOMATIONS FALHARAM ===')
      console.log('Último erro:', lastError)
      const origin = req.headers.origin
      if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
        res.setHeader('Access-Control-Allow-Origin', origin)
      }
      res.status(404).json({ 
        success: false, 
        code: 1108, 
        msg: 'Endpoint não encontrado. Verifique a documentação da Tuya.',
        error: lastError 
      })
      return
    }

    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', 'application/json')

    res.status(response.status).json(data)
  } catch (error) {
    console.error('Erro ao obter automações Tuya:', error)
    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.status(500).json({ error: error.message })
  }
})

app.use('/api/tuya', (req, res, next) => {
  console.log(`\n🔄 PROXY MIDDLEWARE ATIVADO ===`)
  console.log(`Path original: ${req.path}`)
  console.log(`URL original: ${req.url}`)
  next()
}, createProxyMiddleware({
  target: 'https://openapi.tuyaus.com',
  changeOrigin: true,
  selfHandleResponse: true,
  pathRewrite: { '^/api/tuya': '' },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`\n📤 ========== REQUEST PARA TUYA ==========`)
    console.log(`URL completa: https://openapi.tuyaus.com${proxyReq.path}`)
    console.log(`Method: ${proxyReq.method}`)
    console.log(`Path: ${proxyReq.path}`)
    console.log(`Query string: ${proxyReq.path.split('?')[1] || 'N/A'}`)
    console.log(`\n--- TODOS OS HEADERS ENVIADOS PARA TUYA ---`)
    const allHeaders = proxyReq.getHeaders()
    Object.keys(allHeaders).forEach(header => {
      const value = allHeaders[header]
      if (header.toLowerCase() === 'sign') {
        console.log(`${header}: *** (${value ? value.length : 0} chars)`)
      } else {
        console.log(`${header}: ${value}`)
      }
    })
    console.log(`\n--- HEADERS ESPECÍFICOS DA TUYA ---`)
    console.log(`client_id: ${proxyReq.getHeader('client_id')}`)
    console.log(`sign: ${proxyReq.getHeader('sign') ? '*** (' + proxyReq.getHeader('sign').length + ' chars)' : 'NÃO ENVIADO'}`)
    console.log(`t: ${proxyReq.getHeader('t')}`)
    console.log(`sign_method: ${proxyReq.getHeader('sign_method')}`)
    console.log(`\n--- BODY (se houver) ---`)
    console.log(`Body: ${req.body || 'N/A (GET request)'}`)
    
    console.log(`\n--- COMANDO CURL EQUIVALENTE ---`)
    const url = `https://openapi.tuyaus.com${proxyReq.path}`
    const method = proxyReq.method
    let curlCmd = `curl -X ${method} "${url}"`
    
    const headers = proxyReq.getHeaders()
    Object.keys(headers).forEach(header => {
      const value = headers[header]
      if (header.toLowerCase() === 'sign') {
        curlCmd += ` \\\n  -H "${header}: ${value}"`
      } else {
        curlCmd += ` \\\n  -H "${header}: ${value}"`
      }
    })
    
    console.log(curlCmd)
    console.log(`==========================================\n`)
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`\n📥 RESPOSTA DA TUYA RECEBIDA ===`)
    console.log(`Status: ${proxyRes.statusCode}`)
    console.log(`Headers da Tuya:`, Object.keys(proxyRes.headers))
    
    if (res.headersSent) {
      console.log('⚠️ Headers já enviados ao cliente')
      return
    }
    
    const origin = req.headers.origin
    if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001'))) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    
    Object.keys(proxyRes.headers).forEach(header => {
      const lower = header.toLowerCase()
      if (!lower.startsWith('access-control-')) {
        try {
          res.setHeader(header, proxyRes.headers[header])
        } catch (e) {
          console.warn(`Erro ao definir header ${header}:`, e.message)
        }
      }
    })
    
    if (!res.getHeader('Content-Type')) {
      res.setHeader('Content-Type', 'application/json')
    }
    
    res.statusCode = proxyRes.statusCode
    
    let body = []
    let ended = false
    
    proxyRes.on('data', chunk => {
      if (!ended) {
        body.push(chunk)
      }
    })
    
    proxyRes.on('end', () => {
      if (!ended && !res.headersSent) {
        ended = true
        const bodyBuffer = Buffer.concat(body)
        const bodyString = bodyBuffer.toString()
        console.log(`✅ Resposta completa recebida da Tuya: ${bodyBuffer.length} bytes`)
        console.log(`Body completo:`, bodyString)
        console.log(`📤 Enviando resposta ao cliente...`)
        console.log(`📊 Status HTTP que será enviado: ${res.statusCode}`)
        res.end(bodyBuffer)
        console.log(`✅ Resposta enviada ao cliente com sucesso - Status: ${res.statusCode}`)
        console.log(`====================\n`)
      } else {
        console.log(`⚠️ Resposta já foi enviada ou processada`)
      }
    })
    
    proxyRes.on('error', err => {
      console.error(`❌ Erro na resposta da Tuya:`, err.message)
      console.error(`Stack:`, err.stack)
      if (!ended && !res.headersSent) {
        ended = true
        res.status(500).json({ error: err.message })
        console.log(`✅ Erro enviado ao cliente - Status: 500`)
      }
    })
    
    setTimeout(() => {
      if (!ended && !res.headersSent) {
        console.warn(`⚠️ TIMEOUT após 10s - forçando fim da resposta`)
        console.warn(`Body acumulado: ${body.length} chunks`)
        ended = true
        const bodyBuffer = Buffer.concat(body)
        if (bodyBuffer.length > 0) {
          console.log(`Enviando ${bodyBuffer.length} bytes acumulados - Status: ${res.statusCode}`)
          res.end(bodyBuffer)
        } else {
          console.warn(`Nenhum dado recebido - enviando erro - Status: 504`)
          res.status(504).json({ error: 'Gateway Timeout' })
        }
      }
    }, 10000)
  },
  onError: (err, req, res) => {
    console.error(`❌ Erro no proxy:`, err.message)
    if (!res.headersSent) {
      res.status(500).json({ error: err.message })
      console.log(`📊 Status HTTP enviado: 500`)
    }
  }
}))

app.listen(PORT, () => {
  console.log(`🚀 Servidor proxy rodando em http://localhost:${PORT}`)
}).on('error', (err) => {
  console.error('❌ Erro ao iniciar servidor:', err)
  process.exit(1)
})

process.on('SIGTERM', () => {
  console.log('Servidor encerrando...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('Servidor encerrando...')
  process.exit(0)
})
