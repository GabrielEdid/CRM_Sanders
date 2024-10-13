import { Edit, SimpleForm, TextInput, required } from "react-admin";
import { Box, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIcon from "@mui/icons-material/Phone";

const validateRequired = required("Este campo es obligatorio");

export const DonatorEdit = () => (
  <Edit
    sx={{
      width: { xs: "100%", sm: "90%" }, // Responsive width
      mx: "auto",
      paddingTop: "30px",
      maxWidth: 600, // Optional: limit maximum width
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
        Editar Donador
      </Typography>

      <SimpleForm>
        {/* Grouping Name and Email Fields in a Row */}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Box flex={1} mr={1}>
            <TextInput
              source="name"
              label="Nombre"
              fullWidth
              validate={validateRequired}
            />
          </Box>
          <Box flex={1} ml={1}>
            <TextInput
              source="email"
              label="Correo"
              fullWidth
              validate={validateRequired}
            />
          </Box>
        </Box>

        {/* Phone Field with Icon */}
        <TextInput
          source="phone"
          label="Número de Teléfono"
          fullWidth
          validate={validateRequired}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
      </SimpleForm>
    </Box>
  </Edit>
);
