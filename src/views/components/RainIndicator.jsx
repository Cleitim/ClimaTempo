import { useRainIndicator } from '../../context/WeatherContext'

function getRainColor(pct) {
  if (pct <= 30) return { stroke: '#22c55e', label: 'Sem chuva prevista' }
  if (pct <= 60) return { stroke: '#eab308', label: 'Possibilidade de chuva' }
  return { stroke: '#3b82f6', label: 'Alta chance de chuva' }
}

export default function RainIndicator() {
  const { rainChance } = useRainIndicator()
  if (rainChance === null) return null

  const { stroke, label } = getRainColor(rainChance)
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (rainChance / 100) * circ

  return (
    <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur rounded-2xl p-3 sm:p-5 text-white w-[140px] sm:w-[180px]">
      <div className="relative">
        <svg viewBox="0 0 88 88"
          className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] -rotate-90">
          <circle cx="44" cy="44" r={r} fill="none"
            stroke="white" strokeOpacity="0.2" strokeWidth="7" />
          <circle cx="44" cy="44" r={r} fill="none"
            stroke={stroke} strokeWidth="7"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl font-bold">
          {rainChance}%
        </span>
      </div>
      <span className="text-xs opacity-70 text-center leading-tight">{label}</span>
      <span className="text-xs font-medium">Chuva</span>
    </div>
  )
}
