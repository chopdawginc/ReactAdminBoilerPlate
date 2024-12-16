import { CBox } from 'components';
import { AppLayout } from 'layout';
import { ManageUserData } from 'modules/ManageUser/components';

type Props = {};

const ManageUserContainer = (props: Props) => {
   return (
      <AppLayout title='User Accounts'>
         <CBox col height={'100%'} gap={5}>
            <ManageUserData />
         </CBox>
      </AppLayout>
   );
};

export default ManageUserContainer;
