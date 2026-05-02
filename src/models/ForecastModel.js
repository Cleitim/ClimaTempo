export function createForecastModel(apiList) {
  const byDay = {}

  apiList.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]
    if (!byDay[date]) {
      byDay[date] = {
        date,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        description: item.weather[0]?.description ?? '',
        icon: item.weather[0]?.icon ?? '',
        rainChance: Math.round((item.pop ?? 0) * 100),
      }
    } else {
      if (item.main.temp_min < byDay[date].tempMin) byDay[date].tempMin = item.main.temp_min
      if (item.main.temp_max > byDay[date].tempMax) byDay[date].tempMax = item.main.temp_max
      if (item.pop > byDay[date].rainChance / 100) {
        byDay[date].rainChance = Math.round(item.pop * 100)
        byDay[date].description = item.weather[0]?.description ?? byDay[date].description
        byDay[date].icon = item.weather[0]?.icon ?? byDay[date].icon
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
