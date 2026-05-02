# ClimaTempo

Aplicação web frontend que consome a API do OpenWeatherMap e exibe temperatura, umidade, porcentagem de chuva e previsão de 5 dias para qualquer cidade buscada.

## Demonstração

> _Deploy em breve via Vercel_

## Tecnologias

- **React 18** + Vite
- **Tailwind CSS 3**
- **Axios** para requisições HTTP
- **React Context API** + useReducer para estado global
- **OpenWeatherMap API** (dados climáticos)

## Funcionalidades

- Busca de cidade por nome
- Temperatura atual, mínima e máxima
- Umidade relativa do ar
- Probabilidade de chuva com indicador visual
- Previsão dos próximos 5 dias
- Cache da última busca (10 min via localStorage)
- Layout responsivo mobile-first
- Skeleton loading e tratamento de erros inline

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta gratuita no [OpenWeatherMap](https://openweathermap.org/api) para obter a API Key

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/climatempo.git
cd climatempo

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env e adicione sua chave de API
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_CACHE_TTL_MINUTES=10
```

### Executar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

### Build de produção

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```
src/
├── models/          # Entidades de dados (WeatherModel, ForecastModel)
├── views/
│   ├── components/  # SearchBar, WeatherCard, ForecastList, RainIndicator
│   └── pages/       # Home
├── controllers/     # WeatherController, SearchController
├── services/        # weatherApi.js (camada HTTP)
└── utils/           # formatters.js, validators.js
```

> Arquitetura MVC adaptada para React. Detalhes completos em [`docs/escopo-mvp.md`](docs/escopo-mvp.md).

## Testes

```bash
npm run test
```

Testes com **Vitest** + **React Testing Library**.

## Deploy

O projeto está configurado para deploy automático na **Vercel**. Ao fazer push na branch `main`, o CI/CD dispara o build e publica a nova versão.

Configure as variáveis de ambiente no painel da Vercel antes do primeiro deploy.

## Licença

MIT
