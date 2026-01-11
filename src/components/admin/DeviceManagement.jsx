import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../contexts/AdminContext'
import { 
  Smartphone, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Lightbulb,
  Shield,
  Volume2,
  Thermometer,
  Camera,
  Wifi
} from 'lucide-react'

const DeviceManagement = ({ client, onClose }) => {
  const { 
    fetchClientDevices, 
    addDevice, 
    updateDevice, 
    deleteDevice 
  } = useAdmin()
  
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingDevice, setEditingDevice] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    brand: '',
    model: '',
    room: '',
    status: 'active',
    capabilities: [],
    alexaCompatible: true,
    googleCompatible: false
  })

  const deviceTypes = [
    { value: 'light', label: 'Iluminação', icon: Lightbulb, color: 'yellow' },
    { value: 'security', label: 'Segurança', icon: Shield, color: 'red' },
    { value: 'speaker', label: 'Alto-falante', icon: Volume2, color: 'blue' },
    { value: 'thermostat', label: 'Termostato', icon: Thermometer, color: 'green' },
    { value: 'camera', label: 'Câmera', icon: Camera, color: 'purple' },
    { value: 'router', label: 'Roteador', icon: Wifi, color: 'gray' }
  ]

  const capabilities = [
    'on_off',
    'brightness',
    'color',
    'temperature',
    'motion_detection',
    'voice_control',
    'scheduling',
    'remote_access'
  ]

  useEffect(() => {
    if (client) {
      loadDevices()
    }
  }, [client])

  const loadDevices = async () => {
    setLoading(true)
    try {
      const devicesData = await fetchClientDevices(client.id)
      setDevices(devicesData)
    } catch (error) {
      console.error('Erro ao carregar dispositivos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (editingDevice) {
        await updateDevice(client.id, editingDevice.id, formData)
      } else {
        await addDevice(client.id, formData)
      }
      
      await loadDevices()
      resetForm()
    } catch (error) {
      console.error('Erro ao salvar dispositivo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (device) => {
    setEditingDevice(device)
    setFormData({
      name: device.name || '',
      type: device.type || '',
      brand: device.brand || '',
      model: device.model || '',
      room: device.room || '',
      status: device.status || 'active',
      capabilities: device.capabilities || [],
      alexaCompatible: device.alexaCompatible || false,
      googleCompatible: device.googleCompatible || false
    })
    setShowForm(true)
  }

  const handleDelete = async (deviceId) => {
    if (window.confirm('Tem certeza que deseja deletar este dispositivo?')) {
      try {
        await deleteDevice(client.id, deviceId)
        await loadDevices()
      } catch (error) {
        console.error('Erro ao deletar dispositivo:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      brand: '',
      model: '',
      room: '',
      status: 'active',
      capabilities: [],
      alexaCompatible: true,
      googleCompatible: false
    })
    setEditingDevice(null)
    setShowForm(false)
  }

  const getDeviceIcon = (type) => {
    const deviceType = deviceTypes.find(dt => dt.value === type)
    return deviceType ? deviceType.icon : Smartphone
  }

  const getDeviceColor = (type) => {
    const deviceType = deviceTypes.find(dt => dt.value === type)
    return deviceType ? deviceType.color : 'gray'
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
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-poppins">
              Gerenciar Dispositivos
            </h2>
            <p className="text-gray-600">
              {client?.name} - {devices.length} dispositivos
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Devices List */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Dispositivos ({devices.length})
              </h3>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <Plus className="w-4 h-4" />
                Adicionar Dispositivo
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando dispositivos...</p>
              </div>
            ) : devices.length === 0 ? (
              <div className="text-center py-8">
                <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum dispositivo encontrado</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {devices.map((device, index) => {
                  const Icon = getDeviceIcon(device.type)
                  const color = getDeviceColor(device.type)
                  
                  return (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${color}-600`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{device.name}</h4>
                            <p className="text-sm text-gray-600">{device.brand} {device.model}</p>
                            <p className="text-xs text-gray-500">{device.room}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(device)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(device.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          device.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {device.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                        
                        {device.alexaCompatible && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            Alexa
                          </span>
                        )}
                        
                        {device.googleCompatible && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Google
                          </span>
                        )}
                      </div>
                      
                      {device.capabilities && device.capabilities.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {device.capabilities.slice(0, 3).map((capability, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                              {capability.replace('_', ' ')}
                            </span>
                          ))}
                          {device.capabilities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                              +{device.capabilities.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Form Sidebar */}
          {showForm && (
            <div className="w-96 border-l border-gray-200 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingDevice ? 'Editar Dispositivo' : 'Novo Dispositivo'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Dispositivo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Luz da Sala"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    {deviceTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Philips"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modelo
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Hue White"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ambiente
                  </label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({...formData, room: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Sala de Estar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                    <option value="maintenance">Manutenção</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compatibilidade
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.alexaCompatible}
                        onChange={(e) => setFormData({...formData, alexaCompatible: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm">Alexa</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.googleCompatible}
                        onChange={(e) => setFormData({...formData, googleCompatible: e.target.checked})}
                        className="mr-2"
                      />
                      <span className="text-sm">Google Assistant</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        {editingDevice ? 'Atualizar' : 'Adicionar'}
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default DeviceManagement
