import CryptoJS from 'crypto-js'

class EncryptionService {
  constructor() {
    // Chave de criptografia baseada em uma chave secreta do sistema
    // Em produção, isso deve vir de variáveis de ambiente seguras
    this.secretKey = import.meta.env.VITE_ENCRYPTION_KEY || 'home-conectado-secret-key-2025'
    console.log('Chave de criptografia:', this.secretKey?.substring(0, 10) + '...')
  }

  // Criptografar dados sensíveis
  encrypt(data) {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString()
      return encrypted
    } catch (error) {
      console.error('Erro ao criptografar dados:', error)
      throw new Error('Falha na criptografia')
    }
  }

  // Descriptografar dados sensíveis
  decrypt(encryptedData) {
    try {
      console.log('Tentando descriptografar:', typeof encryptedData, encryptedData?.substring(0, 50))
      
      if (!encryptedData || typeof encryptedData !== 'string') {
        throw new Error('Dados criptografados inválidos')
      }
      
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey)
      const decrypted = bytes.toString(CryptoJS.enc.Utf8)
      
      console.log('Dados descriptografados:', decrypted?.substring(0, 100))
      
      if (!decrypted) {
        throw new Error('Falha na descriptografia - resultado vazio')
      }
      
      return JSON.parse(decrypted)
    } catch (error) {
      console.error('Erro ao descriptografar dados:', error)
      throw new Error('Falha na descriptografia')
    }
  }

  encryptTuyaCredentials(credentials) {
    const dataToEncrypt = {
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret,
      uid: credentials.uid,
      timestamp: Date.now()
    }
    
    return this.encrypt(dataToEncrypt)
  }

  decryptTuyaCredentials(encryptedCredentials) {
    const decrypted = this.decrypt(encryptedCredentials)
    
    const maxAge = 30 * 24 * 60 * 60 * 1000
    if (Date.now() - decrypted.timestamp > maxAge) {
      console.warn('Credenciais Tuya podem estar desatualizadas')
    }
    
    return {
      clientId: decrypted.clientId,
      clientSecret: decrypted.clientSecret,
      uid: decrypted.uid
    }
  }

  // Gerar hash para verificação de integridade
  generateHash(data) {
    return CryptoJS.SHA256(JSON.stringify(data)).toString()
  }

  // Verificar integridade dos dados
  verifyIntegrity(data, hash) {
    const currentHash = this.generateHash(data)
    return currentHash === hash
  }
}

export default new EncryptionService()
