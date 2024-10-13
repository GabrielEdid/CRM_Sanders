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
  Avatar,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import {
  ShowBase,
  TabbedShowLayout,
  useShowContext,
  EditButton,
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
    <Box mt={2} display="flex" justifyContent="center">
      <Box width="90%" maxWidth="900px">
        <Card elevation={3} sx={{ borderRadius: "12px" }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h4" fontWeight="bold">
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
                  <Typography
                    variant="body1"
                    display="flex"
                    alignItems="center"
                  >
                    <EmailIcon sx={{ mr: 1 }} /> <strong>Correo:</strong>{" "}
                    {record.email}
                  </Typography>
                  <Typography
                    variant="body1"
                    display="flex"
                    alignItems="center"
                  >
                    <PhoneIcon sx={{ mr: 1 }} />{" "}
                    <strong>Número de Teléfono: </strong> {record.phone}
                  </Typography>
                  <Typography
                    variant="body1"
                    display="flex"
                    alignItems="center"
                  >
                    {record.isSendEmails ? (
                      <CheckCircleIcon sx={{ mr: 1, color: "green" }} />
                    ) : (
                      <CancelIcon sx={{ mr: 1, color: "red" }} />
                    )}
                    <strong>Recibe emails de Marketing:</strong>{" "}
                    {record.isSendEmails ? "Sí" : "No"}
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
                    mb={2}
                  >
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
            sx={{
              borderBottom: "1px solid #E0E0E0",
              "&:hover": { backgroundColor: "#f5f5f5" },
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "8px",
            }}
          >
            <Avatar sx={{ bgcolor: "#4caf50", mr: 2 }}>
              <MonetizationOnIcon />
            </Avatar>
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
            <ListItemSecondaryAction>
              <Typography variant="body2" color="textSecondary">
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
      size="medium"
      startIcon={<PersonAddIcon />}
      variant="contained"
      sx={{
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "8px",
        padding: "8px 16px",
        bgcolor: "#1976d2", // vibrant color for emphasis
        "&:hover": {
          backgroundColor: "#115293",
        },
      }}
    >
      Agregar Donación
    </Button>
  );
};
