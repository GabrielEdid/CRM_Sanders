import React from "react";
import { Box, Grid } from "@mui/material";
import TopDonatorsChart from "./TopDonatorsChart";
import DonationsLineChart from "./DonationsLineChart";
import DonationsPieChart from "./DonationsPieChart";
const Dashboard: React.FC = () => (
  <Box sx={{ p: 4 }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DonationsLineChart />
      </Grid>
      <Grid item xs={12}>
        <TopDonatorsChart />
      </Grid>
      <Grid item xs={12}>
        <DonationsPieChart />
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
