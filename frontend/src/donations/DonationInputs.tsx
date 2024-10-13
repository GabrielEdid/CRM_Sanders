import { Stack } from "@mui/material";
import {
  ReferenceInput,
  SelectInput,
  TextInput,
  NumberInput,
  required,
} from "react-admin";

const validateRequired = required("Este campo es obligatorio");

export const DonationInputs = () => {
  return (
    <Stack spacing={3}>
      {" "}
      {/* Adjusted spacing for better readability */}
      <NumberInput
        source="amount"
        validate={validateRequired}
        helperText={false}
        label="Monto"
      />
      <SelectInput
        source="paymentMethod"
        label="Método de pago"
        validate={validateRequired}
        choices={[
          { id: "stripe", name: "Tarjeta de Crédito/Débito" },
          { id: "cash", name: "Efectivo" },
          { id: "transfer", name: "Transferencia" },
        ]}
      />
      <TextInput source="message" multiline fullWidth label="Mensaje" />
      <ReferenceInput source="donator" reference="donators" label="Donador" />
      <ReferenceInput
        source="budgetId"
        reference="budgets"
        label="Presupuesto"
      />
    </Stack>
  );
};
