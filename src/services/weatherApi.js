import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const params = { appid: API_KEY, units: 'metric', lang: 'pt_br' }

export async function fetchCurrentWeather(city) {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: { ...params, q: city },
  })
  return data
}

export async function fetchForecast(city) {
  const { data } = await axios.get(`${BASE_URL}/forecast`, {
    params: { ...params, q: city, cnt: 40 },
  })
  return data.list
}
