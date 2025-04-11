import { Redirect } from 'expo-router'
import { useUserStore } from 'store/useUserStore'

export default function PrivateScreen() {
  const { role } = useUserStore((state) => state)

  if (role === 'client') {
    return <Redirect href="/(private)/(cliente)/inicio" />
  } else if (role === 'business') {
    return <Redirect href="/(private)/(empresa)/inicio" />
  }

  return <Redirect href="/(public)" />
}
