import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type StepStore = {
  currentStep: number
  nextStep: () => void
  previousStep: () => void
  resetStep: () => void
  setStep: (step: number) => void
}

export const useStepStore = create<StepStore>()(
  persist(
    (set) => ({
      currentStep: 0,
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      previousStep: () =>
        set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      resetStep: () => set({ currentStep: 0 }),
      setStep: (step) => set({ currentStep: step }),
    }),
    {
      name: 'step-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
