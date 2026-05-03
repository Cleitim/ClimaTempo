import { createForecastModel } from '../models/ForecastModel'

function makeItem(date, hour = '12:00:00', overrides = {}) {
  const { main: mainOverride, ...restOverrides } = overrides
  return {
    dt_txt: `${date} ${hour}`,
    main: { temp_min: 18, temp_max: 26, ...(mainOverride ?? {}) },
    weather: [{ description: 'claro', icon: '01d' }],
    pop: 0.2,
    ...restOverrides,
  }
}

const DAYS = ['2026-05-03','2026-05-04','2026-05-05','2026-05-06','2026-05-07','2026-05-08']

describe('createForecastModel', () => {
  test('array vazio retorna []', () => {
    expect(createForecastModel([])).toEqual([])
  })

  test('null retorna []', () => {
    expect(createForecastModel(null)).toEqual([])
  })

  test('undefined retorna []', () => {
    expect(createForecastModel(undefined)).toEqual([])
  })

  test('item sem dt_txt é ignorado e não crasha', () => {
    const items = [{ main: { temp_min: 10, temp_max: 20 }, weather: [], pop: 0 }]
    expect(createForecastModel(items)).toEqual([])
  })

  test('um único dia futuro é mapeado corretamente', () => {
    const items = [makeItem(DAYS[0]), makeItem(DAYS[1], '12:00:00', { pop: 0.8 })]
    const result = createForecastModel(items)
    expect(result).toHaveLength(1)
    expect(result[0].date).toBe(DAYS[1])
    expect(result[0].rainChance).toBe(80)
  })

  test('6 dias distintos retorna exatamente 5 (slice corta o primeiro)', () => {
    const items = DAYS.map((date) => makeItem(date))
    expect(createForecastModel(items)).toHaveLength(5)
  })

  test('acumula tempMin corretamente entre períodos do mesmo dia', () => {
    const items = [
      makeItem(DAYS[0]),
      makeItem(DAYS[1], '00:00:00', { main: { temp_min: 15, temp_max: 20 } }),
      makeItem(DAYS[1], '06:00:00', { main: { temp_min: 10, temp_max: 22 } }),
      makeItem(DAYS[1], '12:00:00', { main: { temp_min: 17, temp_max: 28 } }),
    ]
    const result = createForecastModel(items)
    expect(result[0].date).toBe(DAYS[1])
    expect(result[0].tempMin).toBe(10)
    expect(result[0].tempMax).toBe(28)
  })

  test('rainChance acumula o valor máximo do dia', () => {
    const items = [
      makeItem(DAYS[0]),
      makeItem(DAYS[1], '00:00:00', { pop: 0.2 }),
      makeItem(DAYS[1], '12:00:00', { pop: 0.9 }),
      makeItem(DAYS[1], '18:00:00', { pop: 0.4 }),
    ]
    const result = createForecastModel(items)
    expect(result[0].rainChance).toBe(90)
  })
})
