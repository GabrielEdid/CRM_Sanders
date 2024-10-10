import React from "react";
import { Box, Grid } from "@mui/material";
import TopDonatorsChart from "./TopDonatorsChart";
import DonationsLineChart from "./DonationsLineChart";
import DonationsPieChart from "./DonationsPieChart";
import PaymentMethodPieChart from "./PaymentMethodPieChart";

const Dashboard: React.FC = () => (
  <Box sx={{ p: 4 }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DonationsLineChart />
      </Grid>
      <Grid item xs={12}>
        <TopDonatorsChart />
      </Grid>
      {/* Aquí dividimos los PieCharts en dos columnas de tamaño 6 */}
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={6}>
          <DonationsPieChart />
        </Grid>
        <Grid item xs={6}>
          <PaymentMethodPieChart />
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
