# Escopo MVP — ClimaTempo

## 1. Visão Geral

**ClimaTempo** é uma aplicação web frontend construída com arquitetura MVC que consome dados de uma API externa de clima e exibe, de forma clara e responsiva, informações meteorológicas por cidade: temperatura atual, umidade relativa, previsão estendida e porcentagem de chuva.

---

## 2. Objetivo do MVP

Permitir que o usuário busque qualquer cidade e visualize instantaneamente:

| Dado               | Descrição                                      |
|--------------------|------------------------------------------------|
| Temperatura        | Atual (°C/°F), mínima e máxima do dia          |
| Umidade            | Percentual relativo do ar (%)                  |
| Previsão           | Próximos 5 dias com ícone e condição resumida  |
| Chuva              | Probabilidade de precipitação (%)              |

---

## 3. Arquitetura MVC

```
src/
├── models/
│   ├── WeatherModel.js        # Entidade de dados climáticos
│   └── ForecastModel.js       # Entidade de previsão estendida
│
├── views/
│   ├── components/
│   │   ├── SearchBar.jsx      # Campo de busca por cidade
│   │   ├── WeatherCard.jsx    # Card principal com temp/umidade
│   │   ├── ForecastList.jsx   # Lista de previsão 5 dias
│   │   ├── RainIndicator.jsx  # Indicador de % de chuva
│   │   └── LoadingSpinner.jsx # Feedback de carregamento
│   └── pages/
│       └── Home.jsx           # Página principal (orquestra componentes)
│
├── controllers/
│   ├── WeatherController.js   # Orquestra busca e atualização de estado
│   └── SearchController.js    # Valida entrada e dispara busca
│
├── services/
│   └── weatherApi.js          # Camada de acesso à API externa
│
└── utils/
    ├── formatters.js           # Formata temp, datas, percentuais
    └── validators.js           # Valida nome de cidade (min 2 chars, sem SQL)
```

---

## 4. Fluxo de Dados

```
Usuário digita cidade
        │
        ▼
SearchBar (View)
        │ onChange / onSubmit
        ▼
SearchController (Controller)
        │ valida entrada
        ▼
WeatherController (Controller)
        │ chama service
        ▼
weatherApi.js (Service)
        │ GET /weather?city={city}&appid={key}
        ▼
API Externa (OpenWeatherMap)
        │ JSON response
        ▼
WeatherModel / ForecastModel (Model)
        │ mapeia e normaliza dados
        ▼
WeatherCard + ForecastList + RainIndicator (Views)
        │
        ▼
Usuário vê os dados
```

---

## 5. API Externa — OpenWeatherMap

**Base URL:** `https://api.openweathermap.org/data/2.5`

### Endpoints utilizados

| Endpoint           | Uso                                  | Parâmetros principais              |
|--------------------|--------------------------------------|------------------------------------|
| `/weather`         | Clima atual (temp, umidade, chuva)   | `q={city}`, `units=metric`, `lang=pt_br` |
| `/forecast`        | Previsão 5 dias / 3 em 3 horas       | `q={city}`, `units=metric`, `cnt=40`     |

### Campos mapeados

```json
{
  "name": "São Paulo",
  "main": {
    "temp": 22.5,
    "temp_min": 18.0,
    "temp_max": 26.3,
    "humidity": 78
  },
  "weather": [{ "description": "nublado", "icon": "04d" }],
  "rain": { "1h": 0.8 },
  "pop": 0.65
}
```

> `pop` (probability of precipitation) → exibido como `% de chuva` no `RainIndicator`.

---

## 6. Componentes React — Especificação

### 6.1 `SearchBar`

- Input controlado com debounce de 400ms
- Botão de busca + suporte a `Enter`
- Estado: `idle | loading | error`
- Exibe mensagem inline se cidade não encontrada (404)

### 6.2 `WeatherCard`

- Temperatura atual em destaque (tipografia grande, ≥ 48px)
- Ícone animado do clima (SVG ou PNG da API)
- Chips secundários: umidade, sensação térmica, vento
- Gradiente de fundo muda conforme condição (ensolarado → amarelo, chuva → azul, neblina → cinza)

### 6.3 `ForecastList`

- Grid horizontal com 5 cards de dias
- Cada card: dia da semana, ícone, temp máx/mín
- Responsivo: scroll horizontal em mobile

### 6.4 `RainIndicator`

- Barra de progresso circular (0–100%)
- Cor: verde (0–30%), amarelo (31–60%), azul (61–100%)
- Tooltip com texto: "Alta chance de chuva" / "Possibilidade de chuva" / "Sem chuva prevista"

### 6.5 `LoadingSpinner`

- Skeleton loading nos cards durante fetch
- Substitui conteúdo real enquanto aguarda resposta

---

## 7. Padrões UX

| Princípio          | Implementação                                                        |
|--------------------|----------------------------------------------------------------------|
| Feedback imediato  | Skeleton loader aparece em < 100ms após submit                       |
| Mensagens de erro  | Inline no SearchBar, não modal — não interrompe o fluxo              |
| Responsividade     | Mobile-first; breakpoints: 375px, 768px, 1280px                      |
| Acessibilidade     | `aria-label` em ícones, contraste WCAG AA, navegação por teclado     |
| Performance        | Cache de última busca no `localStorage` (TTL 10 min)                 |
| Estado vazio       | Tela inicial com ilustração e CTA "Busque uma cidade para começar"   |

---

## 8. Stack Técnica

| Camada       | Tecnologia                          |
|--------------|-------------------------------------|
| Framework    | React 18 com Vite                   |
| Estilo       | Tailwind CSS 3                      |
| HTTP Client  | Axios                               |
| Estado       | React Context API + useReducer      |
| Testes       | Vitest + React Testing Library      |
| Lint/Format  | ESLint + Prettier                   |
| Deploy       | Vercel (CI/CD via GitHub Actions)   |

---

## 9. Requisitos Funcionais (MVP)

- [x] RF01 — Busca de cidade por nome
- [x] RF02 — Exibição de temperatura atual, mínima e máxima
- [x] RF03 — Exibição de umidade relativa
- [x] RF04 — Exibição de probabilidade de chuva
- [x] RF05 — Previsão dos próximos 5 dias
- [x] RF06 — Ícone visual correspondente à condição climática
- [x] RF07 — Tratamento de erro para cidade não encontrada
- [x] RF08 — Cache de última busca (persistência de sessão)

---

## 10. Requisitos Não Funcionais

- [x] RNF01 — Primeira resposta visível (LCP) < 2.5s em 4G
- [x] RNF02 — Layout responsivo de 375px a 1920px
- [x] RNF03 — Chave de API nunca exposta no bundle (variável de ambiente)
- [x] RNF04 — Score Lighthouse Performance ≥ 85

---

## 11. Fora do Escopo (MVP)

- Geolocalização automática via GPS do navegador
- Múltiplas cidades simultâneas / comparativo
- Gráficos históricos de temperatura
- Notificações push de alertas climáticos
- Internacionalização (i18n) — apenas português BR no MVP

---

## 12. Variáveis de Ambiente

```env
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_CACHE_TTL_MINUTES=10
```

> Nunca commitar o arquivo `.env`. Usar `.env.example` como referência no repositório.

---

## 13. Critérios de Aceite do MVP

O MVP está completo quando:

1. O usuário consegue buscar "São Paulo" e ver temperatura, umidade, % de chuva e previsão de 5 dias sem erro.
2. A busca por uma cidade inexistente exibe mensagem de erro sem quebrar a aplicação.
3. Ao recarregar a página, a última cidade buscada é restaurada automaticamente.
4. O layout está funcional em iPhone SE (375px) e desktop Full HD (1920px).
5. Nenhuma chave de API aparece no código-fonte versionado.

---

*Documento gerado em: 2026-05-02 | Versão: 1.0.0*
