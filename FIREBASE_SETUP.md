# 🔥 Configuração do Firebase

## Passo a Passo para Configurar o Firebase

### 1. Criar Projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Nome do projeto: `home-conectado-platform`
4. Aceite os termos e continue
5. Desabilite o Google Analytics (opcional)
6. Clique em "Criar projeto"

### 2. Configurar Authentication

1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Vá para a aba "Sign-in method"
4. Habilite "Email/Password"
5. Clique em "Salvar"

### 3. Configurar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Começar no modo de teste" (para desenvolvimento)
4. Selecione uma localização (us-central1 ou southamerica-east1)
5. Clique em "Concluído"

### 4. Obter Configurações do Projeto

1. No menu lateral, clique em "Configurações do projeto" (ícone de engrenagem)
2. Role para baixo até "Seus aplicativos"
3. Clique no ícone "</>" (Web)
4. Nome do app: `home-conectado-web`
5. **NÃO** marque "Também configurar o Firebase Hosting"
6. Clique em "Registrar app"
7. Copie as configurações do `firebaseConfig`

### 5. Atualizar Arquivo de Configuração

Substitua o conteúdo do arquivo `src/firebase/config.js` com suas configurações:

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "sua-app-id"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
```

### 6. Configurar Regras de Segurança do Firestore

No Firebase Console, vá para Firestore Database > Regras e substitua por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler e escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Comandos são públicos para leitura
    match /commands/{commandId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 7. Estrutura de Dados no Firestore

O sistema criará automaticamente as seguintes coleções:

#### Coleção: `users`
```javascript
{
  email: "cliente@email.com",
  name: "Nome do Cliente",
  phone: "(16) 9 9999-9999",
  address: "Endereço da instalação",
  installationDate: "2024-01-15",
  devices: ["luzes", "câmeras", "sensores"],
  customCommands: [],
  createdAt: timestamp,
  lastLogin: timestamp
}
```

#### Coleção: `commands` (opcional - para comandos personalizados)
```javascript
{
  category: "lighting",
  command: "Alexa, acenda a luz da sala",
  description: "Liga a luz principal da sala",
  difficulty: "Fácil",
  createdBy: "userId",
  createdAt: timestamp
}
```

### 8. Testar a Configuração

1. Execute `npm run dev`
2. Acesse a plataforma
3. Tente criar uma conta
4. Verifique se os dados aparecem no Firebase Console

### 9. Configurações de Produção

Para produção, configure:

1. **Regras de Segurança mais restritivas**
2. **Backup automático do Firestore**
3. **Monitoramento de uso**
4. **Configurações de domínio personalizado**

## 🚀 Pronto para Usar!

Após seguir todos os passos, sua plataforma estará funcionando com:

- ✅ Autenticação de usuários
- ✅ Banco de dados em tempo real
- ✅ Interface moderna e responsiva
- ✅ Sistema de comandos personalizados
- ✅ Dashboard do cliente

## 📞 Suporte

Se precisar de ajuda com a configuração, entre em contato:
- Email: contato@homeconectado.com.br
- WhatsApp: (16) 9 9373-9326
