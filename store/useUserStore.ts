import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserType = 'client' | 'business' | null

interface UserState {
  token: string | null
  type: UserType
  userId: string | null
  isRegistrationComplete: boolean
  lastCompletedStep: number
  hasSeenOnboarding: boolean

  setUser: (userData: Partial<UserState>) => void
  clearUser: () => void
  updateRegistrationStep: (step: number) => void
  completeRegistration: () => void
  markOnboardingAsSeen: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      type: null,
      userId: null,
      isRegistrationComplete: false,
      lastCompletedStep: 0,
      hasSeenOnboarding: false,

      setUser: (userData) =>
        set((state) => ({
          ...state,
          ...userData,
        })),

      clearUser: () =>
        set({
          token: null,
          type: null,
          userId: null,
          isRegistrationComplete: false,
          lastCompletedStep: 0,
          hasSeenOnboarding: false,
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

      markOnboardingAsSeen: () =>
        set((state) => ({
          ...state,
          hasSeenOnboarding: true,
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
