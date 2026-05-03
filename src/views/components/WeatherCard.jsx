import { useWeatherCard } from '../../context/WeatherContext'
import { formatTemp, capitalize, getWeatherGradient } from '../../utils/formatters'
import WeatherIcon from './WeatherIcon'

export default function WeatherCard() {
  const { weather } = useWeatherCard()
  if (!weather) return null

  const gradient = getWeatherGradient(weather.icon)

  return (
    <div className={`w-full rounded-2xl bg-gradient-to-br ${gradient} p-4 sm:p-6 text-white shadow-xl`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold leading-tight">
            {weather.city}, {weather.country}
          </h2>
          <p className="text-sm opacity-80 capitalize mt-0.5">{capitalize(weather.description)}</p>
        </div>
        <WeatherIcon icon={weather.icon} size={56} />
      </div>

      <p className="text-5xl sm:text-7xl font-light mt-3">{formatTemp(weather.temp)}</p>

      <p className="text-sm opacity-70 mt-1">
        {formatTemp(weather.tempMin)} / {formatTemp(weather.tempMax)}
      </p>

      <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-5">
        <Chip label="Umidade" value={`${weather.humidity}%`} />
        <Chip label="Sensação" value={formatTemp(weather.feelsLike)} />
        <Chip label="Vento" value={`${weather.windSpeed} m/s`} />
      </div>
    </div>
  )
}

function Chip({ label, value }) {
  return (
    <div className="flex flex-col items-center bg-white/20 rounded-xl px-2 sm:px-4 py-2 flex-1">
      <span className="text-xs opacity-70">{label}</span>
      <span className="font-semibold text-sm">{value}</span>
    </div>
  )
}
