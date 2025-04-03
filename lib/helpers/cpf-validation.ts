export function cpfValidation(cpf: string) {
  const cleanCPF = cpf.replace(/[^\d]/g, '')

  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
    return false
  }

  for (let t = 9; t < 11; t++) {
    let d = 0
    for (let c = 0; c < t; c++) {
      d += Number(cleanCPF[c]) * (t + 1 - c)
    }
    d = ((10 * d) % 11) % 10
    if (Number(cleanCPF[t]) !== d) {
      return false
    }
  }
  return true
}
