import React, { createContext, useContext, useState, useCallback } from 'react'
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import tuyaApiService from '../services/tuyaApiService'
import encryptionService from '../services/encryptionService'

const TuyaContext = createContext()

export const useTuya = () => {
  const context = useContext(TuyaContext)
  if (!context) {
    throw new Error('useTuya deve ser usado dentro de um TuyaProvider')
  }
  return context
}

export const TuyaProvider = ({ children }) => {
  const [tuyaConnected, setTuyaConnected] = useState(false)
  const [tuyaDevices, setTuyaDevices] = useState([])
  const [tuyaScenes, setTuyaScenes] = useState([])
  const [tuyaAutomations, setTuyaAutomations] = useState([])
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState(null)

  // Conectar conta Tuya do cliente
  const connectTuyaAccount = useCallback(async (clientId, appCredentials) => {
    try {
      setSyncing(true)
      setError(null)

      console.log('Autenticando com Tuya...')
      const authResult = await tuyaApiService.authenticate(appCredentials)
      console.log('Autenticação bem-sucedida!')

      const encryptedCredentials = encryptionService.encryptTuyaCredentials(appCredentials)

      const clientRef = doc(db, 'users', clientId)
      await updateDoc(clientRef, {
        tuyaConnected: true,
        tuyaCredentialsEncrypted: encryptedCredentials,
        tuyaUid: authResult.uid,
        tuyaConnectedAt: new Date().toISOString(),
        lastSync: new Date().toISOString()
      })

      setTuyaConnected(true)
      return { success: true, message: 'Conta Tuya conectada com sucesso!' }
    } catch (error) {
      console.error('Erro ao conectar conta Tuya:', error)
      setError('Falha ao conectar conta Tuya. Verifique suas credenciais.')
      return { success: false, message: 'Falha ao conectar conta Tuya' }
    } finally {
      setSyncing(false)
    }
  }, [])

  // Desconectar conta Tuya
  const disconnectTuyaAccount = useCallback(async (clientId) => {
    try {
      setSyncing(true)
      setError(null)

      // Remover credenciais do Firestore
      const clientRef = doc(db, 'users', clientId)
      await updateDoc(clientRef, {
        tuyaConnected: false,
        tuyaCredentialsEncrypted: null,
        tuyaConnectedAt: null,
        lastSync: null,
        tuyaDevices: [],
        tuyaScenes: [],
        tuyaAutomations: []
      })

      setTuyaConnected(false)
      setTuyaDevices([])
      setTuyaScenes([])
      setTuyaAutomations([])
      return { success: true, message: 'Conta Tuya desconectada com sucesso!' }
    } catch (error) {
      console.error('Erro ao desconectar conta Tuya:', error)
      setError('Falha ao desconectar conta Tuya')
      return { success: false, message: 'Falha ao desconectar conta Tuya' }
    } finally {
      setSyncing(false)
    }
  }, [])

  // Sincronizar dispositivos da Tuya
  const syncTuyaDevicesCallback = useCallback(async (clientId) => {
    try {
      setSyncing(true)
      setError(null)

      // Obter credenciais criptografadas do cliente
      const clientRef = doc(db, 'users', clientId)
      const clientDoc = await getDoc(clientRef)

      if (!clientDoc.exists()) {
        throw new Error('Cliente não encontrado')
      }

      const clientData = clientDoc.data()

      console.log('Dados do cliente:', clientData)
      
      if (!clientData.tuyaConnected || !clientData.tuyaCredentialsEncrypted) {
        throw new Error('Cliente não possui conta Tuya conectada')
      }

      console.log('Credenciais criptografadas:', clientData.tuyaCredentialsEncrypted?.substring(0, 50))

      let appCredentials
      try {
        appCredentials = encryptionService.decryptTuyaCredentials(clientData.tuyaCredentialsEncrypted)
      } catch (error) {
        console.error('Erro ao descriptografar credenciais:', error)
        throw new Error('Credenciais Tuya corrompidas. Por favor, reconecte sua conta Tuya.')
      }

      console.log('Sincronizando dispositivos Tuya...')
      const syncResult = await tuyaApiService.syncClientDevices(clientId, appCredentials)
      
      const syncedDevices = syncResult.devices || []
      const syncedScenes = syncResult.scenes || []
      const syncedAutomations = syncResult.automations || []
      
      console.log('Dispositivos sincronizados:', syncedDevices.length)
      console.log('Cenas sincronizadas:', syncedScenes.length)
      console.log('Automações sincronizadas:', syncedAutomations.length)

      await updateDoc(clientRef, {
        tuyaDevices: syncedDevices,
        tuyaScenes: syncedScenes,
        tuyaAutomations: syncedAutomations,
        lastSync: new Date().toISOString()
      })

      console.log('Dados salvos no Firestore')
      setTuyaDevices(syncedDevices)
      setTuyaScenes(syncedScenes)
      setTuyaAutomations(syncedAutomations)
      
      return {
        success: true,
        message: `${syncedDevices.length} dispositivos, ${syncedScenes.length} cenas e ${syncedAutomations.length} automações sincronizados com sucesso!`,
        devices: syncedDevices,
        scenes: syncedScenes,
        automations: syncedAutomations
      }
    } catch (error) {
      console.error('Erro ao sincronizar dispositivos Tuya:', error)
      setError('Falha na sincronização de dispositivos')
      return { success: false, message: 'Falha na sincronização' }
    } finally {
      setSyncing(false)
    }
  }, [])

  // Controlar dispositivo Tuya
  const controlTuyaDeviceCallback = useCallback(async (deviceId, command, value) => {
    try {
      setError(null)
      // Simular controle de dispositivo
      return { success: true, result: { status: 'success' } }
    } catch (error) {
      console.error('Erro ao controlar dispositivo Tuya:', error)
      setError('Falha ao controlar dispositivo')
      return { success: false, message: 'Falha ao controlar dispositivo' }
    }
  }, [])

  // Obter status de dispositivo Tuya
  const getTuyaDeviceStatusCallback = useCallback(async (deviceId) => {
    try {
      setError(null)
      // Simular status do dispositivo
      return { success: true, status: { online: true, status: 'active' } }
    } catch (error) {
      console.error('Erro ao obter status do dispositivo:', error)
      setError('Falha ao obter status do dispositivo')
      return { success: false, message: 'Falha ao obter status' }
    }
  }, [])

  // Verificar status da conexão Tuya
  const checkTuyaConnection = useCallback(async (clientId) => {
    try {
      const clientRef = doc(db, 'users', clientId)
      const clientDoc = await getDoc(clientRef)
      
      if (clientDoc.exists()) {
        const clientData = clientDoc.data()
        const isConnected = clientData.tuyaConnected && clientData.tuyaCredentialsEncrypted
        
        setTuyaConnected(isConnected)
        setTuyaDevices(clientData.tuyaDevices || [])
        setTuyaScenes(clientData.tuyaScenes || [])
        setTuyaAutomations(clientData.tuyaAutomations || [])
        return isConnected
      }
      
      return false
    } catch (error) {
      console.error('Erro ao verificar conexão Tuya:', error)
      return false
    }
  }, [])

  // Obter estatísticas de uso
  const getDeviceUsageStats = useCallback(async (deviceId, startTime, endTime) => {
    try {
      setError(null)
      const stats = await tuyaService.getDeviceUsageStats(deviceId, startTime, endTime)
      return { success: true, stats }
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error)
      setError('Falha ao obter estatísticas')
      return { success: false, message: 'Falha ao obter estatísticas' }
    }
  }, [])

  // Criar rotina baseada em dispositivos Tuya
  const createTuyaRoutine = useCallback(async (clientId, routineData) => {
    try {
      setError(null)
      
      const routineRef = doc(db, 'users', clientId, 'routines', routineData.id)
      await setDoc(routineRef, {
        ...routineData,
        tuyaBased: true,
        createdAt: new Date().toISOString()
      })

      return { success: true, message: 'Rotina criada com sucesso!' }
    } catch (error) {
      console.error('Erro ao criar rotina Tuya:', error)
      setError('Falha ao criar rotina')
      return { success: false, message: 'Falha ao criar rotina' }
    }
  }, [])

  // Obter dispositivos por tipo
  const getDevicesByType = useCallback((type) => {
    return tuyaDevices.filter(device => device.type === type)
  }, [tuyaDevices])

  // Obter dispositivos por sala
  const getDevicesByRoom = useCallback((room) => {
    return tuyaDevices.filter(device => device.room === room)
  }, [tuyaDevices])

  // Obter dispositivos online
  const getOnlineDevices = useCallback(() => {
    return tuyaDevices.filter(device => device.status === 'active')
  }, [tuyaDevices])

  const value = {
    tuyaConnected,
    tuyaDevices,
    tuyaScenes,
    tuyaAutomations,
    syncing,
    error,
    connectTuyaAccount,
    disconnectTuyaAccount,
    syncTuyaDevices: syncTuyaDevicesCallback,
    controlTuyaDevice: controlTuyaDeviceCallback,
    getTuyaDeviceStatus: getTuyaDeviceStatusCallback,
    checkTuyaConnection,
    getDeviceUsageStats,
    createTuyaRoutine,
    getDevicesByType,
    getDevicesByRoom,
    getOnlineDevices,
    setError
  }

  return (
    <TuyaContext.Provider value={value}>
      {children}
    </TuyaContext.Provider>
  )
}

