"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectTuya = exports.getTuyaDeviceStatus = exports.controlTuyaDevice = exports.syncTuyaDevices = exports.authenticateTuya = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const tuyaService_1 = require("./tuyaService");
const crypto_js_1 = __importDefault(require("crypto-js"));
const cors = __importStar(require("cors"));
// Inicializar Firebase Admin
admin.initializeApp();
const db = admin.firestore();
const tuyaService = new tuyaService_1.TuyaService();
// Configurar CORS
const corsHandler = cors.default({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://home-conectado-platform.web.app',
        'https://home-conectado-platform.firebaseapp.com'
    ],
    credentials: true
});
// Função para autenticar com a Tuya
exports.authenticateTuya = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, async () => {
        try {
            // Verificar se o usuário está autenticado
            if (!req.headers.authorization) {
                return res.status(401).json({ error: 'Token de autenticação necessário' });
            }
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: 'Username e password são obrigatórios' });
            }
            // Autenticar com a Tuya
            const authResult = await tuyaService.authenticate({ username, password });
            // Criptografar credenciais
            const secretKey = process.env.ENCRYPTION_KEY || 'home-conectado-secret-key-2025';
            const encryptedCredentials = crypto_js_1.default.AES.encrypt(JSON.stringify({ username, password, timestamp: Date.now() }), secretKey).toString();
            // Salvar credenciais criptografadas no Firestore
            const userId = req.headers['x-user-id'];
            await db.collection('users').doc(userId).update({
                tuyaConnected: true,
                tuyaCredentialsEncrypted: encryptedCredentials,
                tuyaConnectedAt: new Date().toISOString(),
                lastSync: new Date().toISOString()
            });
            return res.json({
                success: true,
                message: 'Conta Tuya conectada com sucesso!',
                accessToken: authResult.accessToken,
                expiresIn: authResult.expiresIn
            });
        }
        catch (error) {
            console.error('Erro na autenticação Tuya:', error);
            return res.status(500).json({ error: 'Falha na autenticação com a Tuya' });
        }
    });
});
// Função para sincronizar dispositivos Tuya
exports.syncTuyaDevices = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, async () => {
        try {
            // Verificar se o usuário está autenticado
            if (!req.headers.authorization) {
                return res.status(401).json({ error: 'Token de autenticação necessário' });
            }
            // Obter dados do usuário
            const userId = req.headers['x-user-id'];
            const userDoc = await db.collection('users').doc(userId).get();
            if (!userDoc.exists) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            const userData = userDoc.data();
            if (!(userData === null || userData === void 0 ? void 0 : userData.tuyaConnected) || !(userData === null || userData === void 0 ? void 0 : userData.tuyaCredentialsEncrypted)) {
                return res.status(400).json({ error: 'Usuário não possui conta Tuya conectada' });
            }
            // Descriptografar credenciais
            const secretKey = process.env.ENCRYPTION_KEY || 'home-conectado-secret-key-2025';
            const decryptedBytes = crypto_js_1.default.AES.decrypt(userData.tuyaCredentialsEncrypted, secretKey);
            const tuyaCredentials = JSON.parse(decryptedBytes.toString(crypto_js_1.default.enc.Utf8));
            // Sincronizar dispositivos
            const syncedDevices = await tuyaService.syncClientDevices(userId, {
                username: tuyaCredentials.username,
                password: tuyaCredentials.password
            });
            // Salvar dispositivos no Firestore
            await db.collection('users').doc(userId).update({
                tuyaDevices: syncedDevices,
                lastSync: new Date().toISOString()
            });
            return res.json({
                success: true,
                message: `${syncedDevices.length} dispositivos sincronizados com sucesso!`,
                devices: syncedDevices
            });
        }
        catch (error) {
            console.error('Erro ao sincronizar dispositivos Tuya:', error);
            return res.status(500).json({ error: 'Falha na sincronização de dispositivos' });
        }
    });
});
// Função para controlar dispositivo Tuya
exports.controlTuyaDevice = functions.https.onCall(async (data, context) => {
    try {
        // Verificar se o usuário está autenticado
        if (!context.auth) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado');
        }
        const { deviceId, command, value } = data;
        if (!deviceId || !command) {
            throw new functions.https.HttpsError('invalid-argument', 'deviceId e command são obrigatórios');
        }
        // Obter dados do usuário
        const userDoc = await db.collection('users').doc(context.auth.uid).get();
        if (!userDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Usuário não encontrado');
        }
        const userData = userDoc.data();
        if (!(userData === null || userData === void 0 ? void 0 : userData.tuyaConnected) || !(userData === null || userData === void 0 ? void 0 : userData.tuyaCredentialsEncrypted)) {
            throw new functions.https.HttpsError('failed-precondition', 'Usuário não possui conta Tuya conectada');
        }
        // Descriptografar credenciais
        const secretKey = process.env.ENCRYPTION_KEY || 'home-conectado-secret-key-2025';
        const decryptedBytes = crypto_js_1.default.AES.decrypt(userData.tuyaCredentialsEncrypted, secretKey);
        const tuyaCredentials = JSON.parse(decryptedBytes.toString(crypto_js_1.default.enc.Utf8));
        // Autenticar com credenciais do usuário
        await tuyaService.authenticate({
            username: tuyaCredentials.username,
            password: tuyaCredentials.password
        });
        // Controlar dispositivo
        const result = await tuyaService.controlDevice(deviceId, command, value);
        return {
            success: true,
            message: 'Comando enviado com sucesso!',
            result
        };
    }
    catch (error) {
        console.error('Erro ao controlar dispositivo Tuya:', error);
        throw new functions.https.HttpsError('internal', 'Falha ao controlar dispositivo');
    }
});
// Função para obter status do dispositivo Tuya
exports.getTuyaDeviceStatus = functions.https.onCall(async (data, context) => {
    try {
        // Verificar se o usuário está autenticado
        if (!context.auth) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado');
        }
        const { deviceId } = data;
        if (!deviceId) {
            throw new functions.https.HttpsError('invalid-argument', 'deviceId é obrigatório');
        }
        // Obter dados do usuário
        const userDoc = await db.collection('users').doc(context.auth.uid).get();
        if (!userDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Usuário não encontrado');
        }
        const userData = userDoc.data();
        if (!(userData === null || userData === void 0 ? void 0 : userData.tuyaConnected) || !(userData === null || userData === void 0 ? void 0 : userData.tuyaCredentialsEncrypted)) {
            throw new functions.https.HttpsError('failed-precondition', 'Usuário não possui conta Tuya conectada');
        }
        // Descriptografar credenciais
        const secretKey = process.env.ENCRYPTION_KEY || 'home-conectado-secret-key-2025';
        const decryptedBytes = crypto_js_1.default.AES.decrypt(userData.tuyaCredentialsEncrypted, secretKey);
        const tuyaCredentials = JSON.parse(decryptedBytes.toString(crypto_js_1.default.enc.Utf8));
        // Autenticar com credenciais do usuário
        await tuyaService.authenticate({
            username: tuyaCredentials.username,
            password: tuyaCredentials.password
        });
        // Obter status do dispositivo
        const status = await tuyaService.getDeviceStatus(deviceId);
        return {
            success: true,
            status
        };
    }
    catch (error) {
        console.error('Erro ao obter status do dispositivo Tuya:', error);
        throw new functions.https.HttpsError('internal', 'Falha ao obter status do dispositivo');
    }
});
// Função para desconectar conta Tuya
exports.disconnectTuya = functions.https.onCall(async (data, context) => {
    try {
        // Verificar se o usuário está autenticado
        if (!context.auth) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuário não autenticado');
        }
        // Remover credenciais do Firestore
        await db.collection('users').doc(context.auth.uid).update({
            tuyaConnected: false,
            tuyaCredentialsEncrypted: null,
            tuyaConnectedAt: null,
            lastSync: null,
            tuyaDevices: []
        });
        return {
            success: true,
            message: 'Conta Tuya desconectada com sucesso!'
        };
    }
    catch (error) {
        console.error('Erro ao desconectar conta Tuya:', error);
        throw new functions.https.HttpsError('internal', 'Falha ao desconectar conta Tuya');
    }
});
//# sourceMappingURL=index.js.map