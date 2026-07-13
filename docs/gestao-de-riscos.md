# Gestão de Riscos — ClimaTempo

> Atividade de Gerenciamento de Riscos aplicada ao projeto **ClimaTempo** — aplicação
> web frontend (React + Vite, arquitetura MVC) que consome a API do OpenWeatherMap.
>
> *Documento gerado em: 2026-07-12 | Versão: 1.0.0*

---

## 1. Cenário utilizado

**Projeto próprio.**

A análise de riscos foi aplicada sobre o **ClimaTempo**, o projeto autoral desenvolvido
ao longo do curso — e não sobre o estudo de caso genérico apresentado em aula. A escolha
foi deliberada: por conhecer o código, a stack e as decisões de arquitetura em detalhe
(ver [`escopo-mvp.md`](escopo-mvp.md) e [`backlog.md`](backlog.md)), os riscos levantados
são concretos e verificáveis, e não hipotéticos.

Características do cenário que moldam o perfil de risco:

| Fator | Detalhe | Implicação de risco |
|---|---|---|
| Dependência externa única | API OpenWeatherMap (`/weather` e `/forecast`) | Ponto único de falha do produto |
| Chave de API no frontend | `VITE_OPENWEATHER_API_KEY` embutida no bundle | Exposição / abuso de cota |
| Plano gratuito da API | Rate limit e ativação lenta (até 2h) | Indisponibilidade e erro 401 |
| Deploy contínuo (Vercel) | Push em `master` publica direto | Regressão em produção sem gate |
| Desenvolvedor único + IA | Sem revisão por pares | Erro silencioso não detectado |

---

## 2. Registro de Riscos (Risk Register)

Probabilidade e Impacto em escala de 1 (baixo) a 5 (alto). **Exposição = Prob × Impacto.**

| ID | Risco | Categoria | Prob | Imp | Exp | Estratégia | Resposta |
|----|-------|-----------|:----:|:---:|:---:|------------|----------|
| R01 | **Chave de API exposta no bundle** e usada por terceiros, estourando a cota | Segurança | 4 | 5 | **20** | Mitigar / Transferir | Mover chamadas para um proxy serverless (Vercel Functions) que guarda a chave; aplicar rate limiting por IP na própria função; monitorar consumo na conta |
| R02 | **Indisponibilidade da API** OpenWeatherMap (queda, mudança de contrato, 5xx) | Externo | 3 | 5 | **15** | Mitigar | Timeout + retry com backoff; mensagem de erro amigável; cache `localStorage` (TTL 10min) serve como fallback de leitura |
| R03 | **Estouro do rate limit** do plano gratuito (60 req/min) em pico de acessos | Externo | 3 | 4 | **12** | Mitigar / Aceitar | Debounce de 400ms na busca; cache da última busca; evitar chamadas duplicadas current+forecast desnecessárias |
| R04 | **Regressão em produção** por push direto na `master` sem gate de qualidade | Processo | 3 | 4 | **12** | Mitigar | CI no GitHub Actions rodando `lint` + `test` + `build` como gate obrigatório antes do deploy Vercel |
| R05 | **Entrada maliciosa / XSS** no campo de busca de cidade | Segurança | 2 | 4 | **8** | Mitigar | Validação em `SearchController.validateCity` (mín. 2 chars, bloqueio de scripts); teste de fronteira já cobre o caso XSS |
| R06 | **Erro 401 por chave recém-criada** (ativação leva até 2h) confundido com bug | Externo | 3 | 2 | **6** | Aceitar | Documentado no README; mensagem de erro específica orienta o usuário a aguardar |
| R07 | **Dado ausente/nulo na resposta** da API (`main`, `pop`, `wind`) quebra a UI | Técnico | 2 | 3 | **6** | Mitigar | Models (`WeatherModel`, `ForecastModel`) normalizam campos ausentes; suíte de testes cobre payloads incompletos |
| R08 | **Bug introduzido por código gerado por IA** aceito sem revisão | Processo | 3 | 3 | **9** | Mitigar | Revisão humana de todo diff; 32 testes automatizados; rastreabilidade dos prompts em [`prompts.md`](prompts.md) |
| R09 | **Custo inesperado** caso a cota gratuita seja excedida e vire plano pago | Financeiro | 2 | 3 | **6** | Transferir / Aceitar | Alerta de consumo na conta OpenWeatherMap; cache reduz volume de chamadas |

### Mapa de calor (priorização por exposição)

```
Impacto
  5 |            R02        R01
  4 |      R05   R03,R04
  3 |      R07,R09  R08
  2 |            R06
  1 |
    +----------------------------------
        1     2     3     4     5   Probabilidade
```

Riscos no quadrante superior direito (**R01, R02**) concentram a atenção prioritária.

---

## 3. Principais riscos identificados (resumo)

Dos nove riscos catalogados, três dominam a exposição do projeto:

1. **R01 — Exposição da chave de API (Exp. 20).** Por ser um app 100% frontend, a chave do
   OpenWeatherMap é embarcada no bundle entregue ao navegador. Qualquer pessoa pode extraí-la
   das requisições de rede e usá-la, esgotando a cota gratuita ou gerando custo. É o risco de
   maior severidade porque combina alta probabilidade com impacto máximo.

2. **R02 — Indisponibilidade da API externa (Exp. 15).** O produto inteiro depende de um
   fornecedor único. Se a OpenWeatherMap cair, mudar o contrato de resposta ou retornar 5xx,
   o ClimaTempo perde sua função central. Não há segunda fonte de dados.

3. **R04 / R08 — Regressão sem gate e bug de código gerado por IA (Exp. 12 e 9).** O fluxo de
   deploy contínuo publica direto na `master`, e parte do código foi gerada por IA. Sem um
   portão automatizado de qualidade, uma regressão chega à produção sem barreira.

Os demais (R03, R05, R06, R07, R09) são de exposição moderada a baixa e, em boa parte, já
mitigados por decisões de arquitetura existentes (cache, validação de entrada, normalização
nos models).

---

## 4. Estratégia de resposta considerada particularmente importante

**Mitigar + Transferir o R01 (chave de API) movendo a chamada para um proxy serverless.**

Esta é a resposta de maior valor para o projeto, por três motivos:

- **Ataca o risco de maior exposição (20).** Enquanto a chave viver no frontend, nenhuma
  outra medida elimina o problema — apenas reduz sintomas.
- **Muda a natureza do risco, não só a probabilidade.** Ao introduzir uma **Vercel Serverless
  Function** como intermediária, a chave passa a residir no servidor (variável de ambiente do
  backend, nunca enviada ao browser). O frontend chama `/api/weather?city=...`; a função
  injeta a chave e repassa à OpenWeatherMap. Isso **transfere** o segredo para um ambiente
  controlado e **mitiga** o abuso, ainda podendo aplicar rate limiting por IP na própria função.
- **Habilita defesas em camadas.** Com o proxy no lugar, é possível somar rate limiting por
  IP na função, cache no edge e monitoramento de consumo — defesas que não existem quando a
  chamada sai direto do navegador.

**Plano de ação resumido:**

```
1. Criar /api/weather.js e /api/forecast.js como Vercel Functions
2. Mover VITE_OPENWEATHER_API_KEY → OPENWEATHER_API_KEY (env do backend, sem prefixo VITE_)
3. Ajustar weatherApi.js para apontar aos endpoints internos /api/*
4. Adicionar rate limiting básico por IP na função
5. Revogar a chave antiga e emitir nova (a antiga já circulou no bundle)
```

Complementarmente, o **R04** é tratado por uma estratégia de mitigação barata e de alto retorno:
um workflow de **GitHub Actions** que roda `npm run lint && npm run test -- --run && npm run build`
como **gate obrigatório**, impedindo que um commit quebrado seja publicado pelo deploy contínuo.

---

## 5. Como a IA Generativa apoiou a atividade

A IA Generativa (Claude, via Claude Code) atuou como **copiloto analítico**, acelerando e
enriquecendo a identificação e a análise dos riscos:

- **Leitura e síntese do projeto.** A IA percorreu o código e a documentação real
  (`README.md`, `escopo-mvp.md`, estrutura MVC em `src/`) e extraiu do próprio projeto os
  pontos frágeis — chave no bundle, dependência única de API, deploy sem gate — em vez de
  partir de uma lista genérica de riscos.
- **Brainstorming estruturado.** Ajudou a enumerar riscos por categoria (segurança, externo,
  processo, técnico, financeiro), reduzindo pontos cegos que um levantamento manual poderia
  deixar passar.
- **Formalização da análise.** Organizou os riscos em um Risk Register com probabilidade,
  impacto e exposição, gerou o mapa de calor e classificou as estratégias de resposta
  (mitigar / transferir / aceitar / evitar).
- **Detalhamento de respostas técnicas.** Sugeriu o plano de proxy serverless e o gate de CI
  com comandos concretos, coerentes com a stack já usada (Vercel, GitHub Actions, Vitest).
- **Padronização da escrita.** Produziu este documento no mesmo estilo e formatação dos demais
  arquivos de `docs/`, mantendo consistência de rastreabilidade (ver [`prompts.md`](prompts.md)).

Em síntese: a IA **acelerou o trabalho e ampliou a cobertura**, mas as decisões de priorização
e a validação final permaneceram sob responsabilidade humana.

---

## 6. Limitações, dificuldades e cuidados percebidos no uso da IA

- **Excesso de confiança / risco de alucinação.** A IA pode afirmar com segurança dados
  incorretos (ex.: o limite exato de requisições do plano gratuito). Números e regras de
  fornecedores foram tratados como *a confirmar* na fonte oficial, não como verdade absoluta.
- **Necessidade de contexto real.** Sem apontar a IA para os arquivos do projeto, as respostas
  tenderiam ao genérico. O valor só apareceu quando ela leu o código e a documentação reais —
  a qualidade da saída é proporcional à qualidade do contexto fornecido.
- **Risco de introduzir bugs (o próprio R08).** Código gerado por IA pode conter erros sutis
  ou padrões inseguros. Foi tratado com revisão humana de todo diff e apoio dos 32 testes
  automatizados — a IA não substitui o gate de qualidade, ela o torna mais necessário.
- **Vieses e omissões.** A IA reflete padrões comuns e pode subestimar riscos específicos do
  domínio (clima, cotas de API meteorológica). O julgamento humano foi indispensável para
  ajustar probabilidade e impacto ao contexto concreto do projeto.
- **Segurança do próprio prompt.** Ao usar IA em projeto com segredos, é preciso cuidado para
  **não colar chaves reais** (ex.: o conteúdo do `.env`) na conversa. Trabalhou-se apenas com
  os nomes das variáveis, nunca com seus valores.
- **Responsabilidade final é humana.** A IA propõe; a decisão sobre o que priorizar, aceitar ou
  investir dinheiro/tempo para mitigar continua sendo do responsável pelo projeto.

---

## Referências internas

| Documento | Relação com este |
|---|---|
| [`escopo-mvp.md`](escopo-mvp.md) | Arquitetura e requisitos que originam os riscos técnicos |
| [`backlog.md`](backlog.md) | Itens RF/RT que podem virar ações de mitigação |
| [`prompts.md`](prompts.md) | Rastreabilidade do uso de IA no projeto |
| [`test-results.md`](test-results.md) | Evidência do gate de qualidade (32 testes) |
