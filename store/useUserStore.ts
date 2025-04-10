import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserType = 'client' | 'business' | null

interface UserState {
  token: string | null
  role: UserType
  userId: string | null
  isRegistrationComplete: boolean
  lastCompletedStep: number
  onboarding: boolean

  setUser: (userData: Partial<UserState>) => void
  clearUser: () => void
  updateRegistrationStep: (step: number) => void
  completeRegistration: () => void
  onboardingSeen: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      isRegistrationComplete: false,
      lastCompletedStep: 0,
      onboarding: true,
      role: null,

      setUser: (userData) =>
        set((state) => ({
          ...state,
          ...userData,
        })),

      clearUser: () =>
        set({
          token: null,
          role: null,
          userId: null,
          isRegistrationComplete: false,
          lastCompletedStep: 0,
          onboarding: false,
        }),

      updateRegistrationStep: (step) =>
        set((state) => ({
          ...state,
          lastCompletedStep: step,
        })),

      completeRegistration: () =>
        set((state) => ({
          ...state,
          isRegistrationComplete: true,
        })),

      onboardingSeen: () =>
        set((state) => ({
          ...state,
          onboarding: false,
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
