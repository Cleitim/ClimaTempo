import { useWeather } from '../../context/WeatherContext'
import { formatTemp, getWeatherIconUrl, capitalize } from '../../utils/formatters'

const bgMap = {
  '01': 'from-yellow-400 to-orange-400',
  '02': 'from-blue-400 to-sky-300',
  '03': 'from-gray-400 to-slate-400',
  '04': 'from-gray-500 to-slate-500',
  '09': 'from-blue-600 to-indigo-500',
  '10': 'from-blue-500 to-cyan-400',
  '11': 'from-gray-700 to-slate-600',
  '13': 'from-sky-200 to-blue-200',
  '50': 'from-gray-400 to-zinc-400',
}

function getGradient(icon) {
  const code = icon?.slice(0, 2) ?? '01'
  return bgMap[code] ?? 'from-blue-500 to-indigo-500'
}

export default function WeatherCard() {
  const { weather } = useWeather()
  if (!weather) return null

  const gradient = getGradient(weather.icon)

  return (
    <div className={`w-full max-w-lg mx-auto rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{weather.city}, {weather.country}</h2>
          <p className="text-sm opacity-80 capitalize">{capitalize(weather.description)}</p>
        </div>
        <img
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
          className="w-16 h-16"
        />
      </div>

      <p className="text-7xl font-light mt-2">{formatTemp(weather.temp)}</p>

      <p className="text-sm opacity-70 mt-1">
        {formatTemp(weather.tempMin)} / {formatTemp(weather.tempMax)}
      </p>

      <div className="flex gap-4 mt-5 text-sm">
        <Chip label="Umidade" value={`${weather.humidity}%`} />
        <Chip label="Sensação" value={formatTemp(weather.feelsLike)} />
        <Chip label="Vento" value={`${weather.windSpeed} m/s`} />
      </div>
    </div>
  )
}

function Chip({ label, value }) {
  return (
    <div className="flex flex-col items-center bg-white/20 rounded-xl px-4 py-2 flex-1">
      <span className="text-xs opacity-70">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
