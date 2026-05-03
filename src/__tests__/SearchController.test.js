import { validateCity } from '../controllers/SearchController'

describe('validateCity', () => {
  test('string vazia retorna inválido', () => {
    const result = validateCity('')
    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
  })

  test('1 caractere retorna inválido', () => {
    expect(validateCity('A').valid).toBe(false)
  })

  test('só números retorna inválido', () => {
    expect(validateCity('123').valid).toBe(false)
  })

  test('caracteres especiais inválidos retorna inválido', () => {
    expect(validateCity('<script>').valid).toBe(false)
  })

  test('cidade válida com acento é aceita e retorna value trimado', () => {
    const result = validateCity('São Paulo')
    expect(result.valid).toBe(true)
    expect(result.value).toBe('São Paulo')
  })

  test('string com apenas espaços retorna inválido', () => {
    expect(validateCity('   ').valid).toBe(false)
  })
})
