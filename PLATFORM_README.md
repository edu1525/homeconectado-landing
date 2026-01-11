# 🏠 Home Conectado - Plataforma do Cliente

## 🚀 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- **Login/Registro** com email e senha
- **Validação de formulários** em tempo real
- **Persistência de sessão** com Firebase Auth
- **Interface moderna** com animações suaves

### ✅ Dashboard Personalizado
- **Visão geral** da instalação do cliente
- **Ações rápidas** para comandos mais usados
- **Estatísticas** de uso e economia
- **Dicas personalizadas** baseadas no perfil

### ✅ Sistema de Comandos Alexa

#### 🔆 Comandos de Iluminação
- Controle básico (ligar/desligar)
- Controle por ambiente
- Controle de intensidade
- Cenas e rotinas personalizadas

#### 🛡️ Comandos de Segurança
- Sistema de alarme
- Câmeras de segurança
- Notificações e alertas
- Controle de acesso

#### 🎤 Comandos do Assistente Virtual
- Informações da casa
- Entretenimento
- Produtividade
- Controle geral

#### ⚡ Dicas de Economia de Energia
- Comandos de economia
- Controle de iluminação inteligente
- Climatização inteligente
- Rotinas de economia

### ✅ Interface Moderna
- **Design responsivo** para mobile e desktop
- **Animações fluidas** com Framer Motion
- **Tema consistente** com a identidade visual
- **Navegação intuitiva** com sidebar
- **Feedback visual** para todas as ações

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Firebase Auth** - Autenticação
- **Firestore** - Banco de dados
- **Lucide React** - Ícones
- **React Router** - Navegação

## 📱 Responsividade

A plataforma é totalmente responsiva e funciona perfeitamente em:
- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1440px+)

## 🔐 Segurança

- **Autenticação segura** com Firebase
- **Regras de segurança** no Firestore
- **Dados criptografados** em trânsito
- **Sessões seguras** com tokens JWT

## 🎨 Design System

### Cores Principais
- **Azul**: `#2563EB` (brand-blue)
- **Verde**: `#059669` (brand-green)
- **Laranja**: `#EA580C` (brand-orange)
- **Ciano**: `#06B6D4` (brand-cyan)
- **Teal**: `#0D9488` (brand-teal)

### Tipografia
- **Títulos**: Poppins (Bold, Semibold)
- **Corpo**: Inter (Regular, Medium, Semibold)

### Componentes
- **Botões**: Gradientes com hover effects
- **Cards**: Sombras suaves com bordas arredondadas
- **Inputs**: Focus states com cores da marca
- **Navegação**: Sidebar responsiva com animações

## 🚀 Como Usar

### 1. Configurar Firebase
Siga as instruções no arquivo `FIREBASE_SETUP.md`

### 2. Instalar Dependências
```bash
npm install
```

### 3. Executar em Desenvolvimento
```bash
npm run dev
```

### 4. Acessar a Plataforma
- Acesse `http://localhost:3000`
- Clique em "Acessar Plataforma do Cliente"
- Crie uma conta ou faça login

## 📊 Estrutura de Dados

### Usuário (Firestore)
```javascript
{
  email: string,
  name: string,
  phone: string,
  address: string,
  installationDate: string,
  devices: string[],
  customCommands: object[],
  createdAt: timestamp,
  lastLogin: timestamp
}
```

### Comandos (Categorias)
- **Iluminação**: Controle de luzes
- **Segurança**: Sistema de alarme
- **Assistente**: Comandos gerais
- **Economia**: Dicas de consumo

## 🎯 Próximas Funcionalidades

- [ ] **Comandos personalizados** por cliente
- [ ] **Histórico de comandos** usados
- [ ] **Notificações push** para dicas
- [ ] **Integração com dispositivos** IoT
- [ ] **Relatórios de economia** de energia
- [ ] **Suporte técnico** integrado
- [ ] **Backup de configurações**

## 📞 Suporte

Para dúvidas ou suporte técnico:
- **Email**: contato@homeconectado.com.br
- **WhatsApp**: (16) 9 9373-9326
- **Endereço**: Franca, SP - Brasil

---

**🏠 Home Conectado** - Transformando casas em ambientes inteligentes e conectados.
