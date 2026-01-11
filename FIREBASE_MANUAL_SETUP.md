# 🔥 Configuração Manual do Firebase

## ⚠️ IMPORTANTE: Modo Demonstração Ativo

A plataforma está funcionando em **modo demonstração** para você testar a interface. Para usar com dados reais, siga os passos abaixo.

## 🚀 Passo a Passo Completo

### 1. Criar Projeto no Firebase Console

1. **Acesse**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Clique em**: "Criar um projeto"
3. **Nome do projeto**: `home-conectado-platform`
4. **Aceite os termos** e continue
5. **Desabilite Google Analytics** (opcional)
6. **Clique em**: "Criar projeto"

### 2. Configurar Authentication

1. **No menu lateral**, clique em "Authentication"
2. **Clique em**: "Começar"
3. **Vá para a aba**: "Sign-in method"
4. **Habilite**: "Email/Password"
5. **Clique em**: "Salvar"

### 3. Configurar Firestore Database

1. **No menu lateral**, clique em "Firestore Database"
2. **Clique em**: "Criar banco de dados"
3. **Escolha**: "Começar no modo de teste" (para desenvolvimento)
4. **Selecione localização**: `southamerica-east1` (Brasil)
5. **Clique em**: "Concluído"

### 4. Obter Configurações do Projeto

1. **No menu lateral**, clique em "Configurações do projeto" (ícone de engrenagem)
2. **Role para baixo** até "Seus aplicativos"
3. **Clique no ícone**: `</>` (Web)
4. **Nome do app**: `home-conectado-web`
5. **NÃO marque**: "Também configurar o Firebase Hosting"
6. **Clique em**: "Registrar app"
7. **COPIE** as configurações do `firebaseConfig`

### 5. Atualizar Arquivo de Configuração

**Substitua** o conteúdo do arquivo `src/firebase/config.js`:

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// SUBSTITUA pelas suas configurações reais do Firebase
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

### 6. Desativar Modo Demonstração

**Edite** o arquivo `src/contexts/AuthContext.jsx`:

```javascript
// Mude esta linha:
const DEMO_MODE = true

// Para:
const DEMO_MODE = false
```

### 7. Configurar Regras de Segurança do Firestore

**No Firebase Console**:
1. Vá para **Firestore Database** > **Regras**
2. **Substitua** por:

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

3. **Clique em**: "Publicar"

## 🧪 Testar a Configuração

1. **Execute**: `npm run dev`
2. **Acesse**: `http://localhost:3000`
3. **Clique em**: "Acessar Plataforma do Cliente"
4. **Teste criar uma conta** com dados reais
5. **Verifique** se os dados aparecem no Firebase Console

## ✅ Verificar se Funcionou

### No Firebase Console:
- **Authentication** > **Users**: Deve aparecer o usuário criado
- **Firestore Database** > **Data**: Deve aparecer a coleção `users`

### Na Plataforma:
- **Login/Registro** deve funcionar
- **Dashboard** deve carregar dados reais
- **Comandos** devem estar disponíveis

## 🚨 Solução de Problemas

### Erro: "API key not valid"
- ✅ Verifique se copiou a API key correta
- ✅ Certifique-se de que o projeto está ativo
- ✅ Verifique se Authentication está habilitado

### Erro: "Permission denied"
- ✅ Verifique as regras do Firestore
- ✅ Certifique-se de que Authentication está funcionando
- ✅ Verifique se o usuário está logado

### Erro: "Project not found"
- ✅ Verifique se o projectId está correto
- ✅ Certifique-se de que o projeto existe
- ✅ Verifique se você tem acesso ao projeto

## 📞 Suporte

Se precisar de ajuda:
- **Email**: contato@homeconectado.com.br
- **WhatsApp**: (16) 9 9373-9326

---

**🎯 Após seguir todos os passos, sua plataforma estará 100% funcional com Firebase!**
