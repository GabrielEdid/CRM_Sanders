import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import {
  ShowBase,
  TabbedShowLayout,
  useShowContext,
  EditButton,
  SortButton,
  useListContext,
  RecordContextProvider,
  ReferenceManyField,
  useRecordContext,
} from "react-admin";
import { Donator, Donation } from "../types";

import { Link as RouterLink, useLocation } from "react-router-dom";

const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" mb={2} alignItems="center">
              <Typography variant="h5" ml={2} flex="1" fontWeight="bold">
                {record.name}
              </Typography>
              <EditButton label="Editar" sx={{ marginLeft: "auto" }} />
            </Box>

            <TabbedShowLayout>
              <TabbedShowLayout.Tab label="Detalles">
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

              <TabbedShowLayout.Tab label="Donaciones" path="donations">
                <ReferenceManyField
                  reference="donations"
                  target="donator"
                  sort={{ field: "createdAt", order: "ASC" }}
                >
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    mt={1}
                  >
                    <SortButton
                      label="Ordenar"
                      fields={["createdAt", "amount"]}
                    />
                    <CreateRelatedDonationButton />
                  </Stack>
                  <DonationsIterator />
                </ReferenceManyField>
              </TabbedShowLayout.Tab>
            </TabbedShowLayout>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

const DonationsIterator = () => {
  const location = useLocation();
  const { data: donations, error, isPending } = useListContext<Donation>();

  if (isPending || error) return null;

  return (
    <List dense sx={{ pt: 0 }}>
      {donations.map((donation) => (
        <RecordContextProvider key={donation.id} value={donation}>
          <ListItem
            button
            component={RouterLink}
            to={`/donations/${donation.id}/show`}
            state={{ from: location.pathname }}
            sx={{ borderBottom: "1px solid #E0E0E0" }} // Add a subtle border between items
          >
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Monto: ${donation.amount.toFixed(2)}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {donation.message}
                </Typography>
              }
            />
            <ListItemSecondaryAction
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {formatDate(donation.createdAt)}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </RecordContextProvider>
      ))}
    </List>
  );
};

const CreateRelatedDonationButton = () => {
  const donator = useRecordContext<Donator>();
  return (
    <Button
      component={RouterLink}
      to="/donations/create"
      state={donator ? { record: { donator: donator.id } } : undefined}
      color="primary"
      size="small"
      startIcon={<PersonAddIcon />}
      variant="contained" // Use contained button for better emphasis
    >
      Agregar Donación
    </Button>
  );
};
