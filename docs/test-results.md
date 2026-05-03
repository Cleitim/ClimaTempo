# Resultados dos Testes — ClimaTempo

> Gerado em: 2026-05-02 | Runner: Vitest v1.6.1 | Ambiente: jsdom

---

## Resumo

| Métrica       | Resultado |
|---------------|-----------|
| Test Files    | 5 passed  |
| Tests         | 32 passed |
| Falhas        | 0         |
| Duração       | ~705ms    |

---

## SearchController — `validateCity`

| # | Caso de teste | Status |
|---|---------------|--------|
| 1 | String vazia retorna inválido | ✅ PASS |
| 2 | 1 caractere retorna inválido | ✅ PASS |
| 3 | Só números retorna inválido | ✅ PASS |
| 4 | Caracteres especiais inválidos (`<script>`) retorna inválido | ✅ PASS |
| 5 | Cidade válida com acento (`São Paulo`) é aceita e retorna value trimado | ✅ PASS |
| 6 | String com apenas espaços retorna inválido | ✅ PASS |

---

## WeatherModel — `createWeatherModel`

| # | Caso de teste | Status |
|---|---------------|--------|
| 1 | Mapeia campos corretos com dados completos | ✅ PASS |
| 2 | Campo `main` ausente não crasha e usa fallbacks 0 | ✅ PASS |
| 3 | `weather` array vazio usa strings vazias | ✅ PASS |
| 4 | `pop` ausente resulta em `rainChance` 0 | ✅ PASS |
| 5 | `wind` ausente resulta em `windSpeed` 0 | ✅ PASS |

---

## ForecastModel — `createForecastModel`

| # | Caso de teste | Status |
|---|---------------|--------|
| 1 | Array vazio retorna `[]` | ✅ PASS |
| 2 | `null` retorna `[]` | ✅ PASS |
| 3 | `undefined` retorna `[]` | ✅ PASS |
| 4 | Item sem `dt_txt` é ignorado e não crasha | ✅ PASS |
| 5 | Um único dia futuro é mapeado corretamente | ✅ PASS |
| 6 | 6 dias distintos retorna exatamente 5 (slice corta o primeiro) | ✅ PASS |
| 7 | Acumula `tempMin` corretamente entre períodos do mesmo dia | ✅ PASS |
| 8 | `rainChance` acumula o valor máximo do dia | ✅ PASS |

---

## WeatherContext — Reducer

| # | Caso de teste | Status |
|---|---------------|--------|
| 1 | `FETCH_START` seta status `loading` e zera `error` | ✅ PASS |
| 2 | `FETCH_SUCCESS` seta status `success`, `weather` e `forecast` | ✅ PASS |
| 3 | `FETCH_SUCCESS` usado para cache produz estado idêntico ao de busca (`RESTORE_CACHE` unificado) | ✅ PASS |
| 4 | `FETCH_ERROR` seta status `error` e registra a mensagem | ✅ PASS |
| 5 | `FETCH_ERROR` não apaga `weather` anterior | ✅ PASS |
| 6 | Action desconhecida retorna estado sem modificações | ✅ PASS |

---

## RainIndicator — Fronteiras de cor e tooltip

| # | Caso de teste | Stroke esperado | Status |
|---|---------------|-----------------|--------|
| 1 | `rainChance null` não renderiza nada | — | ✅ PASS |
| 2 | `0%` → verde `#22c55e` / "Sem chuva prevista" | `#22c55e` | ✅ PASS |
| 3 | `30%` → verde `#22c55e` / "Sem chuva prevista" | `#22c55e` | ✅ PASS |
| 4 | `31%` → amarelo `#eab308` / "Possibilidade de chuva" | `#eab308` | ✅ PASS |
| 5 | `60%` → amarelo `#eab308` / "Possibilidade de chuva" | `#eab308` | ✅ PASS |
| 6 | `61%` → azul `#3b82f6` / "Alta chance de chuva" | `#3b82f6` | ✅ PASS |
| 7 | `100%` → azul `#3b82f6` / "Alta chance de chuva" | `#3b82f6` | ✅ PASS |

---

*Executado com: `npm run test -- --reporter=verbose --run`*
