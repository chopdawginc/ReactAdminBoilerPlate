import {
  AuthLayout,
  SetPasswordsForm,
} from 'features/Authentication/components'

type Props = {}

const SetPasswordsContainer = (props: Props) => {
  return (
    <AuthLayout>
      <SetPasswordsForm />
    </AuthLayout>
  )
}

export default SetPasswordsContainer
