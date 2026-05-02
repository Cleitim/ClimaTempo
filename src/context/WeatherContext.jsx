import { createContext, useContext, useReducer, useEffect } from 'react'
import { searchWeather, loadCachedWeather } from '../controllers/WeatherController'
import { validateCity } from '../controllers/SearchController'

const WeatherContext = createContext(null)

const initialState = {
  weather: null,
  forecast: [],
  status: 'idle',
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null }
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', weather: action.payload.weather, forecast: action.payload.forecast }
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.payload }
    case 'RESTORE_CACHE':
      return { ...state, status: 'success', weather: action.payload.weather, forecast: action.payload.forecast }
    default:
      return state
  }
}

export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const cached = loadCachedWeather()
    if (cached) dispatch({ type: 'RESTORE_CACHE', payload: cached })
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
      const message =
        err.response?.status === 404
          ? 'Cidade não encontrada. Verifique o nome e tente novamente.'
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

export function useWeather() {
  return useContext(WeatherContext)
}
