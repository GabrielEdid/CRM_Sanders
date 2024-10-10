import { Create, SimpleForm, TextInput, email } from "react-admin";

const validateEmail = email();

export const DonatorCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" label="Nombre" />
      <TextInput source="email" validate={validateEmail} label="Correo" />
      <TextInput source="phone" label="Teléfono" />
    </SimpleForm>
  </Create>
);
