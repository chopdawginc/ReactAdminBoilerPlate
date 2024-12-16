import { CBox } from 'components';
import { AppLayout } from 'layout';
import { AdminAccountData } from 'modules/AdminAccounts/components';

type Props = {};

const AdminAccountContainer = (props: Props) => {
   return (
      <AppLayout title='Admin Accounts'>
         <CBox col height={'100%'} gap={5}>
            <AdminAccountData />
         </CBox>
      </AppLayout>
   );
};

export default AdminAccountContainer;
