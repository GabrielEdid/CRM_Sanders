import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { ShowBase, useShowContext, EditButton } from "react-admin";
import { Donation } from "../types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import PaymentIcon from "@mui/icons-material/Payment";
import MessageIcon from "@mui/icons-material/Message";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export const DonationShow = () => (
  <ShowBase>
    <DonationShowContent />
  </ShowBase>
);

const DonationShowContent = () => {
  const { record, isLoading } = useShowContext<Donation>();

  if (isLoading || !record) return null;

  // Format currency amounts
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  // Format the created date
  const formatDate = (date: Date) =>
    format(new Date(date), "PPP", { locale: es });

  return (
    <Box mt={2} display="flex" justifyContent="center">
      <Box flex="1" maxWidth={800}>
        <Card>
          <CardContent>
            {/* Header with amount and edit button */}
            <Box display="flex" mb={2} alignItems="center">
              <Typography variant="h4" ml={2} flex="1" color="primary">
                {formatCurrency(record.amount as number)}
              </Typography>
              <EditButton label="Editar" sx={{ marginLeft: "auto" }} />
            </Box>

            {/* Date of donation */}
            <Box display="flex" alignItems="center" ml={2}>
              <CalendarTodayIcon sx={{ color: "#757575", mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                {formatDate(record.createdAt)}
              </Typography>
            </Box>

            {/* Donation Details */}
            <Stack spacing={3} p={2} mt={2}>
              {/* Payment method with icon */}
              <Box display="flex" alignItems="center">
                <PaymentIcon sx={{ color: "#4caf50", mr: 1 }} />
                <Typography variant="body1">
                  <strong>Método de Pago:</strong> {record.paymentMethod}
                </Typography>
              </Box>

              {/* Message with icon */}
              {record.message && (
                <Box display="flex" alignItems="center">
                  <MessageIcon sx={{ color: "#ff9800", mr: 1 }} />
                  <Typography variant="body1">
                    <strong>Mensaje:</strong> {record.message}
                  </Typography>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
