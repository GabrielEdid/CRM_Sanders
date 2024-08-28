import { useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

import { useCreatePath, useRecordContext, Link } from "react-admin";

import { Donation } from "../types";

export const DonationCard = (props: { record?: Donation }) => {
  const [elevation, setElevation] = useState(1);
  const createPath = useCreatePath();
  const record = useRecordContext<Donation>(props);
  if (!record) return null;

  return (
    <Link
      to={createPath({
        resource: "companies",
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
            <Typography variant="subtitle2">
              ${record.amount.toString()}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Link>
  );
};
