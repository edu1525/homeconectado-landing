# Configuração de Produção - Integração Tuya

## ⚠️ Status Atual

O sistema está configurado para usar **dados simulados (mock)** em desenvolvimento. Para produção com a API real da Tuya, você tem as seguintes opções:

## 🔧 Opções para Produção

### 1. **Firebase Functions (Recomendado)**
- ✅ **Vantagens**: Seguro, escalável, sem CORS
- ❌ **Requisito**: Plano Blaze (pago) do Firebase
- 💰 **Custo**: ~$0.40/milhão de execuções

**Para ativar:**
1. Upgrade do Firebase para plano Blaze
2. Deploy das Functions: `firebase deploy --only functions`
3. Atualizar `TuyaContext.jsx` para usar Firebase Functions

### 2. **Servidor Proxy (Alternativa)**
- ✅ **Vantagens**: Controle total, sem custos adicionais
- ❌ **Requisito**: Servidor backend próprio

**Implementação:**
```javascript
// Criar servidor Node.js/Express com CORS
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['https://seu-dominio.com'],
  credentials: true
}));

// Endpoints para Tuya API
app.post('/api/tuya/authenticate', async (req, res) => {
  // Lógica de autenticação Tuya
});

app.get('/api/tuya/devices', async (req, res) => {
  // Lógica de sincronização
});
```

### 3. **Configuração de CORS no Servidor**
- ✅ **Vantagens**: Usa o serviço direto atual
- ❌ **Requisito**: Configurar CORS no servidor de hospedagem

**Para Vercel/Netlify:**
```javascript
// vercel.json
{
  "functions": {
    "api/tuya/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

## 🚀 Implementação Recomendada

### Opção 1: Firebase Functions (Mais Fácil)

1. **Upgrade Firebase:**
   ```bash
   # Acesse: https://console.firebase.google.com/project/home-conectado-platform/usage/details
   # Upgrade para plano Blaze
   ```

2. **Deploy Functions:**
   ```bash
   firebase deploy --only functions
   ```

3. **Atualizar Context:**
   ```javascript
   // TuyaContext.jsx
   const service = USE_MOCK_SERVICE ? tuyaMockService : tuyaApiService
   ```

### Opção 2: Servidor Proxy (Mais Controle)

1. **Criar servidor backend:**
   ```bash
   mkdir tuya-proxy
   cd tuya-proxy
   npm init -y
   npm install express cors axios
   ```

2. **Implementar proxy:**
   ```javascript
   // server.js
   const express = require('express');
   const cors = require('cors');
   const axios = require('axios');
   
   const app = express();
   app.use(cors());
   app.use(express.json());
   
   // Proxy para Tuya API
   app.post('/api/tuya/authenticate', async (req, res) => {
     try {
       const response = await axios.post('https://openapi.tuyaus.com/v1.0/token', req.body);
       res.json(response.data);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });
   
   app.listen(3001, () => console.log('Proxy rodando na porta 3001'));
   ```

3. **Atualizar tuyaApiService.js:**
   ```javascript
   // Usar proxy em vez da API direta
   this.baseURL = 'http://localhost:3001/api/tuya' // ou URL do seu servidor
   ```

## 🔐 Configuração de Segurança

### Variáveis de Ambiente Necessárias:
```bash
# .env
VITE_TUYA_APP_CLIENT_ID=seu_client_id
VITE_TUYA_APP_CLIENT_SECRET=seu_client_secret
VITE_ENCRYPTION_KEY=sua_chave_criptografia
```

### Configuração de CORS:
```javascript
const corsOptions = {
  origin: [
    'https://home-conectado-platform.web.app',
    'https://home-conectado-platform.firebaseapp.com',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

## 📊 Comparação de Opções

| Opção | Custo | Complexidade | Segurança | Escalabilidade |
|-------|-------|--------------|-----------|----------------|
| Firebase Functions | 💰 Baixo | 🟢 Fácil | 🔒 Alta | 📈 Alta |
| Servidor Proxy | 🆓 Gratuito | 🟡 Médio | 🔒 Alta | 📈 Média |
| CORS Direto | 🆓 Gratuito | 🔴 Difícil | ⚠️ Baixa | 📈 Baixa |

## 🎯 Recomendação

Para **produção**, recomendo a **Opção 1 (Firebase Functions)** por ser:
- ✅ Mais segura
- ✅ Mais fácil de implementar
- ✅ Melhor escalabilidade
- ✅ Custo baixo para a maioria dos casos

Para **desenvolvimento/teste**, o sistema atual com mock funciona perfeitamente.

## 🔄 Próximos Passos

1. **Imediato**: Sistema funciona com dados simulados
2. **Produção**: Escolher uma das opções acima
3. **Configuração**: Seguir os passos da opção escolhida
4. **Teste**: Validar integração com API real da Tuya

---

**Nota**: O sistema atual está totalmente funcional para desenvolvimento e demonstração. A integração real com Tuya é opcional e pode ser implementada quando necessário.
