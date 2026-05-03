import { useState } from 'react'
import { useSearchBar } from '../../context/WeatherContext'

export default function SearchBar() {
  const [input, setInput] = useState('')
  const { search, status, error } = useSearchBar()

  function handleSubmit(e) {
    e.preventDefault()
    search(input)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Buscar cidade..."
          aria-label="Nome da cidade"
          maxLength={100}
          className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Buscar"
          className="px-5 py-3 rounded-xl bg-white text-blue-600 font-semibold text-sm hover:bg-white/90 disabled:opacity-50 transition-colors"
        >
          {status === 'loading' ? '...' : 'Buscar'}
        </button>
      </div>
      {error && status === 'error' && (
        <p role="alert" className="mt-2 text-sm text-red-200 text-center">
          {error}
        </p>
      )}
    </form>
  )
}
