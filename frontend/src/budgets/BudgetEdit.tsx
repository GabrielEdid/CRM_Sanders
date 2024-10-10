import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from "react-admin";

export const BudgetEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Nombre" />
      <NumberInput source="totalAmountInCentsMXN" label="Monto Total" />
      <NumberInput source="collectedAmountInCentsMXN" label="Recolectado" />
      <TextInput source="description" label="Descripción" multiline />
      <DateInput source="startDate" label="Fecha de Inicio" />
      <DateInput source="endDate" label="Fecha de Término" />
    </SimpleForm>
  </Edit>
);
