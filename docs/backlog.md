# Backlog — ClimaTempo

> Organizado em 3 releases. Cada item contém ID, tipo (RF = Requisito Funcional / RT = Requisito Técnico), descrição e critérios de aceite.

---

## Release 1 — Core (Funcionalidades Essenciais)

> Meta: aplicação funcional com busca e exibição de dados climáticos reais.

---

### RF01 — Busca de cidade por nome

- [ ] O usuário pode digitar o nome de uma cidade no campo de busca
- [ ] A busca é disparada ao pressionar `Enter` ou clicar no botão
- [ ] O campo aceita apenas cidades com mínimo de 2 caracteres
- [ ] Cidades com caracteres especiais (acentos) são aceitas corretamente

---

### RF02 — Exibição de temperatura atual, mínima e máxima

- [ ] A temperatura atual é exibida em destaque (°C)
- [ ] As temperaturas mínima e máxima do dia são exibidas abaixo da atual
- [ ] Os valores refletem os dados retornados pela API sem arredondamento incorreto

---

### RF03 — Exibição de umidade relativa

- [ ] O percentual de umidade do ar é exibido no `WeatherCard`
- [ ] O valor é apresentado com o símbolo `%`
- [ ] O dado é atualizado a cada nova busca

---

### RF04 — Exibição de probabilidade de chuva

- [ ] O `RainIndicator` exibe a probabilidade de precipitação em `%`
- [ ] A cor da barra muda conforme a faixa: verde (0–30%), amarelo (31–60%), azul (61–100%)
- [ ] Um tooltip textual é exibido ao passar o cursor: "Sem chuva prevista" / "Possibilidade de chuva" / "Alta chance de chuva"

---

### RF05 — Previsão dos próximos 5 dias

- [ ] O `ForecastList` exibe 5 cards com previsão diária
- [ ] Cada card contém: dia da semana, ícone de condição, temperatura máxima e mínima
- [ ] Em mobile, a lista permite scroll horizontal sem quebrar o layout

---

### RF06 — Ícone visual de condição climática

- [ ] O ícone correspondente à condição climática atual é exibido no `WeatherCard`
- [ ] Ícones são carregados a partir da URL da API (`openweathermap.org/img/wn/`)
- [ ] Um ícone de fallback é exibido caso a URL falhe

---

### RF07 — Tratamento de erro para cidade não encontrada

- [ ] Ao buscar uma cidade inexistente (404), uma mensagem de erro é exibida inline no `SearchBar`
- [ ] A mensagem não abre modal nem redireciona o usuário
- [ ] O restante da interface permanece intacto após o erro

---

### RT01 — Integração com OpenWeatherMap API

- [ ] Os endpoints `/weather` e `/forecast` são consumidos via `weatherApi.js`
- [ ] A chave de API é lida exclusivamente de `VITE_OPENWEATHER_API_KEY`
- [ ] A chave nunca aparece no bundle de produção ou no código versionado
- [ ] Parâmetros `units=metric` e `lang=pt_br` são enviados em todas as requisições

---

### RT02 — Arquitetura MVC implementada

- [ ] `WeatherModel` e `ForecastModel` mapeiam e normalizam os dados da API
- [ ] `WeatherController` e `SearchController` orquestram o fluxo entre View e Service
- [ ] Nenhum componente de View faz chamada direta à API

---

## Release 2 — Qualidade (UX, Performance e Testes)

> Meta: experiência polida, acessível e coberta por testes.

---

### RF08 — Cache de última busca

- [ ] A última cidade buscada com sucesso é salva no `localStorage`
- [ ] Ao recarregar a página, a última busca é restaurada automaticamente
- [ ] O cache expira após 10 minutos (TTL configurável via `VITE_CACHE_TTL_MINUTES`)
- [ ] Se o cache estiver expirado, a tela inicial com CTA é exibida

---

### RF09 — Estado de carregamento (Skeleton Loading)

- [ ] O `LoadingSpinner` exibe skeleton nos cards durante o fetch
- [ ] O skeleton aparece em menos de 100ms após o submit da busca
- [ ] O skeleton é substituído pelo conteúdo real ao receber a resposta

---

### RF10 — Tela de estado vazio

- [ ] Na primeira visita (sem cache), uma ilustração e o texto "Busque uma cidade para começar" são exibidos
- [ ] O CTA direciona o foco para o campo de busca ao ser clicado

---

### RT03 — Responsividade mobile-first

- [ ] O layout é funcional nos breakpoints: 375px, 768px e 1280px
- [ ] Nenhum elemento ultrapassa a largura da tela em mobile (sem scroll horizontal indesejado)
- [ ] Testado nos tamanhos iPhone SE (375px) e Full HD (1920px)

---

### RT04 — Acessibilidade (WCAG AA)

- [ ] Todos os ícones possuem `aria-label` descritivo
- [ ] O contraste de texto atende ao nível WCAG AA (≥ 4.5:1 para texto normal)
- [ ] A aplicação é navegável inteiramente por teclado (Tab, Enter, Esc)

---

### RT05 — Cobertura de testes

- [ ] `SearchController` testado: entradas válidas, inválidas e vazias
- [ ] `WeatherModel` testado: mapeamento correto dos campos da API
- [ ] `WeatherCard` testado: renderização com dados reais e estado de loading
- [ ] `RainIndicator` testado: cor e tooltip corretos para cada faixa de probabilidade
- [ ] Todos os testes passam com `npm run test` sem erros

---

### RT06 — Qualidade de código

- [ ] `npm run lint` executa sem warnings ou erros
- [ ] Nenhuma variável não utilizada no código versionado
- [ ] Nenhum `console.log` de debug em produção

---

## Release 3 — Entrega Final (Deploy e Validação)

> Meta: aplicação publicada, validada e pronta para uso real.

---

### RT07 — Build de produção

- [ ] `npm run build` executa sem erros
- [ ] O bundle gerado não contém a chave de API exposta
- [ ] O tamanho do bundle principal (`index.js`) é inferior a 200kb (gzip)

---

### RT08 — Deploy no Vercel

- [ ] A aplicação está publicada e acessível via URL pública do Vercel
- [ ] As variáveis de ambiente estão configuradas no painel do Vercel (não no repositório)
- [ ] O deploy automático é acionado a cada push na branch `master`

---

### RT09 — Performance (Lighthouse)

- [ ] Score de Performance no Lighthouse ≥ 85
- [ ] LCP (Largest Contentful Paint) < 2.5s em conexão 4G simulada
- [ ] Sem erros de console no ambiente de produção

---

### RT10 — Validação dos critérios de aceite do MVP

- [ ] Busca por "São Paulo" retorna temperatura, umidade, % de chuva e previsão de 5 dias
- [ ] Busca por cidade inexistente exibe erro sem quebrar a aplicação
- [ ] Recarregar a página restaura a última cidade buscada (dentro do TTL)
- [ ] Layout funcional em iPhone SE (375px) e desktop Full HD (1920px)
- [ ] Nenhuma chave de API exposta no código-fonte versionado ou no bundle

---

*Versão: 1.0.0 | Atualizado em: 2026-05-02*
