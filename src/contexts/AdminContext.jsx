import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where
} from 'firebase/firestore'
import { db } from '../firebase/config'
import tuyaService from '../services/tuyaService'
import encryptionService from '../services/encryptionService'

const AdminContext = createContext()

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de um AdminProvider')
  }
  return context
}

export const AdminProvider = ({ children }) => {
  const [clients, setClients] = useState([])
  const [devices, setDevices] = useState([])
  const [commands, setCommands] = useState([])
  const [routines, setRoutines] = useState([])
  const [scenes, setScenes] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)

  // Buscar todos os clientes
  const fetchClients = useCallback(async () => {
    setLoading(true)
    
    try {
      // Buscar apenas usuários que não são admin
      const clientsSnapshot = await getDocs(collection(db, 'users'))
      const clientsData = clientsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(user => user.role !== 'admin') // Filtrar admins
      
      setClients(clientsData)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Buscar dispositivos de um cliente
  const fetchClientDevices = useCallback(async (clientId) => {
    try {
      const devicesSnapshot = await getDocs(
        collection(db, 'users', clientId, 'devices')
      )
      const devicesData = devicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return devicesData
    } catch (error) {
      console.error('Erro ao buscar dispositivos:', error)
      return []
    }
  }, [])

  // Buscar comandos personalizados de um cliente
  const fetchClientCommands = useCallback(async (clientId) => {
    try {
      const commandsSnapshot = await getDocs(
        collection(db, 'users', clientId, 'customCommands')
      )
      const commandsData = commandsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return commandsData
    } catch (error) {
      console.error('Erro ao buscar comandos:', error)
      return []
    }
  }, [])

  // Buscar rotinas de um cliente
  const fetchClientRoutines = useCallback(async (clientId) => {
    try {
      const routinesSnapshot = await getDocs(
        collection(db, 'users', clientId, 'routines')
      )
      const routinesData = routinesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return routinesData
    } catch (error) {
      console.error('Erro ao buscar rotinas:', error)
      return []
    }
  }, [])

  // Buscar cenas de um cliente
  const fetchClientScenes = useCallback(async (clientId) => {
    try {
      const scenesSnapshot = await getDocs(
        collection(db, 'users', clientId, 'scenes')
      )
      const scenesData = scenesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return scenesData
    } catch (error) {
      console.error('Erro ao buscar cenas:', error)
      return []
    }
  }, [])

  // Adicionar dispositivo para um cliente
  const addDevice = async (clientId, deviceData) => {
    try {
      const docRef = await addDoc(
        collection(db, 'users', clientId, 'devices'),
        {
          ...deviceData,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar dispositivo:', error)
      throw error
    }
  }

  // Adicionar comando personalizado para um cliente
  const addCommand = async (clientId, commandData) => {
    try {
      const docRef = await addDoc(
        collection(db, 'users', clientId, 'customCommands'),
        {
          ...commandData,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar comando:', error)
      throw error
    }
  }

  // Adicionar rotina para um cliente
  const addRoutine = async (clientId, routineData) => {
    try {
      const docRef = await addDoc(
        collection(db, 'users', clientId, 'routines'),
        {
          ...routineData,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar rotina:', error)
      throw error
    }
  }

  // Adicionar cena para um cliente
  const addScene = async (clientId, sceneData) => {
    try {
      const docRef = await addDoc(
        collection(db, 'users', clientId, 'scenes'),
        {
          ...sceneData,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar cena:', error)
      throw error
    }
  }

  // Atualizar dispositivo
  const updateDevice = async (clientId, deviceId, deviceData) => {
    try {
      await updateDoc(
        doc(db, 'users', clientId, 'devices', deviceId),
        {
          ...deviceData,
          updatedAt: new Date()
        }
      )
    } catch (error) {
      console.error('Erro ao atualizar dispositivo:', error)
      throw error
    }
  }

  // Atualizar comando
  const updateCommand = async (clientId, commandId, commandData) => {
    try {
      await updateDoc(
        doc(db, 'users', clientId, 'customCommands', commandId),
        {
          ...commandData,
          updatedAt: new Date()
        }
      )
    } catch (error) {
      console.error('Erro ao atualizar comando:', error)
      throw error
    }
  }

  // Atualizar rotina
  const updateRoutine = async (clientId, routineId, routineData) => {
    try {
      await updateDoc(
        doc(db, 'users', clientId, 'routines', routineId),
        {
          ...routineData,
          updatedAt: new Date()
        }
      )
    } catch (error) {
      console.error('Erro ao atualizar rotina:', error)
      throw error
    }
  }

  // Atualizar cena
  const updateScene = async (clientId, sceneId, sceneData) => {
    try {
      await updateDoc(
        doc(db, 'users', clientId, 'scenes', sceneId),
        {
          ...sceneData,
          updatedAt: new Date()
        }
      )
    } catch (error) {
      console.error('Erro ao atualizar cena:', error)
      throw error
    }
  }

  // Deletar dispositivo
  const deleteDevice = async (clientId, deviceId) => {
    try {
      await deleteDoc(doc(db, 'users', clientId, 'devices', deviceId))
    } catch (error) {
      console.error('Erro ao deletar dispositivo:', error)
      throw error
    }
  }

  // Deletar comando
  const deleteCommand = async (clientId, commandId) => {
    try {
      await deleteDoc(doc(db, 'users', clientId, 'customCommands', commandId))
    } catch (error) {
      console.error('Erro ao deletar comando:', error)
      throw error
    }
  }

  // Deletar rotina
  const deleteRoutine = async (clientId, routineId) => {
    try {
      await deleteDoc(doc(db, 'users', clientId, 'routines', routineId))
    } catch (error) {
      console.error('Erro ao deletar rotina:', error)
      throw error
    }
  }

  // Deletar cena
  const deleteScene = async (clientId, sceneId) => {
    try {
      await deleteDoc(doc(db, 'users', clientId, 'scenes', sceneId))
    } catch (error) {
      console.error('Erro ao deletar cena:', error)
      throw error
    }
  }


  // Sincronizar dispositivos Tuya de um cliente
  const syncClientTuyaDevices = useCallback(async (clientId) => {
    try {
      setLoading(true)
      
      // Obter dados do cliente
      const clientRef = doc(db, 'users', clientId)
      const clientDoc = await getDoc(clientRef)
      
      if (!clientDoc.exists()) {
        throw new Error('Cliente não encontrado')
      }
      
      const clientData = clientDoc.data()
      
      if (!clientData.tuyaConnected) {
        throw new Error('Cliente não possui conta Tuya conectada')
      }
      
      // Descriptografar credenciais
      const tuyaCredentials = encryptionService.decryptTuyaCredentials(clientData.tuyaCredentialsEncrypted)
      
      // Sincronizar dispositivos
      const syncedDevices = await tuyaService.syncClientDevices(clientId, tuyaCredentials)
      
      // Atualizar dispositivos no Firestore
      await updateDoc(clientRef, {
        tuyaDevices: syncedDevices,
        lastTuyaSync: new Date().toISOString()
      })
      
      return syncedDevices
    } catch (error) {
      console.error('Erro ao sincronizar dispositivos Tuya:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  // Obter estatísticas de dispositivos Tuya
  const getTuyaDeviceStats = useCallback(async (clientId) => {
    try {
      const clientRef = doc(db, 'users', clientId)
      const clientDoc = await getDoc(clientRef)
      
      if (!clientDoc.exists()) {
        return null
      }
      
      const clientData = clientDoc.data()
      const tuyaDevices = clientData.tuyaDevices || []
      
      const stats = {
        totalDevices: tuyaDevices.length,
        onlineDevices: tuyaDevices.filter(d => d.status === 'active').length,
        offlineDevices: tuyaDevices.filter(d => d.status === 'inactive').length,
        devicesByType: tuyaDevices.reduce((acc, device) => {
          acc[device.type] = (acc[device.type] || 0) + 1
          return acc
        }, {}),
        lastSync: clientData.lastTuyaSync
      }
      
      return stats
    } catch (error) {
      console.error('Erro ao obter estatísticas Tuya:', error)
      return null
    }
  }, [])

  // Controlar dispositivo Tuya de um cliente
  const controlClientTuyaDevice = useCallback(async (clientId, deviceId, command, value) => {
    try {
      // Obter credenciais do cliente
      const clientRef = doc(db, 'users', clientId)
      const clientDoc = await getDoc(clientRef)
      
      if (!clientDoc.exists()) {
        throw new Error('Cliente não encontrado')
      }
      
      const clientData = clientDoc.data()
      
      if (!clientData.tuyaConnected) {
        throw new Error('Cliente não possui conta Tuya conectada')
      }
      
      // Descriptografar credenciais
      const tuyaCredentials = encryptionService.decryptTuyaCredentials(clientData.tuyaCredentialsEncrypted)
      
      // Autenticar com credenciais do cliente
      await tuyaService.authenticate(tuyaCredentials)
      
      // Controlar dispositivo
      const result = await tuyaService.controlDevice(deviceId, command, value)
      
      return result
    } catch (error) {
      console.error('Erro ao controlar dispositivo Tuya:', error)
      throw error
    }
  }, [])

  const value = {
    clients,
    loading,
    selectedClient,
    setSelectedClient,
    fetchClients,
    fetchClientDevices,
    fetchClientCommands,
    fetchClientRoutines,
    fetchClientScenes,
    addDevice,
    addCommand,
    addRoutine,
    addScene,
    updateDevice,
    updateCommand,
    updateRoutine,
    updateScene,
    deleteDevice,
    deleteCommand,
    deleteRoutine,
    deleteScene,
    syncClientTuyaDevices,
    getTuyaDeviceStats,
    controlClientTuyaDevice,
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}
