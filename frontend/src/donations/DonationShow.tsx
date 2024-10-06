import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { ShowBase, useShowContext, EditButton } from "react-admin";
import { Donation } from "../types";

export const DonationShow = () => (
  <ShowBase>
    <DonationShowContent />
  </ShowBase>
);

const DonationShowContent = () => {
  const { record, isLoading } = useShowContext<Donation>();

  if (isLoading || !record) return null;

  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <Card>
          <CardContent>
            <Box display="flex" mb={1} alignItems="center">
              <Typography variant="h5" ml={2} flex="1">
                {record.amount.toString()}
              </Typography>
              <EditButton label="Editar" sx={{ marginLeft: "auto" }} />
            </Box>

            <Stack spacing={2} p={2}>
              <Typography variant="body1">
                <strong>Método de Pago:</strong> {record.paymentMethod}
              </Typography>
              <Typography variant="body1">
                <strong>Mensaje:</strong> {record.message}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
