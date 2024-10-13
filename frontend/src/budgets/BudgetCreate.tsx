import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  required,
} from "react-admin";
import { Box, Typography } from "@mui/material";

const validateRequired = required("Este campo es obligatorio");

export const BudgetCreate = () => (
  <Create
    redirect="list"
    sx={{
      width: { xs: "100%", sm: "90%" }, // Responsive width
      mx: "auto",
      paddingTop: "30px",
      maxWidth: 600, // Optional: limit maximum width
      mb: 5,
    }}
  >
    <Box
      sx={{
        bgcolor: "background.paper",
        mx: "auto",
        mt: 5,
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "primary.main" }}
      >
        Crear Presupuesto
      </Typography>

      <SimpleForm>
        {/* Grouping Title and Total Amount Fields */}
        <TextInput
          source="title"
          label="Nombre"
          fullWidth
          validate={validateRequired}
        />

        <Box
          display={{ xs: "block", sm: "flex" }} // Responsive layout
          justifyContent="space-between"
          width="100%"
        >
          <Box flex={1}>
            <NumberInput
              source="totalAmount"
              validate={validateRequired}
              label="Monto Total (MXN)"
              fullWidth
            />
          </Box>
        </Box>

        <TextInput
          source="description"
          label="Descripción"
          validate={validateRequired}
          multiline
          fullWidth
        />

        {/* Grouping Start and End Date Fields */}
        <Box
          display={{ xs: "block", sm: "flex" }} // Responsive layout
          justifyContent="space-between"
          width="100%"
          mt={2}
        >
          <Box flex={1} mr={{ xs: 0, sm: 1 }}>
            <DateInput
              source="startDate"
              label="Fecha de Inicio"
              fullWidth
              validate={validateRequired}
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: 1 }}>
            <DateInput
              source="endDate"
              label="Fecha de Término"
              fullWidth
              validate={validateRequired}
            />
          </Box>
        </Box>
      </SimpleForm>
    </Box>
  </Create>
);
