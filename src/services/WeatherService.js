import { fetchCurrentWeather, fetchForecast } from './weatherApi'
import { createWeatherModel } from '../models/WeatherModel'
import { createForecastModel } from '../models/ForecastModel'

export async function getWeatherData(city) {
  const [weatherRaw, forecastRaw] = await Promise.all([
    fetchCurrentWeather(city),
    fetchForecast(city),
  ])
  return {
    weather: createWeatherModel(weatherRaw),
    forecast: createForecastModel(forecastRaw),
  }
}
