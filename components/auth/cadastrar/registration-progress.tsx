import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useUserStore } from 'store/useUserStore'

type RegistrationRoutes = {
  client: {
    1: '/form-step-payment-methods'
    2: '/registration-client-completed'
  }
  business: {
    1: '/form-step-about-business'
    2: '/form-step-gallery'
    3: '/form-step-bonus-status'
    4: '/form-step-decrement-status'
    5: '/form-step-receive-methods'
    6: '/registration-business-completed'
  }
}

export const RegistrationProgress = () => {
  const { type, lastCompletedStep } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!type || lastCompletedStep === 0) return

    const routes: RegistrationRoutes = {
      client: {
        1: '/form-step-payment-methods',
        2: '/registration-client-completed',
      },
      business: {
        1: '/form-step-about-business',
        2: '/form-step-gallery',
        3: '/form-step-bonus-status',
        4: '/form-step-decrement-status',
        5: '/form-step-receive-methods',
        6: '/registration-business-completed',
      },
    }

    const nextRoute =
      routes[type]?.[lastCompletedStep as keyof (typeof routes)[typeof type]]
    if (nextRoute) {
      router.replace(nextRoute)
    }
  }, [type, lastCompletedStep])

  return null
}
