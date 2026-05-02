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
