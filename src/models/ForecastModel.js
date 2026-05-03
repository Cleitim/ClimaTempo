import { calcRainChance } from '../utils/formatters'

export function createForecastModel(apiList) {
  if (!Array.isArray(apiList) || apiList.length === 0) return []

  const byDay = {}

  apiList.forEach((item) => {
    if (!item.dt_txt) return
    const date = item.dt_txt.split(' ')[0]
    const rainChance = calcRainChance(item.pop)

    if (!byDay[date]) {
      byDay[date] = {
        date,
        tempMin: item.main?.temp_min ?? 0,
        tempMax: item.main?.temp_max ?? 0,
        description: item.weather?.[0]?.description ?? '',
        icon: item.weather?.[0]?.icon ?? '',
        rainChance,
      }
    } else {
      if ((item.main?.temp_min ?? 0) < byDay[date].tempMin) byDay[date].tempMin = item.main.temp_min
      if ((item.main?.temp_max ?? 0) > byDay[date].tempMax) byDay[date].tempMax = item.main.temp_max
      if (rainChance > byDay[date].rainChance) {
        byDay[date].rainChance = rainChance
        byDay[date].description = item.weather?.[0]?.description ?? byDay[date].description
        byDay[date].icon = item.weather?.[0]?.icon ?? byDay[date].icon
      }
    }
  })

  return Object.values(byDay)
    .slice(1, 6)
    .map((day) => ({
      ...day,
      tempMin: Math.round(day.tempMin),
      tempMax: Math.round(day.tempMax),
    }))
}
