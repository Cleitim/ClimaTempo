import { useWeatherStatus } from '../../context/WeatherContext'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import ForecastList from '../components/ForecastList'
import RainIndicator from '../components/RainIndicator'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const { status, hasWeather } = useWeatherStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex flex-col items-center px-4 py-8 sm:py-10">
      <header className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">ClimaTempo</h1>
        <p className="text-white/60 text-sm mt-1">Previsão do tempo em tempo real</p>
      </header>

      <SearchBar />

      <main className="mt-6 sm:mt-8 w-full max-w-lg flex flex-col items-center gap-4 sm:gap-6">
        {status === 'loading' && <LoadingSpinner />}

        {status === 'success' && hasWeather && (
          <>
            <div className="w-full flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
              <div className="flex-1">
                <WeatherCard />
              </div>
              <div className="flex justify-center sm:block">
                <RainIndicator />
              </div>
            </div>
            <ForecastList />
          </>
        )}

        {status === 'idle' && (
          <div className="text-center text-white/50 mt-12 sm:mt-16">
            <p className="text-5xl mb-4">&#9925;</p>
            <p className="text-sm">Busque uma cidade para começar</p>
          </div>
        )}
      </main>
    </div>
  )
}
