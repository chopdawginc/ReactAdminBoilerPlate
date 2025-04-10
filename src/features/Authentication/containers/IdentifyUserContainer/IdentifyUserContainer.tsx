import {
  IdentifyUserForm,
  AuthLayout,
} from 'features/Authentication/components'

type Props = {}

const IdentifyUserContainer = (props: Props) => {
  return (
    <AuthLayout>
      <IdentifyUserForm />
    </AuthLayout>
  )
}

export default IdentifyUserContainer
