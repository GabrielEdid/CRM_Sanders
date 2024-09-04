import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ShowBase, TabbedShowLayout, useShowContext } from "react-admin";
import { Donator } from "../types";

export const DonatorShow = () => (
  <ShowBase>
    <DonatorShowContent />
  </ShowBase>
);

const DonatorShowContent = () => {
  const { record, isLoading } = useShowContext<Donator>();

  if (isLoading || !record) return null;

  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <Card>
          <CardContent>
            <Box display="flex" mb={1} alignItems="center">
              <Typography variant="h5" ml={2} flex="1">
                {record.name}
              </Typography>
            </Box>

            <TabbedShowLayout>
              <TabbedShowLayout.Tab label="Details">
                <Stack spacing={2} p={2}>
                  <Typography variant="body1">
                    <strong>Nombre:</strong> {record.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Correo:</strong> {record.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Número de Teléfono:</strong> {record.phone}
                  </Typography>
                </Stack>
              </TabbedShowLayout.Tab>

              <TabbedShowLayout.Tab label="Donations">
                Hello
              </TabbedShowLayout.Tab>
            </TabbedShowLayout>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
