import { useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

import { useCreatePath, useRecordContext, Link } from "react-admin";

import { Donator } from "../types";

import DealIcon from "@mui/icons-material/MonetizationOn";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

export const DonatorCard = (props: { record?: Donator }) => {
  const [elevation, setElevation] = useState(1);
  const createPath = useCreatePath();
  const record = useRecordContext<Donator>(props);
  if (!record) return null;

  return (
    <Link
      to={createPath({
        resource: "donators",
        id: record.id,
        type: "show",
      })}
      underline="none"
      onMouseEnter={() => setElevation(3)}
      onMouseLeave={() => setElevation(1)}
    >
      <Paper
        sx={{
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1em",
        }}
        elevation={elevation}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* <CompanyAvatar /> */}
          <Box textAlign="center" marginTop={1}>
            <Typography variant="subtitle2">{record.name}</Typography>
            <Typography marginTop={1} variant="body2">
              {record.email}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" width="100%">
          <Box display="flex" alignItems="center">
            <DealIcon color="disabled" sx={{ mr: 1 }} />
            <div>
              <Typography variant="subtitle2" sx={{ mb: -1 }}>
                ${record.totalAmountDonated ? record.totalAmountDonated : 0}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                total
              </Typography>
            </div>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CurrencyExchangeIcon color="disabled" sx={{ mr: 1 }} />
            <div>
              <Typography variant="subtitle2" sx={{ mb: -1 }}>
                {record.totalDonations ? record.totalDonations : 0}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                donaciones
              </Typography>
            </div>
          </Box>
        </Box>
      </Paper>
    </Link>
  );
};
