export function formatTemp(value) {
  return `${value}°C`
}

export function formatDay(dateStr) {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
}

export function getWeatherIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function calcRainChance(pop) {
  return Math.round((pop ?? 0) * 100)
}

const gradientMap = {
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

export function getWeatherGradient(icon) {
  const code = icon?.slice(0, 2) ?? '01'
  return gradientMap[code] ?? 'from-blue-500 to-indigo-500'
}
