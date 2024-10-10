import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { ShowBase, useShowContext, EditButton } from "react-admin";
import { Budget } from "../types";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Spanish locale for date formatting
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Icon for time
import EventIcon from "@mui/icons-material/Event"; // Icon for event/dates

export const BudgetShow = () => (
  <ShowBase>
    <BudgetShowContent />
  </ShowBase>
);

const BudgetShowContent = () => {
  const { record, isLoading } = useShowContext<Budget>();

  if (isLoading || !record) return null;

  // Calculate the progress percentage
  const progressPercentage =
    (record.collectedAmountInCentsMXN / record.totalAmountInCentsMXN) * 100;

  // Format currency amounts
  const formatCurrency = (amountInCents: number) => {
    return (amountInCents / 100).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  // Format dates with date-fns
  const formatDate = (date: Date) =>
    format(new Date(date), "PPP", { locale: es });

  return (
    <Box mt={2} display="flex" justifyContent="center">
      <Box flex="1" maxWidth={800}>
        <Card>
          <CardContent>
            {/* Header with title and edit button */}
            <Box display="flex" mb={1} alignItems="center">
              <Typography variant="h5" ml={2} flex="1">
                {record.title}
              </Typography>
              <EditButton label="Editar" sx={{ marginLeft: "auto" }} />
            </Box>

            {/* Main details */}
            <Stack spacing={3} p={2}>
              {/* Progress Bar */}
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  Progreso de Recolección
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progressPercentage}
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
                <Typography variant="caption" color="textSecondary" mt={1}>
                  {formatCurrency(record.collectedAmountInCentsMXN)} /{" "}
                  {formatCurrency(record.totalAmountInCentsMXN)}
                </Typography>
              </Box>

              {/* Budget description */}
              {record.description && (
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Descripción
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {record.description}
                  </Typography>
                </Box>
              )}

              {/* Date range with icons */}
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  Fechas del Presupuesto
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                  {/* Start Date */}
                  <Chip
                    icon={<EventIcon />}
                    label={
                      <Typography variant="body2">
                        <strong>Inicio:</strong> {formatDate(record.startDate)}
                      </Typography>
                    }
                    sx={{
                      backgroundColor: "#e0f7fa",
                      color: "#006064",
                      fontWeight: "bold",
                    }}
                  />

                  {/* End Date */}
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={
                      <Typography variant="body2">
                        <strong>Fin:</strong> {formatDate(record.endDate)}
                      </Typography>
                    }
                    sx={{
                      backgroundColor: "#fce4ec",
                      color: "#880e4f",
                      fontWeight: "bold",
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
