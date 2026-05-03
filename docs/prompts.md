# Prompts — ClimaTempo

> Registro dos prompts enviados durante o desenvolvimento do projeto.

---

## 2026-05-02

---

### Prompt 01

**Contexto:** Inicialização do projeto  
**Prompt:**
```
Contexto : MVC Uma aplicação web frontend que consome dados de uma API externa de clima e exibe informações como ,
temperatura, umidade e previsão para diferentes cidades.
Objetivo : faz busca por determinada cidade a api retornar os dados de temperatura, umidade e previsão, porcentagem de chuva .
Estilo : Criar componentes react/vue para exibir dados do clima, com padrões UX
Resposta : forneça todo o contuedo completo de docs/escopo-mvp.md
```

---

### Prompt 02

**Contexto:** Planejamento do backlog  
**Prompt:**
```
Contexto : O produto será entregue com 3 releases : core , qualidade e entrega final
Objetivo : Criar backlog minimo com IDs RF/RT e criterios de aceite.
Estilo : Checklist markdon
Resposta : conteudo de docs/backlog.md 

quero quer crie um arquivo também para salvar os prompts que estou enviando na pasta @docs\ com o nome prompts.md
```

---

### Prompt 03

**Contexto:** Arquitetura backend  
**Prompt:**
```
Contexto : FastAPI com camadas API, Service, Respository e componente PriorityAdvisor
Objetivo : Gerar diagrama Mermaid de componentes e fluxo de dados
Estilo : simples , legível e versionavel
Resposta : Apenas bloco Mermaid com o arquivo no repositorio
```

---

### Prompt 04

**Contexto:** Análise de qualidade do código  
**Prompt:**
```
1) quais pontos de acoplamento estão altos?
2) sistema está usando funções redundantes ?
3) onde está faltando validações?
4) Quais testes devo prioriza na próxima ralease?
resposta em um checklist
```

---

### Prompt 05

**Contexto:** Refatoração — redução de acoplamento  
**Prompt:**
```
melhorar esses pontos de acoplamento
- Todos os 4 componentes consomem useWeather() diretamente
- WeatherContext importa dois controllers
- WeatherController conhece Model e Service
- Lógica de gradiente (bgMap) embutida em WeatherCard
```

---

### Prompt 06

**Contexto:** Qualidade — funções redundantes e validações  
**Prompt:**
```
verificar as funções redundantes e arrumar e as validações também
- FETCH_SUCCESS e RESTORE_CACHE fazem o mesmo update
- Math.round((item.pop ?? 0) * 100) duplicado
- Math.round aplicado duas vezes em ForecastModel
- WeatherModel: apiData.main sem null-check
- ForecastModel: apiList não validado como array
- ForecastModel: item.dt_txt sem verificação
- weatherApi.js: sem timeout no axios
- weatherApi.js: sem tratamento de rate limit (429)
- saveCache sem try/catch
- SearchBar: sem maxLength no input
```

---

### Prompt 07

**Contexto:** Criação da suíte de testes  
**Prompt:**
```
criar uma pasta de teste e fazer um teste para cada um deste itens abaixo
- validateCity — casos: string vazia, 1 caractere, só números, caracteres especiais inválidos (<script>),
  cidade válida com acento (São Paulo), string com apenas espaços
- createWeatherModel — campo main ausente, weather array vazio, pop ausente, wind ausente
- createForecastModel — array vazio, um único item, itens de 6 dias, acumulação tempMin/tempMax
- Reducer do WeatherContext — FETCH_SUCCESS, FETCH_START zera error
- RainIndicator — cor e tooltip nos valores de fronteira: 0%, 30%, 31%, 60%, 61%, 100%
e me gravar o resultados dos testes
```

