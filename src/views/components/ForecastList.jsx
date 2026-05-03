import { useForecast } from '../../context/WeatherContext'
import { formatTemp, formatDay } from '../../utils/formatters'
import WeatherIcon from './WeatherIcon'

export default function ForecastList() {
  const { forecast } = useForecast()
  if (!forecast?.length) return null

  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-white/70 text-sm font-medium mb-3">Próximos 5 dias</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {forecast.map((day) => (
          <div key={day.date}
            className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur rounded-xl px-3 py-3 min-w-[72px] text-white flex-shrink-0">
            <span className="text-xs capitalize opacity-70">{formatDay(day.date)}</span>
            <WeatherIcon icon={day.icon} size={40} />
            <span className="text-sm font-semibold">{formatTemp(day.tempMax)}</span>
            <span className="text-xs opacity-60">{formatTemp(day.tempMin)}</span>
            <span className="text-xs opacity-70">{day.rainChance}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
