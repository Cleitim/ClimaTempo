import { useWeather } from '../../context/WeatherContext'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import ForecastList from '../components/ForecastList'
import RainIndicator from '../components/RainIndicator'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const { status, weather } = useWeather()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex flex-col items-center px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">ClimaTempo</h1>
        <p className="text-white/60 text-sm mt-1">Previsão do tempo em tempo real</p>
      </header>

      <SearchBar />

      <main className="mt-8 w-full flex flex-col items-center gap-6">
        {status === 'loading' && <LoadingSpinner />}

        {status === 'success' && weather && (
          <>
            <div className="w-full max-w-lg flex gap-4 items-start">
              <div className="flex-1">
                <WeatherCard />
              </div>
              <RainIndicator />
            </div>
            <ForecastList />
          </>
        )}

        {status === 'idle' && (
          <div className="text-center text-white/50 mt-16">
            <p className="text-5xl mb-4">&#9925;</p>
            <p className="text-sm">Busque uma cidade para começar</p>
          </div>
        )}
      </main>
    </div>
  )
}
