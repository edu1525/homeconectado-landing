// Mock service para demonstração da integração Tuya
// Este serviço simula a API da Tuya para desenvolvimento local

class TuyaMockService {
  constructor() {
    this.baseURL = '/api/tuya'
    this.appClientId = import.meta.env.VITE_TUYA_APP_CLIENT_ID || 'demo_app_client_id'
    this.appClientSecret = import.meta.env.VITE_TUYA_APP_CLIENT_SECRET || 'demo_app_client_secret'
    this.accessToken = null
    this.refreshToken = null
  }

  // Simular autenticação
  async authenticate(clientCredentials) {
    try {
      // Simular delay da rede
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar credenciais de demonstração
      if (clientCredentials.username === 'demo@tuya.com' && clientCredentials.password === 'demo123') {
        this.accessToken = 'mock_access_token_' + Date.now()
        this.refreshToken = 'mock_refresh_token_' + Date.now()
        
        return {
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
          expiresIn: 3600
        }
      } else {
        throw new Error('Credenciais inválidas. Use: demo@tuya.com / demo123')
      }
    } catch (error) {
      console.error('Erro na autenticação Tuya Mock:', error)
      throw new Error('Falha na autenticação com a Tuya')
    }
  }

  // Simular obtenção de dispositivos
  async getDevices() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Dispositivos simulados
      return [
        {
          id: 'mock_device_1',
          name: 'Lâmpada da Sala',
          category: 'kg',
          model: 'Smart Bulb RGB',
          online: true,
          functions: [
            { code: 'switch_led', name: 'Liga/Desliga' },
            { code: 'bright_value', name: 'Brilho' },
            { code: 'colour_data', name: 'Cor' }
          ]
        },
        {
          id: 'mock_device_2',
          name: 'Sensor de Movimento',
          category: 'pir',
          model: 'Motion Sensor',
          online: true,
          functions: [
            { code: 'motion_sense', name: 'Detecção de Movimento' }
          ]
        },
        {
          id: 'mock_device_3',
          name: 'Alto-falante Inteligente',
          category: 'sp',
          model: 'Smart Speaker',
          online: false,
          functions: [
            { code: 'switch', name: 'Liga/Desliga' },
            { code: 'volume', name: 'Volume' }
          ]
        },
        {
          id: 'mock_device_4',
          name: 'Câmera de Segurança',
          category: 'ms',
          model: 'Security Camera',
          online: true,
          functions: [
            { code: 'switch', name: 'Liga/Desliga' },
            { code: 'recording', name: 'Gravação' }
          ]
        }
      ]
    } catch (error) {
      console.error('Erro ao obter dispositivos Mock:', error)
      throw new Error('Falha ao obter dispositivos')
    }
  }

  // Simular controle de dispositivo
  async controlDevice(deviceId, command, value) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      console.log(`Mock: Controlando dispositivo ${deviceId} - ${command}: ${value}`)
      
      return {
        success: true,
        result: {
          deviceId,
          command,
          value,
          timestamp: new Date().toISOString()
        }
      }
    } catch (error) {
      console.error('Erro ao controlar dispositivo Mock:', error)
      throw new Error('Falha ao controlar dispositivo')
    }
  }

  // Simular status do dispositivo
  async getDeviceStatus(deviceId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // Status simulado baseado no dispositivo
      const status = {
        switch_led: { value: Math.random() > 0.5 },
        bright_value: { value: Math.floor(Math.random() * 100) },
        colour_data: { value: '#FF0000' },
        motion_sense: { value: Math.random() > 0.7 },
        volume: { value: Math.floor(Math.random() * 100) },
        recording: { value: Math.random() > 0.5 }
      }
      
      return status
    } catch (error) {
      console.error('Erro ao obter status do dispositivo Mock:', error)
      throw new Error('Falha ao obter status do dispositivo')
    }
  }

  // Simular sincronização de dispositivos
  async syncClientDevices(clientId, tuyaCredentials) {
    try {
      // Autenticar primeiro
      await this.authenticate(tuyaCredentials)
      
      // Obter dispositivos
      const tuyaDevices = await this.getDevices()
      
      // Converter para formato do sistema
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
      console.error('Erro ao sincronizar dispositivos Mock:', error)
      throw new Error('Falha na sincronização de dispositivos')
    }
  }

  // Mapear tipo de dispositivo
  mapTuyaDeviceType(category) {
    const typeMap = {
      'kg': 'light',
      'pir': 'sensor',
      'sp': 'speaker',
      'ms': 'camera',
      'cz': 'switch',
      'kt': 'thermostat'
    }
    return typeMap[category] || 'other'
  }

  // Mapear capacidades
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
        case 'bright_value':
          capabilities.push('brightness')
          break
        case 'colour_data':
          capabilities.push('color')
          break
        case 'motion_sense':
          capabilities.push('motion_detection')
          break
        case 'volume':
          capabilities.push('volume')
          break
        case 'recording':
          capabilities.push('recording')
          break
      }
    })

    return capabilities.length > 0 ? capabilities : ['on_off']
  }
}

export default new TuyaMockService()
