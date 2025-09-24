# 🏠 Home Conectado - Landing Page

Landing page moderna para a empresa Home Conectado, especializada em automação residencial inteligente.

## ✨ Características

- **Design Moderno**: Interface clean com gradientes da marca
- **Responsivo**: Funciona perfeitamente em todos os dispositivos
- **Animações Suaves**: Efeitos visuais com Framer Motion
- **Performance**: Otimizado para carregamento rápido
- **SEO Otimizado**: Meta tags completas, structured data, sitemap e robots.txt
- **Acessibilidade**: Elementos semânticos e ARIA labels
- **PWA Ready**: Configurado para Progressive Web App

## 🚀 Tecnologias

- **React 18** - Framework JavaScript
- **Vite** - Build tool moderno
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Ícones modernos

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

## 🏗️ Build para Produção

```bash
# Gera o build otimizado
npm run build

# Visualiza o build localmente
npm run preview
```

## 🌐 Deploy no GitHub Pages

### Método 1: Upload Manual
1. Execute `npm run build`
2. Faça upload da pasta `dist/` para o seu repositório GitHub
3. Configure o GitHub Pages para usar a pasta `dist/`

### Método 2: GitHub Actions (Recomendado)
1. Crie um arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Hero.jsx          # Seção principal
│   ├── About.jsx         # Sobre a empresa
│   ├── Services.jsx      # Serviços oferecidos
│   ├── Benefits.jsx      # Benefícios
│   ├── Testimonials.jsx  # Depoimentos
│   ├── CTA.jsx          # Chamada para ação
│   └── Footer.jsx       # Rodapé
├── App.jsx              # Componente principal
├── main.jsx             # Ponto de entrada
└── index.css            # Estilos globais
```

## 🎨 Paleta de Cores

- **Azul**: `#2563EB` - Tecnologia e confiança
- **Ciano**: `#06B6D4` - Conectividade e inovação
- **Verde**: `#059669` - Sustentabilidade e eficiência
- **Laranja**: `#EA580C` - Energia e criatividade

## 📱 Seções da Landing Page

1. **Hero** - Apresentação principal com CTA
2. **About** - Diferenciais da empresa
3. **Services** - Serviços oferecidos
4. **Benefits** - Benefícios para o cliente
5. **Testimonials** - Depoimentos de clientes
6. **CTA** - Chamada final para ação
7. **Footer** - Informações de contato e links

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run deploy` - Build + instruções de deploy

## 🔍 SEO e Performance

### Meta Tags Otimizadas
- **Title**: Otimizado com palavras-chave relevantes
- **Description**: Descrição atrativa com call-to-action
- **Keywords**: Palavras-chave estratégicas para automação residencial
- **Open Graph**: Tags para compartilhamento em redes sociais
- **Twitter Cards**: Otimização para Twitter
- **Structured Data**: Schema.org para melhor indexação

### Arquivos de SEO
- `sitemap.xml` - Mapa do site para crawlers
- `robots.txt` - Instruções para bots de busca
- `favicon.svg` - Favicon otimizado

### Performance
- **Code Splitting**: Chunks separados para vendor, animations e icons
- **Lazy Loading**: Carregamento otimizado de recursos
- **Minificação**: CSS e JS minificados
- **Gzip**: Compressão para redução de tamanho

### Acessibilidade
- **ARIA Labels**: Labels descritivos para elementos interativos
- **Semantic HTML**: Estrutura semântica com roles apropriados
- **Alt Text**: Textos alternativos para imagens
- **Keyboard Navigation**: Navegação por teclado otimizada

## 📄 Licença

Este projeto é propriedade da Home Conectado. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para Home Conectado**
