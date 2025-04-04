import { create } from 'zustand'

type StepStore = {
  currentStep: number
  nextStep: () => void
  previousStep: () => void
  resetStep: () => void
  setCurrentStep: (step: number) => void
}

export const useStepStore = create<StepStore>((set) => ({
  currentStep: 0,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () =>
    set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  resetStep: () => set({ currentStep: 0 }),
  setCurrentStep: (step) => set({ currentStep: step }),
}))
