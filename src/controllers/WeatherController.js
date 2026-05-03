import { getWeatherData } from '../services/WeatherService'
export { validateCity } from './SearchController'

const CACHE_KEY = 'climatempo_last'
const TTL = Number(import.meta.env.VITE_CACHE_TTL_MINUTES ?? 10) * 60 * 1000

export function loadCachedWeather() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > TTL) return null
    return data
  } catch {
    return null
  }
}

function saveCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
  } catch {
    // localStorage indisponível ou cheio
  }
}

export async function searchWeather(city) {
  const result = await getWeatherData(city)
  saveCache(result)
  return result
}
