import { createContext, useContext, useReducer, useEffect } from 'react'
import { searchWeather, loadCachedWeather, validateCity } from '../controllers/WeatherController'

const WeatherContext = createContext(null)

export const initialState = {
  weather: null,
  forecast: [],
  status: 'idle',
  error: null,
}

export function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null }
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', weather: action.payload.weather, forecast: action.payload.forecast }
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.payload }
    default:
      return state
  }
}

export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const cached = loadCachedWeather()
    if (cached) dispatch({ type: 'FETCH_SUCCESS', payload: cached })
  }, [])

  async function search(city) {
    const validation = validateCity(city)
    if (!validation.valid) {
      dispatch({ type: 'FETCH_ERROR', payload: validation.error })
      return
    }

    dispatch({ type: 'FETCH_START' })
    try {
      const result = await searchWeather(validation.value)
      dispatch({ type: 'FETCH_SUCCESS', payload: result })
    } catch (err) {
      const status = err.response?.status
      const message =
        status === 404
          ? 'Cidade não encontrada. Verifique o nome e tente novamente.'
          : status === 429
            ? 'Limite de requisições atingido. Aguarde alguns instantes.'
            : 'Erro ao buscar dados. Tente novamente em instantes.'
      dispatch({ type: 'FETCH_ERROR', payload: message })
    }
  }

  return (
    <WeatherContext.Provider value={{ ...state, search }}>
      {children}
    </WeatherContext.Provider>
  )
}

export function useSearchBar() {
  const { search, status, error } = useContext(WeatherContext)
  return { search, status, error }
}

export function useWeatherCard() {
  const { weather } = useContext(WeatherContext)
  return { weather }
}

export function useForecast() {
  const { forecast } = useContext(WeatherContext)
  return { forecast }
}

export function useRainIndicator() {
  const { weather } = useContext(WeatherContext)
  return { rainChance: weather?.rainChance ?? null }
}

export function useWeatherStatus() {
  const { status, weather } = useContext(WeatherContext)
  return { status, hasWeather: !!weather }
}

export function useWeather() {
  return useContext(WeatherContext)
}
