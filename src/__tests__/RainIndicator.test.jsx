import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('../context/WeatherContext', () => ({
  useRainIndicator: vi.fn(),
}))

import { useRainIndicator } from '../context/WeatherContext'
import RainIndicator from '../views/components/RainIndicator'

function setup(rainChance) {
  useRainIndicator.mockReturnValue({ rainChance })
  const result = render(<RainIndicator />)
  const circles = result.container.querySelectorAll('circle')
  return { ...result, progressCircle: circles[1] }
}

describe('RainIndicator — fronteiras de cor e tooltip', () => {
  test('rainChance null não renderiza nada', () => {
    useRainIndicator.mockReturnValue({ rainChance: null })
    const { container } = render(<RainIndicator />)
    expect(container.firstChild).toBeNull()
  })

  test('0% — stroke verde e label "Sem chuva prevista"', () => {
    const { progressCircle } = setup(0)
    expect(progressCircle.getAttribute('stroke')).toBe('#22c55e')
    expect(screen.getByText('Sem chuva prevista')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  test('30% — stroke verde e label "Sem chuva prevista"', () => {
    const { progressCircle } = setup(30)
    expect(progressCircle.getAttribute('stroke')).toBe('#22c55e')
    expect(screen.getByText('Sem chuva prevista')).toBeInTheDocument()
  })

  test('31% — stroke amarelo e label "Possibilidade de chuva"', () => {
    const { progressCircle } = setup(31)
    expect(progressCircle.getAttribute('stroke')).toBe('#eab308')
    expect(screen.getByText('Possibilidade de chuva')).toBeInTheDocument()
  })

  test('60% — stroke amarelo e label "Possibilidade de chuva"', () => {
    const { progressCircle } = setup(60)
    expect(progressCircle.getAttribute('stroke')).toBe('#eab308')
    expect(screen.getByText('Possibilidade de chuva')).toBeInTheDocument()
  })

  test('61% — stroke azul e label "Alta chance de chuva"', () => {
    const { progressCircle } = setup(61)
    expect(progressCircle.getAttribute('stroke')).toBe('#3b82f6')
    expect(screen.getByText('Alta chance de chuva')).toBeInTheDocument()
  })

  test('100% — stroke azul e label "Alta chance de chuva"', () => {
    const { progressCircle } = setup(100)
    expect(progressCircle.getAttribute('stroke')).toBe('#3b82f6')
    expect(screen.getByText('Alta chance de chuva')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })
})
