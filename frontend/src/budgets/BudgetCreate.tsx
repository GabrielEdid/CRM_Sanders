import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from "react-admin";

export const BudgetCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Nombre" />
      <NumberInput source="totalAmountInCentsMXN" label="Monto Total" />
      <NumberInput
        source="collectedAmountInCentsMXN"
        helperText="El valor por defecto es 0"
        placeholder="0"
        defaultValue={0}
        label="Recolectado"
      />
      <TextInput source="description" label="Descripción" multiline />
      <DateInput source="startDate" label="Fecha de Inicio" />
      <DateInput source="endDate" label="Fecha de Término" />
    </SimpleForm>
  </Create>
);
