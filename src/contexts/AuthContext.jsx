import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Modo de demonstração - funciona sem Firebase
  const DEMO_MODE = false

  useEffect(() => {
    if (DEMO_MODE) {
      // Simular carregamento
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        // Buscar dados do usuário no Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            setUserData(userDoc.data())
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error)
        }
      } else {
        setUser(null)
        setUserData(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email, password) => {
    if (DEMO_MODE) {
      // Simular login de demonstração
      const demoUser = {
        uid: 'demo-user-123',
        email: email,
        displayName: 'Cliente Demo'
      }
      const demoUserData = {
        name: 'Cliente Demo',
        email: email,
        phone: '(16) 9 9999-9999',
        address: 'Rua Demo, 123 - Franca, SP',
        installationDate: '2024-01-15',
        devices: ['luzes', 'câmeras', 'sensores'],
        customCommands: [],
        createdAt: new Date(),
        lastLogin: new Date()
      }
      
      setUser(demoUser)
      setUserData(demoUserData)
      return { user: demoUser }
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result
    } catch (error) {
      throw error
    }
  }

  const register = async (email, password, userInfo) => {
    if (DEMO_MODE) {
      // Simular registro de demonstração
      const demoUser = {
        uid: 'demo-user-123',
        email: email,
        displayName: userInfo.name
      }
      const demoUserData = {
        email: email,
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        installationDate: userInfo.installationDate,
        devices: userInfo.devices || [],
        customCommands: userInfo.customCommands || [],
        createdAt: new Date(),
        lastLogin: new Date()
      }
      
      setUser(demoUser)
      setUserData(demoUserData)
      return { user: demoUser }
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      // Criar documento do usuário no Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        installationDate: userInfo.installationDate,
        devices: userInfo.devices || [],
        customCommands: userInfo.customCommands || [],
        createdAt: new Date(),
        lastLogin: new Date()
      })
      
      return result
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    if (DEMO_MODE) {
      setUser(null)
      setUserData(null)
      return
    }

    try {
      await signOut(auth)
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    userData,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}