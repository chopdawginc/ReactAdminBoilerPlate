import React, { useEffect } from "react";
import AdminCard from "../AdminCard";
import { Box, Button, Grid, LinearProgress } from "@mui/material";
import { CBox } from "components";
import AddAccountDialog from "../AddAccountDialog";
import { useDataContext } from "context/DataContext";

const AdminAccountData = () => {
  const [open, setOpen] = React.useState(false);

  const { getAdmins } = useDataContext();

  useEffect(() => {
    getAdmins.onRequest();
  }, []);

  const handleAddAdmin = () => {
    setOpen(true);
  };

  if (getAdmins.isLoading) {
    return <LinearProgress />;
  }
  return (
    <React.Fragment>
      <CBox je>
        <Button variant="rounded" onClick={handleAddAdmin}>
          Add New User
        </Button>
      </CBox>
      <Box overflow={"auto"} flex={1} mb={2} pb={2} pr={2}>
        <Grid item container xs={12} spacing={4}>
          {Array.isArray(getAdmins.data) &&
            getAdmins.data.map((data, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
                <AdminCard data={data} />
              </Grid>
            ))}
        </Grid>
      </Box>
      <AddAccountDialog open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
  );
};

export default AdminAccountData;
