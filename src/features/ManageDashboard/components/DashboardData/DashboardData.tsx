import { DateRange, UsersData } from "types";
import { COLORS } from "constant";
import React, { useState, useEffect } from "react";
import { DateRangePicker } from "components";
import GoalSurveyResults from "../GoalSurveyResults";
import { Box, Grid, Typography, Paper } from "@mui/material";
import CommitmentSurveyResults from "../CommitmentSurveyResults";
import { useService } from "hooks";
import { QueryType } from "hooks/useService/types";
import { ClientService } from "services/Client.Services";
import { useDataContext } from "context/DataContext";

const DashboardData = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });

  const { getUsersData, getUsersDataByDateRange } = useDataContext();

  useEffect(() => {
    getUsersData.onRequest();
  }, []);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      getUsersDataByDateRange.onRequest({ dateRange });
    }
  }, [dateRange]);

  console.log("===> All", getUsersData.data);
  console.log("=======> RANGE", getUsersDataByDateRange.data);

  const userStatistics: UsersData | null = getUsersDataByDateRange.data ?? getUsersData.data;

  return (
    <React.Fragment>
      <DateRangePicker
        onFromDateChange={(val) => setDateRange((prevState) => ({ ...prevState, from: val }))}
        onToDateChange={(val) => setDateRange((prevState) => ({ ...prevState, to: val }))}
      />

      <Box sx={{ flex: 1, overflow: "auto", padding: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                height: "100%",
                boxSizing: "border-box",
                background: COLORS.gray.thinner,
              }}
            >
              <Typography className="content__title">Total App Users</Typography>
              <Typography color={"primary"} align="center" fontSize={40} fontWeight={800}>
                {userStatistics?.totalUsers}
              </Typography>

              <Grid container gap={2} mt={2}>
                {userStatistics?.usersBySubscriptionType?.map((item, i) => {
                  return (
                    <Grid item key={i} xs={12} sm={5} md={5} lg={3.5} className="content__card">
                      <Typography variant="h5_bold" color="primary">
                        {item.label}
                      </Typography>
                      <Typography variant="h6_medium">{item.value}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                height: "100%",
                boxSizing: "border-box",
                background: COLORS.gray.thinner,
              }}
            >
              <Typography className="content__title">Goal Survey Results</Typography>
              <GoalSurveyResults />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Paper elevation={3} sx={{ padding: 2, background: COLORS.gray.thinner }}>
              <Typography className="content__title">Commitment Survey Results</Typography>
              <CommitmentSurveyResults data={userStatistics?.commitmentSurveyResults} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Paper elevation={3} sx={{ padding: 2, background: COLORS.gray.thinner }}>
              <Typography className="content__title">Content Popularity</Typography>
              <Grid container mt={2} gap={2}>
                {userStatistics?.contentPopularity.map((item, i) => (
                  <Grid item xs={12} sm={3} key={i} className="content__card">
                    <Typography variant="h5_bold" color="primary">
                      {item.label}
                    </Typography>
                    <Typography variant="h6_medium">{item.value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default DashboardData;
