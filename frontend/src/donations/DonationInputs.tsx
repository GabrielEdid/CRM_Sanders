import { Stack } from "@mui/material";
import {
  ReferenceInput,
  SelectInput,
  TextInput,
  NumberInput,
  required,
} from "react-admin";

export const DonationInputs = () => {
  return (
    <Stack>
      <Stack>
        <Stack>
          <NumberInput
            source="amount"
            validate={required()}
            helperText={false}
            label="Monto"
          />
          <SelectInput
            source="paymentMethod"
            label="Método de pago"
            validate={required()}
            choices={[
              { id: "stripe", name: "Credit/Debit Card" },
              { id: "cash", name: "Cash" },
              { id: "transfer", name: "Transfer" },
            ]}
          />
          <TextInput source="message" multiline fullWidth label="Mensaje" />
          <ReferenceInput
            source="donator"
            reference="donators"
            label="Donador"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
