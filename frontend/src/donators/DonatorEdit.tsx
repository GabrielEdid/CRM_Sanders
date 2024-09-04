import { Edit, Form, TextInput, email } from "react-admin";

const validateEmail = email();

export const DonatorEdit = () => (
  <Edit redirect="show">
    <Form>
      <TextInput source="name" />
      <TextInput source="email" validate={validateEmail} />
    </Form>
  </Edit>
);
