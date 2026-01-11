import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

// Configuração real do Firebase - Projeto: home-conectado-platform
const firebaseConfig = {
  apiKey: "AIzaSyBQzbQSGB1kHq--jTMvFJXniDQdoh2lxJ8",
  authDomain: "home-conectado-platform.firebaseapp.com",
  projectId: "home-conectado-platform",
  storageBucket: "home-conectado-platform.firebasestorage.app",
  messagingSenderId: "566990592105",
  appId: "1:566990592105:web:f1ac96d649859701e9aaf8"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Exportar serviços
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app, 'us-central1')
export default app