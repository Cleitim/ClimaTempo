import { WeatherProvider } from './context/WeatherContext'
import Home from './views/pages/Home'

export default function App() {
  return (
    <WeatherProvider>
      <Home />
    </WeatherProvider>
  )
}
