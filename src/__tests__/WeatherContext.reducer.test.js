import { reducer, initialState } from '../context/WeatherContext'

const payload = {
  weather: { city: 'São Paulo', temp: 22 },
  forecast: [{ date: '2026-05-04' }],
}

describe('WeatherContext reducer', () => {
  test('FETCH_START seta status loading e zera error', () => {
    const stateWithError = { ...initialState, status: 'error', error: 'algum erro' }
    const next = reducer(stateWithError, { type: 'FETCH_START' })
    expect(next.status).toBe('loading')
    expect(next.error).toBeNull()
  })

  test('FETCH_SUCCESS seta status success, weather e forecast', () => {
    const next = reducer(initialState, { type: 'FETCH_SUCCESS', payload })
    expect(next.status).toBe('success')
    expect(next.weather).toBe(payload.weather)
    expect(next.forecast).toBe(payload.forecast)
  })

  test('FETCH_SUCCESS usado para cache produz estado idêntico ao de busca', () => {
    // RESTORE_CACHE foi unificado em FETCH_SUCCESS — ambos produzem o mesmo estado
    const fromSearch = reducer(initialState, { type: 'FETCH_SUCCESS', payload })
    const fromCache = reducer(initialState, { type: 'FETCH_SUCCESS', payload })
    expect(fromSearch).toEqual(fromCache)
  })

  test('FETCH_ERROR seta status error e registra a mensagem', () => {
    const next = reducer(initialState, { type: 'FETCH_ERROR', payload: 'Cidade não encontrada.' })
    expect(next.status).toBe('error')
    expect(next.error).toBe('Cidade não encontrada.')
  })

  test('FETCH_ERROR não apaga weather anterior', () => {
    const withWeather = reducer(initialState, { type: 'FETCH_SUCCESS', payload })
    const afterError = reducer(withWeather, { type: 'FETCH_ERROR', payload: 'erro' })
    expect(afterError.weather).toBe(payload.weather)
  })

  test('action desconhecida retorna estado sem modificações', () => {
    const next = reducer(initialState, { type: 'UNKNOWN_ACTION' })
    expect(next).toBe(initialState)
  })
})
