import { Create, SimpleForm, TextInput, email, required } from "react-admin";
import { Box, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIcon from "@mui/icons-material/Phone";

const validateEmail = email();
const validateRequired = required("Este campo es obligatorio");

export const DonatorCreate = () => (
  <Create
    redirect="list"
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
        Registro de Donador
      </Typography>

      <SimpleForm>
        {/* Grouping Name and Email Fields */}
        <Box
          display={{ xs: "block", sm: "flex" }} // Change display property for responsiveness
          justifyContent="space-between"
          width="100%" // Ensure full width for the container
        >
          <Box flex={1} mr={{ xs: 0, sm: 1 }}>
            <TextInput
              source="name"
              label="Nombre"
              validate={validateRequired}
              fullWidth
            />
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: 1 }}>
            <TextInput
              source="email"
              validate={[validateEmail, validateRequired]}
              label="Correo"
              fullWidth
            />
          </Box>
        </Box>

        {/* Phone Input with Icon and Placeholder */}
        <TextInput
          source="phone"
          label="Teléfono"
          placeholder="e.g. (123) 456-7890"
          validate={validateRequired}
          fullWidth
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
  </Create>
);
