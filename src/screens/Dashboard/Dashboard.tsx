import AppLayout from "@layouts/AppLayout";
import { DashboardContainer } from "@modules/ManageDashboard";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <AppLayout title="Dashboard">
      <DashboardContainer />
    </AppLayout>
  );
};

export default Dashboard;
