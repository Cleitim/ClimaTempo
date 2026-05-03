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
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (rainChance / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur rounded-2xl p-5 text-white w-full max-w-[180px]">
      <svg width="88" height="88" className="-rotate-90">
        <circle cx="44" cy="44" r={radius} fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="7" />
        <circle
          cx="44" cy="44" r={radius} fill="none"
          stroke={stroke} strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <span className="text-2xl font-bold -mt-14">{rainChance}%</span>
      <span className="text-xs opacity-70 mt-8 text-center leading-tight">{label}</span>
      <span className="text-xs font-medium">Chuva</span>
    </div>
  )
}
