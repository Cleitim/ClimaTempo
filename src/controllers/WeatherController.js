import { fetchCurrentWeather, fetchForecast } from '../services/weatherApi'
import { createWeatherModel } from '../models/WeatherModel'
import { createForecastModel } from '../models/ForecastModel'

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
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
}

export async function searchWeather(city) {
  const [weatherRaw, forecastRaw] = await Promise.all([
    fetchCurrentWeather(city),
    fetchForecast(city),
  ])

  const result = {
    weather: createWeatherModel(weatherRaw),
    forecast: createForecastModel(forecastRaw),
  }

  saveCache(result)
  return result
}
