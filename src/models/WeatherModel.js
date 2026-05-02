export function createWeatherModel(apiData) {
  return {
    city: apiData.name,
    country: apiData.sys?.country ?? '',
    temp: Math.round(apiData.main.temp),
    tempMin: Math.round(apiData.main.temp_min),
    tempMax: Math.round(apiData.main.temp_max),
    feelsLike: Math.round(apiData.main.feels_like),
    humidity: apiData.main.humidity,
    description: apiData.weather[0]?.description ?? '',
    icon: apiData.weather[0]?.icon ?? '',
    windSpeed: apiData.wind?.speed ?? 0,
    rainChance: Math.round((apiData.pop ?? 0) * 100),
  }
}
