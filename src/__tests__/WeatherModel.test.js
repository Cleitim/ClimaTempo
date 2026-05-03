import { createWeatherModel } from '../models/WeatherModel'

const base = {
  name: 'São Paulo',
  sys: { country: 'BR' },
  main: { temp: 22.5, temp_min: 18, temp_max: 26, feels_like: 21, humidity: 78 },
  weather: [{ description: 'nublado', icon: '04d' }],
  wind: { speed: 3.5 },
  pop: 0.65,
}

describe('createWeatherModel', () => {
  test('mapeia campos corretos com dados completos', () => {
    const model = createWeatherModel(base)
    expect(model.city).toBe('São Paulo')
    expect(model.country).toBe('BR')
    expect(model.temp).toBe(23)
    expect(model.humidity).toBe(78)
    expect(model.rainChance).toBe(65)
    expect(model.windSpeed).toBe(3.5)
  })

  test('campo main ausente não crasha e usa fallbacks 0', () => {
    const model = createWeatherModel({ ...base, main: undefined })
    expect(model.temp).toBe(0)
    expect(model.tempMin).toBe(0)
    expect(model.tempMax).toBe(0)
    expect(model.feelsLike).toBe(0)
    expect(model.humidity).toBe(0)
  })

  test('weather array vazio usa strings vazias', () => {
    const model = createWeatherModel({ ...base, weather: [] })
    expect(model.description).toBe('')
    expect(model.icon).toBe('')
  })

  test('pop ausente resulta em rainChance 0', () => {
    const { pop: _pop, ...rest } = base
    const model = createWeatherModel(rest)
    expect(model.rainChance).toBe(0)
  })

  test('wind ausente resulta em windSpeed 0', () => {
    const model = createWeatherModel({ ...base, wind: undefined })
    expect(model.windSpeed).toBe(0)
  })
})
