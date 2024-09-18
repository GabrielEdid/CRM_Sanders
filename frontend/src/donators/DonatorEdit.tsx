import { Edit, SimpleForm, TextInput } from "react-admin";

export const DonatorEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nombre" fullWidth />
      <TextInput source="email" label="Correo" fullWidth />
      <TextInput source="phone" label="Número de Teléfono" fullWidth />
    </SimpleForm>
  </Edit>
);
