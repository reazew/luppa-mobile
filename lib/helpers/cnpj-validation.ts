export function cnpjValidation(cnpj: string) {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, '')

  if (cleanCNPJ.length !== 14 || /^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false
  }

  const weight1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const weight2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const calculateDigit = (weights: number[], digits: string): number => {
    const sum = weights.reduce((acc, weight, index) => {
      return acc + weight * parseInt(digits[index], 10)
    }, 0)

    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const digit1 = calculateDigit(weight1, cleanCNPJ.slice(0, 12))
  if (parseInt(cleanCNPJ[12], 10) !== digit1) {
    return false
  }

  const digit2 = calculateDigit(weight2, cleanCNPJ.slice(0, 13))
  if (parseInt(cleanCNPJ[13], 10) !== digit2) {
    return false
  }

  return true
}
