// Serviço para fazer chamadas diretas à API Tuya via proxy
// Este serviço contorna o problema de CORS fazendo as chamadas server-side

import CryptoJS from 'crypto-js'

class TuyaApiService {
  constructor() {
    this.baseURL = 'http://localhost:3002/api/tuya'
    this.appClientId = null
    this.appClientSecret = null
    this.accessToken = null
    this.refreshToken = null
    this.uid = null
  }

  // Configurar credenciais da aplicação
  setAppCredentials(appCredentials) {
    // Limpar espaços extras que podem causar problemas na assinatura
    this.appClientId = String(appCredentials.clientId || '').trim()
    this.appClientSecret = String(appCredentials.clientSecret || '').trim()

    if (!this.appClientId || !this.appClientSecret) {
      throw new Error('Client ID e Client Secret são obrigatórios')
    }
  }

  // Gerar assinatura para requisições COM token (após obter o token)
  // Formato: client_id + access_token + timestamp + stringToSign
  // Onde stringToSign = METHOD + '\n' + SHA256(body) + '\n' + PATH
  generateSignature(method, url, body = '', timestamp, useToken = true) {
    if (!this.appClientId || !this.appClientSecret) {
      throw new Error('Credenciais da aplicação não configuradas')
    }

    if (useToken && !this.accessToken) {
      throw new Error('Access token não disponível')
    }

    const bodyString =
      method === 'GET'
        ? ''
        : typeof body === 'string'
          ? body
          : JSON.stringify(body)

    const bodyHash = CryptoJS.SHA256(bodyString).toString()

    const stringToSign =
      method + '\n' +
      bodyHash + '\n' +
      '\n' +
      url

    const signStr =
      this.appClientId +
      (useToken ? this.accessToken : '') +
      timestamp +
      stringToSign

    return CryptoJS.HmacSHA256(signStr, this.appClientSecret)
      .toString(CryptoJS.enc.Hex)
      .toUpperCase()
  }

  // Fazer requisição autenticada para a API da Tuya
  async makeRequest(method, endpoint, data = null) {
    const timestamp = Date.now().toString()
    const url = this.baseURL + endpoint
    // Garantir que body seja sempre uma string válida
    const body = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : ''

    const signature = this.generateSignature(method, endpoint, body, timestamp)

    const headers = {
      'client_id': this.appClientId,
      'access_token': this.accessToken || '',
      'sign': signature,
      't': timestamp,
      'sign_method': 'HMAC-SHA256',
      'Content-Type': 'application/json'
    }

    console.log('=== REQUISIÇÃO TUYA ===')
    console.log('URL:', url)
    console.log('Method:', method)
    console.log('Endpoint:', endpoint)
    console.log('Headers:', JSON.stringify(headers, null, 2))
    console.log('Body:', body || '(vazio)')
    console.log('=======================')

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body || undefined
      })

      console.log('=== RESPOSTA ===')
      console.log('Status:', response.status)
      console.log('Status Text:', response.statusText)
      console.log('Headers da resposta:', Object.fromEntries(response.headers.entries()))
      console.log('================')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erro na requisição Tuya:', error)
      throw error
    }
  }

  // Autenticar e obter token de acesso usando credenciais da aplicação
  async authenticate(appCredentials) {
    try {
      this.setAppCredentials(appCredentials)

      const response = await fetch('http://localhost:3002/api/tuya/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientId: this.appClientId,
          clientSecret: this.appClientSecret
        })
      })

      const data = await response.json()

      if (!response.ok || data.success === false) {
        throw new Error(
          `Erro Tuya: ${data.msg || 'Unknown'} (code: ${data.code || response.status})`
        )
      }

      this.accessToken = data.result.access_token
      this.refreshToken = data.result.refresh_token
      this.uid = data.result.uid

      console.log('=== AUTHENTICATE SUCCESS ===')
      console.log('AccessToken definido:', this.accessToken ? `${this.accessToken.substring(0, 20)}...` : 'NÃO DEFINIDO')
      console.log('Uid:', this.uid)

      return {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresIn: data.result.expire_time,
        uid: this.uid
      }
    } catch (err) {
      console.error('Erro na autenticação Tuya:', err)
      throw err
    }
  }


  async getDevices(uid) {
    if (!this.appClientId || !this.appClientSecret) {
      throw new Error('Credenciais da aplicação não configuradas')
    }

    if (!this.accessToken) {
      throw new Error('Token de acesso não disponível')
    }

    if (!uid) {
      throw new Error('User ID (uid) é obrigatório')
    }

    console.log('=== GET DEVICES REQUEST ===')
    console.log('AccessToken:', this.accessToken ? `${this.accessToken.substring(0, 20)}...` : 'NÃO DEFINIDO')
    console.log('ClientId:', this.appClientId)
    console.log('ClientSecret:', this.appClientSecret ? '***' : 'NÃO DEFINIDO')
    console.log('Uid:', uid)

    const requestBody = {
      clientId: this.appClientId,
      clientSecret: this.appClientSecret,
      accessToken: this.accessToken,
      uid: uid
    }

    const response = await fetch('http://localhost:3002/api/tuya/devices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()

    console.log('=== GET DEVICES RESPONSE ===')
    console.log('Status:', response.status)
    console.log('Data:', data)

    if (!response.ok) {
      const errorMsg = data.error || data.msg || 'Unknown error'
      throw new Error(`Erro do servidor: ${errorMsg} (code: ${response.status})`)
    }

    if (data.success === false && data.code) {
      if (data.code === 1106) {
        throw new Error(`Permissão negada: Verifique se a conta do app Tuya está vinculada ao projeto Cloud. Acesse: Tuya IoT Platform → Cloud → Development → User Management → App Account e vincule sua conta. (code: ${data.code})`)
      }
      throw new Error(`Erro da API Tuya: ${data.msg || 'Unknown'} (code: ${data.code})`)
    }

    if (data && data.result) {
      return Array.isArray(data.result) ? data.result : []
    }

    return []
  }

  async getHomes(uid) {
    if (!this.appClientId || !this.appClientSecret) {
      throw new Error('Credenciais da aplicação não configuradas')
    }

    if (!this.accessToken) {
      throw new Error('Token de acesso não disponível')
    }

    if (!uid) {
      throw new Error('User ID (uid) é obrigatório')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    let response
    try {
      response = await fetch('http://localhost:3002/api/tuya/homes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientId: this.appClientId,
          clientSecret: this.appClientSecret,
          accessToken: this.accessToken,
          uid: uid
        }),
        signal: controller.signal
      })
      clearTimeout(timeoutId)
    } catch (err) {
      clearTimeout(timeoutId)
      if (err.name === 'AbortError') {
        throw new Error('Timeout ao obter homes (10s)')
      }
      throw err
    }

    const data = await response.json()

    if (!response.ok) {
      const errorMsg = data.error || data.msg || 'Unknown error'
      throw new Error(`Erro do servidor: ${errorMsg} (code: ${response.status})`)
    }

    if (data.success === false && data.code) {
      if (data.code === 1106) {
        throw new Error(`Permissão negada: Verifique se a conta do app Tuya está vinculada ao projeto Cloud. (code: ${data.code})`)
      }
      throw new Error(`Erro da API Tuya: ${data.msg || 'Unknown'} (code: ${data.code})`)
    }

    if (data && data.result) {
      return Array.isArray(data.result) ? data.result : []
    }

    return []
  }

  async getScenes(uid, homeId = null) {
    if (!this.appClientId || !this.appClientSecret) {
      throw new Error('Credenciais da aplicação não configuradas')
    }

    if (!this.accessToken) {
      throw new Error('Token de acesso não disponível')
    }

    if (!uid) {
      throw new Error('User ID (uid) é obrigatório')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    let response
    try {
      response = await fetch('http://localhost:3002/api/tuya/scenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientId: this.appClientId,
          clientSecret: this.appClientSecret,
          accessToken: this.accessToken,
          uid: uid,
          homeId: homeId || null
        }),
        signal: controller.signal
      })
      clearTimeout(timeoutId)
    } catch (err) {
      clearTimeout(timeoutId)
      if (err.name === 'AbortError') {
        throw new Error('Timeout ao obter cenas (10s)')
      }
      throw err
    }

    const data = await response.json()

    if (!response.ok) {
      const errorMsg = data.error || data.msg || 'Unknown error'
      throw new Error(`Erro do servidor: ${errorMsg} (code: ${response.status})`)
    }

    if (data.success === false && data.code) {
      if (data.code === 1106) {
        throw new Error(`Permissão negada: Verifique se a conta do app Tuya está vinculada ao projeto Cloud. (code: ${data.code})`)
      }
      throw new Error(`Erro da API Tuya: ${data.msg || 'Unknown'} (code: ${data.code})`)
    }

    if (data && data.result) {
      return Array.isArray(data.result) ? data.result : []
    }

    return []
  }

  async getAutomations(uid, homeId = null) {
    if (!this.appClientId || !this.appClientSecret) {
      throw new Error('Credenciais da aplicação não configuradas')
    }

    if (!this.accessToken) {
      throw new Error('Token de acesso não disponível')
    }

    if (!uid) {
      throw new Error('User ID (uid) é obrigatório')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    let response
    try {
      response = await fetch('http://localhost:3002/api/tuya/automations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientId: this.appClientId,
          clientSecret: this.appClientSecret,
          accessToken: this.accessToken,
          uid: uid,
          homeId: homeId || null
        }),
        signal: controller.signal
      })
      clearTimeout(timeoutId)
    } catch (err) {
      clearTimeout(timeoutId)
      if (err.name === 'AbortError') {
        throw new Error('Timeout ao obter automações (10s)')
      }
      throw err
    }

    const data = await response.json()

    if (!response.ok) {
      const errorMsg = data.error || data.msg || 'Unknown error'
      throw new Error(`Erro do servidor: ${errorMsg} (code: ${response.status})`)
    }

    if (data.success === false && data.code) {
      if (data.code === 1106) {
        throw new Error(`Permissão negada: Verifique se a conta do app Tuya está vinculada ao projeto Cloud. (code: ${data.code})`)
      }
      throw new Error(`Erro da API Tuya: ${data.msg || 'Unknown'} (code: ${data.code})`)
    }

    if (data && data.result) {
      return Array.isArray(data.result) ? data.result : []
    }

    return []
  }

  async syncClientDevices(clientId, appCredentials) {
    try {
      if (!appCredentials || !appCredentials.clientId || !appCredentials.clientSecret || !appCredentials.uid) {
        throw new Error('Credenciais da aplicação não fornecidas (clientId, clientSecret e uid são obrigatórios)')
      }

      this.setAppCredentials(appCredentials)
      await this.authenticate(appCredentials)

      console.log('Iniciando sincronização paralela...')
      
      const homesPromise = this.getHomes(appCredentials.uid).catch(err => {
        console.warn('Erro ao obter homes:', err.message)
        return []
      })
      
      const devicesPromise = this.getDevices(appCredentials.uid).catch(err => {
        console.error('Erro ao obter dispositivos:', err.message)
        return []
      })

      const [homes, devices] = await Promise.all([
        homesPromise,
        devicesPromise
      ])

      const homeId = homes.length > 0 ? (homes[0].home_id || homes[0].id) : null
      console.log('Home ID obtido:', homeId)

      const scenesPromise = this.getScenes(appCredentials.uid, homeId).catch(err => {
        console.warn('Erro ao obter cenas:', err.message)
        return []
      })
      
      const automationsPromise = this.getAutomations(appCredentials.uid, homeId).catch(err => {
        console.warn('Erro ao obter automações:', err.message)
        return []
      })

      const [scenes, automations] = await Promise.all([
        scenesPromise,
        automationsPromise
      ])

      console.log('Dispositivos Tuya recebidos:', devices.length)
      console.log('Cenas Tuya recebidas:', scenes.length)
      console.log('Automações Tuya recebidas:', automations.length)

      if (!Array.isArray(devices)) {
        console.error('devices não é um array:', devices)
        throw new Error('Formato de resposta inválido da API Tuya')
      }

      const syncedDevices = devices.map(device => {
        const functions = Array.isArray(device.functions) 
          ? device.functions.filter(f => f !== null && f !== undefined)
          : []
        
        const mappedDevice = {
          id: device.id || '',
          name: device.name || 'Dispositivo sem nome',
          type: this.mapTuyaDeviceType(device.category) || 'other',
          brand: 'Tuya',
          model: device.model || 'N/A',
          room: 'Não especificado',
          status: device.online ? 'active' : 'inactive',
          capabilities: this.mapTuyaCapabilities(functions),
          alexaCompatible: true,
          googleCompatible: true,
          tuyaDeviceId: device.id || '',
          tuyaCategory: device.category || '',
          tuyaFunctions: functions,
          lastSync: new Date().toISOString()
        }
        
        Object.keys(mappedDevice).forEach(key => {
          if (mappedDevice[key] === undefined) {
            delete mappedDevice[key]
          }
        })
        
        return mappedDevice
      })

      const syncedScenes = Array.isArray(scenes) ? scenes.map(scene => {
        const mappedScene = {
          id: scene.id || scene.scene_id || '',
          name: scene.name || 'Cena sem nome',
          enabled: scene.enabled !== undefined ? scene.enabled : true,
          actions: scene.actions || [],
          lastSync: new Date().toISOString()
        }
        
        Object.keys(mappedScene).forEach(key => {
          if (mappedScene[key] === undefined) {
            delete mappedScene[key]
          }
        })
        
        return mappedScene
      }) : []

      const syncedAutomations = Array.isArray(automations) ? automations.map(automation => {
        const mappedAutomation = {
          id: automation.id || automation.automation_id || '',
          name: automation.name || 'Automação sem nome',
          enabled: automation.enabled !== undefined ? automation.enabled : true,
          conditions: automation.conditions || [],
          actions: automation.actions || [],
          lastSync: new Date().toISOString()
        }
        
        Object.keys(mappedAutomation).forEach(key => {
          if (mappedAutomation[key] === undefined) {
            delete mappedAutomation[key]
          }
        })
        
        return mappedAutomation
      }) : []

      return {
        devices: syncedDevices,
        scenes: syncedScenes,
        automations: syncedAutomations
      }
    } catch (error) {
      console.error('Erro ao sincronizar dispositivos:', error)
      throw new Error('Falha na sincronização de dispositivos')
    }
  }

  // Mapear tipo de dispositivo da Tuya para o sistema
  mapTuyaDeviceType(category) {
    const typeMap = {
      'kg': 'light', // Lâmpada
      'cz': 'socket', // Tomada
      'wsdcg': 'sensor', // Sensor de temperatura e umidade
      'pir': 'sensor', // Sensor de movimento
      'ipc': 'camera', // Câmera IP
      'jsq': 'switch', // Interruptor
      'ywbj': 'smoke_detector', // Detector de fumaça
      'mcs': 'door_sensor', // Sensor de porta/janela
      'cl': 'curtain', // Cortina
      'kt': 'air_conditioner', // Ar condicionado
      'dj': 'fan', // Ventilador
      'wk': 'remote_control', // Controle remoto universal
      'pc': 'power_strip', // Régua de energia
      'dlq': 'circuit_breaker', // Disjuntor
      'bell': 'doorbell', // Campainha
      'sp': 'speaker', // Alto-falante
      'sd': 'water_detector', // Detector de água
      'pm2.5': 'air_quality_sensor', // Sensor de qualidade do ar
      'co2': 'co2_sensor', // Sensor de CO2
      'voc': 'voc_sensor', // Sensor de VOC
      'ch4': 'gas_sensor', // Sensor de gás
      'hps': 'siren', // Sirene
      'mmc': 'lock', // Fechadura inteligente
      'cjj': 'humidifier', // Umidificador
      'yag': 'heater', // Aquecedor
      'fs': 'water_valve', // Válvula de água
      'zndb': 'smart_meter', // Medidor inteligente
      'jlb': 'feeder', // Alimentador de animais
      'cw': 'pet_feeder', // Alimentador de animais de estimação
      'ms': 'massage_chair', // Cadeira de massagem
      'dd': 'electric_blanket', // Cobertor elétrico
      'yq': 'projector', // Projetor
      'sf': 'air_purifier', // Purificador de ar
      'czj': 'charging_pile', // Carregador de carro elétrico
      'hly': 'water_heater', // Aquecedor de água
      'bh': 'baby_monitor', // Monitor de bebê
      'cwj': 'pet_water_fountain', // Fonte de água para animais de estimação
      'yjs': 'smart_lock', // Fechadura inteligente
      'znh': 'smart_display', // Display inteligente
      'znkg': 'smart_switch', // Interruptor inteligente
      'zncz': 'smart_socket', // Tomada inteligente
      'znyl': 'smart_curtain', // Cortina inteligente
      'znkt': 'smart_air_conditioner', // Ar condicionado inteligente
      'znfs': 'smart_fan', // Ventilador inteligente
      'znwk': 'smart_remote_control', // Controle remoto inteligente
      'znpm2.5': 'smart_air_quality_sensor', // Sensor de qualidade do ar inteligente
      'znco2': 'smart_co2_sensor', // Sensor de CO2 inteligente
      'znvoc': 'smart_voc_sensor', // Sensor de VOC inteligente
      'znch4': 'smart_gas_sensor', // Sensor de gás inteligente
      'znhps': 'smart_siren', // Sirene inteligente
      'znmmc': 'smart_lock', // Fechadura inteligente
      'zncjj': 'smart_humidifier', // Umidificador inteligente
      'znyag': 'smart_heater', // Aquecedor inteligente
      'znfs2': 'smart_water_valve', // Válvula de água inteligente
      'znzndb': 'smart_smart_meter', // Medidor inteligente
      'znjlb': 'smart_feeder', // Alimentador de animais inteligente
      'zncw': 'smart_pet_feeder', // Alimentador de animais de estimação inteligente
      'znms': 'smart_massage_chair', // Cadeira de massagem inteligente
      'zndd': 'smart_electric_blanket', // Cobertor elétrico inteligente
      'znyq': 'smart_projector', // Projetor inteligente
      'znsf': 'smart_air_purifier', // Purificador de ar inteligente
      'znczj': 'smart_charging_pile', // Carregador de carro elétrico inteligente
      'znhly': 'smart_water_heater', // Aquecedor de água inteligente
      'znbh': 'smart_baby_monitor', // Monitor de bebê inteligente
      'zncwj': 'smart_pet_water_fountain', // Fonte de água para animais de estimação inteligente
      'znyjs': 'smart_smart_lock', // Fechadura inteligente
      'znznh': 'smart_smart_display' // Display inteligente
    }
    return typeMap[category] || 'other'
  }

  // Mapear capacidades da Tuya para o sistema
  mapTuyaCapabilities(functions) {
    const capabilities = {}
    if (functions && Array.isArray(functions)) {
      functions.forEach(func => {
        if (func && func.code) {
          capabilities[func.code] = {
            type: func.type || '',
            values: func.values || []
          }
        }
      })
    }
    return capabilities
  }

  // Controlar um dispositivo
  async controlDevice(deviceId, command, value) {
    try {
      const response = await this.makeRequest('POST', `/v1.0/devices/${deviceId}/commands`, {
        commands: [{ code: command, value: value }]
      })
      return response.data
    } catch (error) {
      console.error('Erro ao controlar dispositivo:', error)
      throw new Error('Falha ao controlar dispositivo')
    }
  }
}

export default new TuyaApiService()
