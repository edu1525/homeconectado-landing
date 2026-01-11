import axios from 'axios';
import CryptoJS from 'crypto-js';

export class TuyaService {
  private baseURL: string;
  private appClientId: string;
  private appClientSecret: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.baseURL = 'https://openapi.tuyaus.com';
    this.appClientId = process.env.TUYA_APP_CLIENT_ID || 'your_app_client_id';
    this.appClientSecret = process.env.TUYA_APP_CLIENT_SECRET || 'your_app_client_secret';
  }

  // Gerar assinatura para autenticação
  private generateSignature(method: string, url: string, body: string = '', timestamp: string): string {
    const stringToSign = method + '\n' + CryptoJS.MD5(body).toString() + '\n' + '\n' + url;
    const signStr = this.appClientId + (this.accessToken || '') + timestamp + stringToSign;
    return CryptoJS.HmacSHA256(signStr, this.appClientSecret).toString().toUpperCase();
  }

  // Fazer requisição autenticada para a API da Tuya
  private async makeRequest(method: string, endpoint: string, data: any = null): Promise<any> {
    const timestamp = Date.now().toString();
    const url = this.baseURL + endpoint;
    const body = data ? JSON.stringify(data) : '';
    
    const signature = this.generateSignature(method, endpoint, body, timestamp);
    
    const headers = {
      'client_id': this.appClientId,
      'access_token': this.accessToken || '',
      'sign': signature,
      't': timestamp,
      'sign_method': 'HMAC-SHA256',
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios({
        method,
        url,
        headers,
        data: data
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro na requisição Tuya:', error.response?.data || error.message);
      throw error;
    }
  }

  // Autenticar e obter token de acesso usando credenciais do cliente
  async authenticate(clientCredentials: { username: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.baseURL}/v1.0/token`, {
        grant_type: 'password',
        username: clientCredentials.username,
        password: clientCredentials.password,
        client_id: this.appClientId,
        client_secret: this.appClientSecret
      });

      this.accessToken = response.data.access_token || '';
      this.refreshToken = response.data.refresh_token || '';
      
      return {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresIn: response.data.expires_in
      };
    } catch (error: any) {
      console.error('Erro na autenticação Tuya:', error.response?.data || error.message);
      throw new Error('Falha na autenticação com a Tuya');
    }
  }

  // Renovar token de acesso
  async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('Refresh token não disponível');
    }
    try {
      const response = await axios.post(`${this.baseURL}/v1.0/token/${this.refreshToken}`, {
        grant_type: 'refresh_token',
        client_id: this.appClientId,
        client_secret: this.appClientSecret
      });
      this.accessToken = response.data.access_token || '';
      this.refreshToken = response.data.refresh_token || '';
      return this.accessToken || '';
    } catch (error: any) {
      console.error('Erro ao renovar token Tuya:', error.response?.data || error.message);
      throw new Error('Falha ao renovar token de acesso Tuya');
    }
  }

  // Obter lista de dispositivos
  async getDevices(): Promise<any> {
    return this.makeRequest('GET', '/v1.0/users/home/devices');
  }

  // Obter status de um dispositivo
  async getDeviceStatus(deviceId: string): Promise<any> {
    try {
      const response = await this.makeRequest('GET', `/v1.0/devices/${deviceId}/status`);
      return response.result;
    } catch (error: any) {
      console.error('Erro ao obter status do dispositivo:', error);
      throw new Error('Falha ao obter status do dispositivo');
    }
  }

  // Sincronizar dispositivos do cliente
  async syncClientDevices(clientId: string, tuyaCredentials: { username: string; password: string }): Promise<any[]> {
    try {
      // Autenticar com as credenciais do cliente
      await this.authenticate(tuyaCredentials);
      
      // Obter dispositivos da Tuya
      const tuyaDevices = await this.getDevices();
      
      // Converter dispositivos da Tuya para formato do sistema
      const syncedDevices = tuyaDevices.map((device: any) => ({
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
      }));

      return syncedDevices;
    } catch (error: any) {
      console.error('Erro ao sincronizar dispositivos:', error);
      throw new Error('Falha na sincronização de dispositivos');
    }
  }

  // Mapear tipo de dispositivo da Tuya para o sistema
  private mapTuyaDeviceType(category: string): string {
    const typeMap: { [key: string]: string } = {
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
    };
    return typeMap[category] || 'other';
  }

  // Mapear capacidades da Tuya para o sistema
  private mapTuyaCapabilities(functions: any[]): { [key: string]: any } {
    const capabilities: { [key: string]: any } = {};
    if (functions) {
      functions.forEach(func => {
        capabilities[func.code] = {
          type: func.type,
          values: func.values
        };
      });
    }
    return capabilities;
  }

  // Controlar um dispositivo
  async controlDevice(deviceId: string, command: string, value: any): Promise<any> {
    try {
      const response = await this.makeRequest('POST', `/v1.0/devices/${deviceId}/commands`, {
        commands: [{ code: command, value: value }]
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao controlar dispositivo:', error);
      throw new Error('Falha ao controlar dispositivo');
    }
  }
}
