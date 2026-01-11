import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTuya } from '../../contexts/TuyaContext'
import { 
  Lightbulb, 
  Shield, 
  Volume2, 
  Zap, 
  Power, 
  Sun, 
  Moon,
  Palette,
  Thermometer,
  Droplets,
  Activity,
  Play,
  Pause,
  VolumeX
} from 'lucide-react'

const TuyaDeviceControl = ({ device }) => {
  const { controlTuyaDevice, getTuyaDeviceStatus } = useTuya()
  const [deviceStatus, setDeviceStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (device) {
      fetchDeviceStatus()
    }
  }, [device])

  const fetchDeviceStatus = async () => {
    try {
      const result = await getTuyaDeviceStatus(device.tuyaDeviceId)
      if (result.success) {
        setDeviceStatus(result.status)
      }
    } catch (error) {
      console.error('Erro ao obter status do dispositivo:', error)
    }
  }

  const handleControl = async (command, value) => {
    setLoading(true)
    setError(null)

    try {
      const result = await controlTuyaDevice(device.tuyaDeviceId, command, value)
      if (result.success) {
        // Atualizar status local
        await fetchDeviceStatus()
      } else {
        setError('Falha ao controlar dispositivo')
      }
    } catch (error) {
      setError('Erro ao controlar dispositivo')
    } finally {
      setLoading(false)
    }
  }

  const renderLightControl = () => {
    const isOn = deviceStatus?.switch_led?.value || false
    const brightness = deviceStatus?.bright_value?.value || 0
    const color = deviceStatus?.colour_data?.value || '#FFFFFF'

    return (
      <div className="space-y-4">
        {/* Botão Liga/Desliga */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Liga/Desliga</span>
          <button
            onClick={() => handleControl('switch_led', !isOn)}
            disabled={loading}
            className={`w-12 h-6 rounded-full transition-all duration-300 ${
              isOn ? 'bg-blue-500' : 'bg-gray-300'
            } ${loading ? 'opacity-50' : ''}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              isOn ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Controle de Brilho */}
        {isOn && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Brilho</span>
              <span className="text-sm text-gray-500">{brightness}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={brightness}
              onChange={(e) => handleControl('bright_value', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {/* Controle de Cor */}
        {isOn && device.capabilities?.includes('color') && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700">Cor</span>
            <div className="grid grid-cols-6 gap-2">
              {[
                '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80',
                '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080'
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => handleControl('colour_data', color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === color ? 'border-gray-400' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderSpeakerControl = () => {
    const isOn = deviceStatus?.switch?.value || false
    const volume = deviceStatus?.volume?.value || 0

    return (
      <div className="space-y-4">
        {/* Botão Liga/Desliga */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Liga/Desliga</span>
          <button
            onClick={() => handleControl('switch', !isOn)}
            disabled={loading}
            className={`w-12 h-6 rounded-full transition-all duration-300 ${
              isOn ? 'bg-blue-500' : 'bg-gray-300'
            } ${loading ? 'opacity-50' : ''}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              isOn ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Controle de Volume */}
        {isOn && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Volume</span>
              <span className="text-sm text-gray-500">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleControl('volume', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>
    )
  }

  const renderSensorControl = () => {
    const temperature = deviceStatus?.temp_value?.value || 0
    const humidity = deviceStatus?.humidity_value?.value || 0
    const motion = deviceStatus?.motion_sense?.value || false

    return (
      <div className="space-y-4">
        {/* Temperatura */}
        {temperature > 0 && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Thermometer className="w-5 h-5 text-blue-500" />
            <div>
              <span className="text-sm font-medium text-gray-700">Temperatura</span>
              <p className="text-lg font-bold text-blue-600">{temperature}°C</p>
            </div>
          </div>
        )}

        {/* Umidade */}
        {humidity > 0 && (
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Droplets className="w-5 h-5 text-green-500" />
            <div>
              <span className="text-sm font-medium text-gray-700">Umidade</span>
              <p className="text-lg font-bold text-green-600">{humidity}%</p>
            </div>
          </div>
        )}

        {/* Detecção de Movimento */}
        {motion !== null && (
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <Activity className="w-5 h-5 text-orange-500" />
            <div>
              <span className="text-sm font-medium text-gray-700">Movimento</span>
              <p className={`text-lg font-bold ${motion ? 'text-orange-600' : 'text-gray-400'}`}>
                {motion ? 'Detectado' : 'Nenhum'}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderDefaultControl = () => {
    const isOn = deviceStatus?.switch?.value || false

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Liga/Desliga</span>
          <button
            onClick={() => handleControl('switch', !isOn)}
            disabled={loading}
            className={`w-12 h-6 rounded-full transition-all duration-300 ${
              isOn ? 'bg-blue-500' : 'bg-gray-300'
            } ${loading ? 'opacity-50' : ''}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              isOn ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>
    )
  }

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'light':
        return <Lightbulb className="w-6 h-6" />
      case 'camera':
        return <Shield className="w-6 h-6" />
      case 'speaker':
        return <Volume2 className="w-6 h-6" />
      case 'sensor':
        return <Zap className="w-6 h-6" />
      default:
        return <Power className="w-6 h-6" />
    }
  }

  const renderControlPanel = () => {
    switch (device.type) {
      case 'light':
        return renderLightControl()
      case 'speaker':
        return renderSpeakerControl()
      case 'sensor':
        return renderSensorControl()
      default:
        return renderDefaultControl()
    }
  }

  if (!device) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <Power className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Selecione um dispositivo para controlar</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >
      {/* Header do Dispositivo */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          {getDeviceIcon(device.type)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{device.type} • {device.brand}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${
          device.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
        }`} />
      </div>

      {/* Painel de Controle */}
      <div className="space-y-6">
        {renderControlPanel()}
      </div>

      {/* Status e Erros */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-blue-600">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Controlando dispositivo...</span>
        </div>
      )}
    </motion.div>
  )
}

export default TuyaDeviceControl
