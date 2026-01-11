import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTuya } from '../../contexts/TuyaContext'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Wifi, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Smartphone,
  Lightbulb,
  Shield,
  Volume2,
  Zap
} from 'lucide-react'

const TuyaConnection = () => {
  const { user } = useAuth()
  
  const { 
    tuyaConnected, 
    tuyaDevices,
    tuyaScenes,
    tuyaAutomations,
    syncing, 
    error, 
    connectTuyaAccount, 
    disconnectTuyaAccount, 
    syncTuyaDevices,
    checkTuyaConnection 
  } = useTuya()

  const [appCredentials, setAppCredentials] = useState({
    clientId: 'yujxkhwj9rt5gm7a7ruq',
    clientSecret: '34c96f8f7d02431f89ff2ce335cf0459',
    uid: 'az1761747116630I03Pp'
  })
  const [showConnectionForm, setShowConnectionForm] = useState(false)
  const [activeTab, setActiveTab] = useState('devices')

  useEffect(() => {
    if (user) {
      checkTuyaConnection(user.uid)
    }
  }, [user, checkTuyaConnection])

  useEffect(() => {
    console.log('TuyaDevices no componente:', tuyaDevices.length, tuyaDevices)
  }, [tuyaDevices])

  const handleAppInputChange = (e) => {
    setAppCredentials({
      ...appCredentials,
      [e.target.name]: e.target.value
    })
  }

  const handleConnect = async () => {
    if (!appCredentials.clientId || !appCredentials.clientSecret || !appCredentials.uid) {
      return
    }

    const result = await connectTuyaAccount(user.uid, appCredentials)
    if (result.success) {
      setShowConnectionForm(false)
      setAppCredentials({ clientId: '', clientSecret: '', uid: '' })
    }
  }

  const handleDisconnect = async () => {
    await disconnectTuyaAccount(user.uid)
  }

  const handleSync = async () => {
    if (tuyaConnected) {
      await syncTuyaDevices(user.uid)
    }
  }

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'light':
        return <Lightbulb className="w-5 h-5" />
      case 'camera':
        return <Shield className="w-5 h-5" />
      case 'speaker':
        return <Volume2 className="w-5 h-5" />
      case 'sensor':
        return <Zap className="w-5 h-5" />
      default:
        return <Smartphone className="w-5 h-5" />
    }
  }

  const getDeviceStatusColor = (status) => {
    return status === 'active' ? 'text-green-500' : 'text-gray-400'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-poppins">
                Integração Tuya Smart
              </h2>
              <p className="text-gray-600">
                Conecte sua conta Tuya para sincronizar dispositivos automaticamente
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {tuyaConnected ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Conectado</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Desconectado</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status da Conexão */}
      {tuyaConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Conta Tuya Conectada
              </h3>
              <p className="text-gray-600">
                {tuyaDevices.length} dispositivos sincronizados
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                Sincronizar
              </button>
              
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
              >
                Desconectar
              </button>
            </div>
          </div>

          {/* Abas */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('devices')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'devices'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dispositivos ({tuyaDevices.length})
              </button>
              <button
                onClick={() => setActiveTab('scenes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'scenes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cenas ({tuyaScenes.length})
              </button>
              <button
                onClick={() => setActiveTab('automations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'automations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Automações ({tuyaAutomations.length})
              </button>
            </nav>
          </div>

          {/* Conteúdo das Abas */}
          {activeTab === 'devices' && (
            <>
              {tuyaDevices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tuyaDevices.map((device, index) => (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{device.name}</h4>
                          <p className="text-sm text-gray-500 capitalize">{device.type}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${device.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Status:</span>
                          <span className={`font-medium ${getDeviceStatusColor(device.status)}`}>
                            {device.status === 'active' ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Marca:</span>
                          <span className="font-medium">{device.brand}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Modelo:</span>
                          <span className="font-medium">{device.model}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wifi className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum dispositivo encontrado</p>
                  <p className="text-sm text-gray-400">Faça a sincronização para buscar dispositivos</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'scenes' && (
            <>
              {tuyaScenes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tuyaScenes.map((scene, index) => (
                    <motion.div
                      key={scene.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Zap className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{scene.name}</h4>
                          <p className="text-sm text-gray-500">Cena</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${scene.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Status:</span>
                          <span className={`font-medium ${scene.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                            {scene.enabled ? 'Ativa' : 'Inativa'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Ações:</span>
                          <span className="font-medium">{scene.actions?.length || 0}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma cena encontrada</p>
                  <p className="text-sm text-gray-400">Faça a sincronização para buscar cenas</p>
                </div>
              )}
            </>
          )}

          {activeTab === 'automations' && (
            <>
              {tuyaAutomations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tuyaAutomations.map((automation, index) => (
                    <motion.div
                      key={automation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <RefreshCw className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{automation.name}</h4>
                          <p className="text-sm text-gray-500">Automação</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${automation.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Status:</span>
                          <span className={`font-medium ${automation.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                            {automation.enabled ? 'Ativa' : 'Inativa'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Condições:</span>
                          <span className="font-medium">{automation.conditions?.length || 0}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Ações:</span>
                          <span className="font-medium">{automation.actions?.length || 0}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <RefreshCw className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma automação encontrada</p>
                  <p className="text-sm text-gray-400">Faça a sincronização para buscar automações</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="text-center py-8">
            <Wifi className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Conecte sua Conta Tuya
            </h3>
            <p className="text-gray-600 mb-6">
              Para sincronizar seus dispositivos inteligentes automaticamente
            </p>
            
            <button
              onClick={() => setShowConnectionForm(true)}
              className="btn-primary"
            >
              Conectar Conta Tuya
            </button>
          </div>
        </motion.div>
      )}

      {/* Formulário de Conexão */}
      {showConnectionForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Conectar Conta Tuya
            </h3>
            <p className="text-gray-600">
              Digite as credenciais da sua aplicação Tuya
            </p>
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Como obter:</strong> Acesse <a href="https://developer.tuya.com" target="_blank" rel="noopener noreferrer" className="underline">developer.tuya.com</a> e crie uma aplicação para obter suas credenciais
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Credenciais da Aplicação Tuya */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-3">
                Suas Credenciais da Aplicação Tuya
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client ID
                  </label>
                  <input
                    type="text"
                    name="clientId"
                    value={appCredentials.clientId}
                    onChange={handleAppInputChange}
                    placeholder="Seu Client ID da Tuya"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Secret
                  </label>
                  <input
                    type="password"
                    name="clientSecret"
                    value={appCredentials.clientSecret}
                    onChange={handleAppInputChange}
                    placeholder="Seu Client Secret da Tuya"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User ID (UID)
                  </label>
                  <input
                    type="text"
                    name="uid"
                    value={appCredentials.uid}
                    onChange={handleAppInputChange}
                    placeholder="Seu User ID (UID) da Tuya"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Obtenha em: Tuya IoT Platform → Cloud → Development → User Management → App Account
                  </p>
                </div>
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Obtenha essas credenciais em <a href="https://developer.tuya.com" target="_blank" rel="noopener noreferrer" className="underline">developer.tuya.com</a>
              </p>
            </div>

          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
              {error.includes('Credenciais Tuya corrompidas') && (
                <div className="mt-3">
                  <button
                    onClick={async () => {
                      await disconnectTuyaAccount(user.uid)
                      setShowConnectionForm(true)
                    }}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    Reconectar Conta Tuya
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleConnect}
              disabled={syncing || !appCredentials.clientId || !appCredentials.clientSecret || !appCredentials.uid}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? 'Conectando...' : 'Conectar'}
            </button>
            
            <button
              onClick={() => setShowConnectionForm(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TuyaConnection
