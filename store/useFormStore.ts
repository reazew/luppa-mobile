import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FormState {
  forms: Record<string, Record<string, any>>
  updateForm: (formId: string, data: Record<string, any>) => void
  clearForm: (formId: string) => void
  getForm: (formId: string) => Record<string, any> | undefined
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      forms: {},

      updateForm: (formId, data) =>
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: {
              ...state.forms[formId],
              ...data,
            },
          },
        })),

      clearForm: (formId) =>
        set((state) => {
          const { [formId]: _, ...rest } = state.forms
          return { forms: rest }
        }),

      getForm: (formId) => get().forms[formId],
    }),
    {
      name: 'forms-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
