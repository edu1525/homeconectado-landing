import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../contexts/AdminContext'
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Smartphone, 
  Volume2, 
  Clock, 
  Palette,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

const ClientDetails = ({ client, onClose }) => {
  const { 
    fetchClientDevices, 
    fetchClientCommands, 
    fetchClientRoutines, 
    fetchClientScenes 
  } = useAdmin()
  
  const [devices, setDevices] = useState([])
  const [commands, setCommands] = useState([])
  const [routines, setRoutines] = useState([])
  const [scenes, setScenes] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('devices')

  useEffect(() => {
    if (client) {
      loadClientData()
    }
  }, [client])

  const loadClientData = async () => {
    setLoading(true)
    try {
      const [devicesData, commandsData, routinesData, scenesData] = await Promise.all([
        fetchClientDevices(client.id),
        fetchClientCommands(client.id),
        fetchClientRoutines(client.id),
        fetchClientScenes(client.id)
      ])
      
      setDevices(devicesData)
      setCommands(commandsData)
      setRoutines(routinesData)
      setScenes(scenesData)
    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'devices', label: 'Dispositivos', icon: Smartphone, count: devices.length },
    { id: 'commands', label: 'Comandos', icon: Volume2, count: commands.length },
    { id: 'routines', label: 'Rotinas', icon: Clock, count: routines.length },
    { id: 'scenes', label: 'Cenas', icon: Palette, count: scenes.length }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'devices':
        return (
          <div className="space-y-4">
            {devices.length === 0 ? (
              <div className="text-center py-8">
                <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum dispositivo cadastrado</p>
              </div>
            ) : (
              devices.map((device, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{device.name}</h4>
                      <p className="text-sm text-gray-600">{device.brand} {device.model}</p>
                      <p className="text-xs text-gray-500">{device.room}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      device.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {device.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )
      
      case 'commands':
        return (
          <div className="space-y-4">
            {commands.length === 0 ? (
              <div className="text-center py-8">
                <Volume2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum comando personalizado</p>
              </div>
            ) : (
              commands.map((command, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{command.command}</h4>
                  <p className="text-sm text-gray-600">{command.description}</p>
                </div>
              ))
            )}
          </div>
        )
      
      case 'routines':
        return (
          <div className="space-y-4">
            {routines.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhuma rotina configurada</p>
              </div>
            ) : (
              routines.map((routine, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{routine.name}</h4>
                  <p className="text-sm text-gray-600">{routine.description}</p>
                </div>
              ))
            )}
          </div>
        )
      
      case 'scenes':
        return (
          <div className="space-y-4">
            {scenes.length === 0 ? (
              <div className="text-center py-8">
                <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhuma cena configurada</p>
              </div>
            ) : (
              scenes.map((scene, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{scene.name}</h4>
                  <p className="text-sm text-gray-600">{scene.description}</p>
                </div>
              ))
            )}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-poppins">
                {client?.name || 'Cliente'}
              </h2>
              <p className="text-gray-600">{client?.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Client Info Sidebar */}
          <div className="w-80 border-r border-gray-200 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Cliente</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{client?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Telefone</p>
                  <p className="text-sm text-gray-600">{client?.phone || 'Não informado'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Endereço</p>
                  <p className="text-sm text-gray-600">{client?.address || 'Não informado'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Instalado em</p>
                  <p className="text-sm text-gray-600">
                    {client?.installationDate ? 
                      new Date(client.installationDate).toLocaleDateString('pt-BR') : 
                      'Não informado'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <Smartphone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">{devices.length}</p>
                  <p className="text-xs text-blue-700">Dispositivos</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <Volume2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">{commands.length}</p>
                  <p className="text-xs text-green-700">Comandos</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-900">{routines.length}</p>
                  <p className="text-xs text-purple-700">Rotinas</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <Palette className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-900">{scenes.length}</p>
                  <p className="text-xs text-orange-700">Cenas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors duration-300 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando dados...</p>
                </div>
              ) : (
                renderContent()
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ClientDetails
