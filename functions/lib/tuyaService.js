"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuyaService = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_js_1 = __importDefault(require("crypto-js"));
class TuyaService {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
        this.baseURL = 'https://openapi.tuyaus.com';
        this.appClientId = process.env.TUYA_APP_CLIENT_ID || 'your_app_client_id';
        this.appClientSecret = process.env.TUYA_APP_CLIENT_SECRET || 'your_app_client_secret';
    }
    // Gerar assinatura para autenticação
    generateSignature(method, url, body = '', timestamp) {
        const stringToSign = method + '\n' + crypto_js_1.default.MD5(body).toString() + '\n' + '\n' + url;
        const signStr = this.appClientId + (this.accessToken || '') + timestamp + stringToSign;
        return crypto_js_1.default.HmacSHA256(signStr, this.appClientSecret).toString().toUpperCase();
    }
    // Fazer requisição autenticada para a API da Tuya
    async makeRequest(method, endpoint, data = null) {
        var _a;
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
            const response = await (0, axios_1.default)({
                method,
                url,
                headers,
                data: data
            });
            return response.data;
        }
        catch (error) {
            console.error('Erro na requisição Tuya:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw error;
        }
    }
    // Autenticar e obter token de acesso usando credenciais do cliente
    async authenticate(clientCredentials) {
        var _a;
        try {
            const response = await axios_1.default.post(`${this.baseURL}/v1.0/token`, {
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
        }
        catch (error) {
            console.error('Erro na autenticação Tuya:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error('Falha na autenticação com a Tuya');
        }
    }
    // Renovar token de acesso
    async refreshAccessToken() {
        var _a;
        if (!this.refreshToken) {
            throw new Error('Refresh token não disponível');
        }
        try {
            const response = await axios_1.default.post(`${this.baseURL}/v1.0/token/${this.refreshToken}`, {
                grant_type: 'refresh_token',
                client_id: this.appClientId,
                client_secret: this.appClientSecret
            });
            this.accessToken = response.data.access_token || '';
            this.refreshToken = response.data.refresh_token || '';
            return this.accessToken || '';
        }
        catch (error) {
            console.error('Erro ao renovar token Tuya:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error('Falha ao renovar token de acesso Tuya');
        }
    }
    // Obter lista de dispositivos
    async getDevices() {
        return this.makeRequest('GET', '/v1.0/users/home/devices');
    }
    // Obter status de um dispositivo
    async getDeviceStatus(deviceId) {
        try {
            const response = await this.makeRequest('GET', `/v1.0/devices/${deviceId}/status`);
            return response.result;
        }
        catch (error) {
            console.error('Erro ao obter status do dispositivo:', error);
            throw new Error('Falha ao obter status do dispositivo');
        }
    }
    // Sincronizar dispositivos do cliente
    async syncClientDevices(clientId, tuyaCredentials) {
        try {
            // Autenticar com as credenciais do cliente
            await this.authenticate(tuyaCredentials);
            // Obter dispositivos da Tuya
            const tuyaDevices = await this.getDevices();
            // Converter dispositivos da Tuya para formato do sistema
            const syncedDevices = tuyaDevices.map((device) => ({
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
        }
        catch (error) {
            console.error('Erro ao sincronizar dispositivos:', error);
            throw new Error('Falha na sincronização de dispositivos');
        }
    }
    // Mapear tipo de dispositivo da Tuya para o sistema
    mapTuyaDeviceType(category) {
        const typeMap = {
            'kg': 'light',
            'cz': 'socket',
            'wsdcg': 'sensor',
            'pir': 'sensor',
            'ipc': 'camera',
            'jsq': 'switch',
            'ywbj': 'smoke_detector',
            'mcs': 'door_sensor',
            'cl': 'curtain',
            'kt': 'air_conditioner',
            'dj': 'fan',
            'wk': 'remote_control',
            'pc': 'power_strip',
            'dlq': 'circuit_breaker',
            'bell': 'doorbell',
            'sp': 'speaker',
            'sd': 'water_detector',
            'pm2.5': 'air_quality_sensor',
            'co2': 'co2_sensor',
            'voc': 'voc_sensor',
            'ch4': 'gas_sensor',
            'hps': 'siren',
            'mmc': 'lock',
            'cjj': 'humidifier',
            'yag': 'heater',
            'fs': 'water_valve',
            'zndb': 'smart_meter',
            'jlb': 'feeder',
            'cw': 'pet_feeder',
            'ms': 'massage_chair',
            'dd': 'electric_blanket',
            'yq': 'projector',
            'sf': 'air_purifier',
            'czj': 'charging_pile',
            'hly': 'water_heater',
            'bh': 'baby_monitor',
            'cwj': 'pet_water_fountain',
            'yjs': 'smart_lock',
            'znh': 'smart_display',
            'znkg': 'smart_switch',
            'zncz': 'smart_socket',
            'znyl': 'smart_curtain',
            'znkt': 'smart_air_conditioner',
            'znfs': 'smart_fan',
            'znwk': 'smart_remote_control',
            'znpm2.5': 'smart_air_quality_sensor',
            'znco2': 'smart_co2_sensor',
            'znvoc': 'smart_voc_sensor',
            'znch4': 'smart_gas_sensor',
            'znhps': 'smart_siren',
            'znmmc': 'smart_lock',
            'zncjj': 'smart_humidifier',
            'znyag': 'smart_heater',
            'znfs2': 'smart_water_valve',
            'znzndb': 'smart_smart_meter',
            'znjlb': 'smart_feeder',
            'zncw': 'smart_pet_feeder',
            'znms': 'smart_massage_chair',
            'zndd': 'smart_electric_blanket',
            'znyq': 'smart_projector',
            'znsf': 'smart_air_purifier',
            'znczj': 'smart_charging_pile',
            'znhly': 'smart_water_heater',
            'znbh': 'smart_baby_monitor',
            'zncwj': 'smart_pet_water_fountain',
            'znyjs': 'smart_smart_lock',
            'znznh': 'smart_smart_display' // Display inteligente
        };
        return typeMap[category] || 'other';
    }
    // Mapear capacidades da Tuya para o sistema
    mapTuyaCapabilities(functions) {
        const capabilities = {};
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
    async controlDevice(deviceId, command, value) {
        try {
            const response = await this.makeRequest('POST', `/v1.0/devices/${deviceId}/commands`, {
                commands: [{ code: command, value: value }]
            });
            return response.data;
        }
        catch (error) {
            console.error('Erro ao controlar dispositivo:', error);
            throw new Error('Falha ao controlar dispositivo');
        }
    }
}
exports.TuyaService = TuyaService;
//# sourceMappingURL=tuyaService.js.map