import {
  AuthLayout,
  ForgetPasswordsForm,
} from 'features/Authentication/components'

type Props = {}

const ForgetPasswordsContainer = (props: Props) => {
  return (
    <AuthLayout>
      <ForgetPasswordsForm />
    </AuthLayout>
  )
}

export default ForgetPasswordsContainer
