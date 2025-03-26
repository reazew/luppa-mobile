import { useContext } from 'react'

import { RegisterClientFormContext } from '../context/register-client-context'

export function useRegisterClientForm() {
  const context = useContext(RegisterClientFormContext).clientForm

  return context
}
