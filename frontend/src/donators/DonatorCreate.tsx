import { Create, SimpleForm, TextInput, email } from "react-admin";

const validateEmail = email();

export const DonatorCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" validate={validateEmail} />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);
