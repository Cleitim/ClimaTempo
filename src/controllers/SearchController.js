export function validateCity(city) {
  const trimmed = city.trim()
  if (trimmed.length < 2) return { valid: false, error: 'Digite ao menos 2 caracteres.' }
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmed)) return { valid: false, error: 'Nome de cidade inválido.' }
  return { valid: true, value: trimmed }
}
