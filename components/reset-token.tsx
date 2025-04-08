import { Button } from 'components/global/button'
import { useStepStore } from 'store/useStepStore'
import { useUserStore } from 'store/useUserStore'

export default function ResetToken() {
  const { clearUser } = useUserStore()
  const { resetStep } = useStepStore()

  const handleResetAuth = () => {
    clearUser()
    resetStep()
    console.log('Token e Step resetados!')
  }

  return (
    <Button variant="ghost" onPress={handleResetAuth} className="mb-4">
      <Button.Text>Reset Auth</Button.Text>
    </Button>
  )
}
