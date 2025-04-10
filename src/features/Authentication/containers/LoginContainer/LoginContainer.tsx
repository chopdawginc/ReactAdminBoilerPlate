import { LoginForm, AuthLayout } from 'features/Authentication/components'

type Props = {}

const LoginContainer = (props: Props) => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginContainer
