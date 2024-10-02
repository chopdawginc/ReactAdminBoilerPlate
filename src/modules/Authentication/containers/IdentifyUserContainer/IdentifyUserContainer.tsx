import { IdentifyUserForm, AuthLayout } from 'modules/Authentication/components';

type Props = {};

const IdentifyUserContainer = (props: Props) => {
   return (
      <AuthLayout>
         <IdentifyUserForm />
      </AuthLayout>
   );
};

export default IdentifyUserContainer;
