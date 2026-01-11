import axios from 'axios'
import CryptoJS from 'crypto-js'

class TuyaService {
  constructor() {
    // Usar proxy do Vite para contornar CORS
    this.baseURL = '/api/tuya'
    // Credenciais da aplicação (não do cliente)
    this.appClientId = import.meta.env.VITE_TUYA_APP_CLIENT_ID || 'your_app_client_id'
    this.appClientSecret = import.meta.env.VITE_TUYA_APP_CLIENT_SECRET || 'your_app_client_secret'
    this.accessToken = null
    this.refreshToken = null
  }

  // Gerar assinatura para autenticação
  generateSignature(method, url, body = '', timestamp) {
    const stringToSign = method + '\n' + CryptoJS.MD5(body).toString() + '\n' + '\n' + url
    const signStr = this.appClientId + this.accessToken + timestamp + stringToSign
    return CryptoJS.HmacSHA256(signStr, this.appClientSecret).toString().toUpperCase()
  }

  // Fazer requisição autenticada para a API da Tuya
  async makeRequest(method, endpoint, data = null) {
    const timestamp = Date.now().toString()
    const url = this.baseURL + endpoint
    const body = data ? JSON.stringify(data) : ''
    
    const signature = this.generateSignature(method, endpoint, body, timestamp)
    
    const headers = {
      'client_id': this.appClientId,
      'access_token': this.accessToken,
      'sign': signature,
      't': timestamp,
      'sign_method': 'HMAC-SHA256',
      'Content-Type': 'application/json'
    }

    try {
      const response = await axios({
        method,
        url,
        headers,
        data: data ? JSON.stringify(data) : undefined
      })
      
      return response.data
    } catch (error) {
      console.error('Erro na requisição Tuya:', error.response?.data || error.message)
      throw error
    }
  }

  // Autenticar e obter token de acesso usando credenciais do cliente
  async authenticate(clientCredentials) {
    try {
      const response = await axios.post(`${this.baseURL}/v1.0/token`, {
        grant_type: 'password',
        username: clientCredentials.username,
        password: clientCredentials.password,
        client_id: this.appClientId,
        client_secret: this.appClientSecret
      })

      this.accessToken = response.data.access_token
      this.refreshToken = response.data.refresh_token
      
      return {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresIn: response.data.expires_in
      }
    } catch (error) {
      console.error('Erro na autenticação Tuya:', error.response?.data || error.message)
      throw new Error('Falha na autenticação com a Tuya')
    }
  }

  // Renovar token de acesso
  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('Refresh token não disponível')
    }

    try {
      const response = await axios.post(`${this.baseURL}/v1.0/token/${this.refreshToken}`)
      
      this.accessToken = response.data.access_token
      this.refreshToken = response.data.refresh_token
      
      return {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresIn: response.data.expires_in
      }
    } catch (error) {
      console.error('Erro ao renovar token Tuya:', error.response?.data || error.message)
      throw new Error('Falha ao renovar token de acesso')
    }
  }

  // Obter lista de dispositivos do usuário
  async getDevices() {
    try {
      const response = await this.makeRequest('GET', '/v1.0/iot-03/devices')
      return response.result || []
    } catch (error) {
      console.error('Erro ao obter dispositivos Tuya:', error)
      throw new Error('Falha ao obter dispositivos')
    }
  }

  // Obter informações de um dispositivo específico
  async getDeviceInfo(deviceId) {
    try {
      const response = await this.makeRequest('GET', `/v1.0/iot-03/devices/${deviceId}`)
      return response.result
    } catch (error) {
      console.error('Erro ao obter informações do dispositivo:', error)
      throw new Error('Falha ao obter informações do dispositivo')
    }
  }

  // Enviar comando para um dispositivo
  async sendDeviceCommand(deviceId, commands) {
    try {
      const response = await this.makeRequest('POST', `/v1.0/iot-03/devices/${deviceId}/commands`, {
        commands
      })
      return response.result
    } catch (error) {
      console.error('Erro ao enviar comando para dispositivo:', error)
      throw new Error('Falha ao enviar comando')
    }
  }

  // Obter status de um dispositivo
  async getDeviceStatus(deviceId) {
    try {
      const response = await this.makeRequest('GET', `/v1.0/iot-03/devices/${deviceId}/status`)
      return response.result
    } catch (error) {
      console.error('Erro ao obter status do dispositivo:', error)
      throw new Error('Falha ao obter status do dispositivo')
    }
  }

  // Sincronizar dispositivos do cliente
  async syncClientDevices(clientId, tuyaCredentials) {
    try {
      // Autenticar com as credenciais do cliente
      await this.authenticate(tuyaCredentials)
      
      // Obter dispositivos da Tuya
      const tuyaDevices = await this.getDevices()
      
      // Converter dispositivos da Tuya para formato do sistema
      const syncedDevices = tuyaDevices.map(device => ({
        id: device.id,
        name: device.name,
        type: this.mapTuyaDeviceType(device.category),
        brand: 'Tuya',
        model: device.model,
        room: 'Não especificado',
        status: device.online ? 'active' : 'inactive',
        capabilities: this.mapTuyaCapabilities(device.functions),
        alexaCompatible: true,
        googleCompatible: true,
        tuyaDeviceId: device.id,
        tuyaCategory: device.category,
        tuyaFunctions: device.functions,
        lastSync: new Date().toISOString()
      }))

      return syncedDevices
    } catch (error) {
      console.error('Erro ao sincronizar dispositivos:', error)
      throw new Error('Falha na sincronização de dispositivos')
    }
  }

  // Mapear tipo de dispositivo da Tuya para o sistema
  mapTuyaDeviceType(category) {
    const typeMap = {
      'kg': 'light', // Lâmpada
      'dj': 'light', // Lâmpada
      'dd': 'light', // Lâmpada
      'fskg': 'light', // Lâmpada
      'sp': 'speaker', // Alto-falante
      'kt': 'thermostat', // Termostato
      'ms': 'camera', // Câmera
      'szjqr': 'camera', // Câmera
      'mcs': 'camera', // Câmera
      'wl': 'router', // Roteador
      'cz': 'switch', // Interruptor
      'pc': 'switch', // Interruptor
      'kg': 'switch', // Interruptor
      'tdq': 'sensor', // Sensor
      'pir': 'sensor', // Sensor de movimento
      'co2bj': 'sensor', // Sensor de CO2
      'pm25': 'sensor', // Sensor de PM2.5
      'wsdcg': 'sensor', // Sensor de temperatura/umidade
      'hjj': 'sensor', // Sensor de gás
      'ykq': 'remote', // Controle remoto
      'qt': 'other' // Outros
    }
    
    return typeMap[category] || 'other'
  }

  // Mapear capacidades da Tuya para o sistema
  mapTuyaCapabilities(functions) {
    const capabilities = []
    
    if (!functions || !Array.isArray(functions)) {
      return ['on_off']
    }

    functions.forEach(func => {
      switch (func.code) {
        case 'switch_led':
        case 'switch':
          capabilities.push('on_off')
          break
        case 'bright':
        case 'bright_value':
          capabilities.push('brightness')
          break
        case 'colour_data':
        case 'colour_data_v2':
          capabilities.push('color')
          break
        case 'temp_value':
          capabilities.push('temperature')
          break
        case 'humidity_value':
          capabilities.push('humidity')
          break
        case 'motion_sense':
          capabilities.push('motion_detection')
          break
        case 'recording':
          capabilities.push('recording')
          break
        case 'volume':
          capabilities.push('volume')
          break
        case 'mode':
          capabilities.push('mode')
          break
      }
    })

    return capabilities.length > 0 ? capabilities : ['on_off']
  }

  // Controlar dispositivo via Tuya
  async controlDevice(deviceId, command, value) {
    try {
      const commands = [{
        code: command,
        value: value
      }]

      const result = await this.sendDeviceCommand(deviceId, commands)
      return result
    } catch (error) {
      console.error('Erro ao controlar dispositivo:', error)
      throw new Error('Falha ao controlar dispositivo')
    }
  }

  // Obter estatísticas de uso do dispositivo
  async getDeviceUsageStats(deviceId, startTime, endTime) {
    try {
      const response = await this.makeRequest('GET', `/v1.0/iot-03/devices/${deviceId}/statistics`, {
        start_time: startTime,
        end_time: endTime
      })
      return response.result
    } catch (error) {
      console.error('Erro ao obter estatísticas do dispositivo:', error)
      throw new Error('Falha ao obter estatísticas')
    }
  }
}

export default new TuyaService()
