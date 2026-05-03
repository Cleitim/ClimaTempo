import { calcRainChance } from '../utils/formatters'

export function createWeatherModel(apiData) {
  const main = apiData.main ?? {}
  const weather = apiData.weather?.[0] ?? {}
  return {
    city: apiData.name ?? '',
    country: apiData.sys?.country ?? '',
    temp: Math.round(main.temp ?? 0),
    tempMin: Math.round(main.temp_min ?? 0),
    tempMax: Math.round(main.temp_max ?? 0),
    feelsLike: Math.round(main.feels_like ?? 0),
    humidity: main.humidity ?? 0,
    description: weather.description ?? '',
    icon: weather.icon ?? '',
    windSpeed: apiData.wind?.speed ?? 0,
    rainChance: calcRainChance(apiData.pop),
  }
}
