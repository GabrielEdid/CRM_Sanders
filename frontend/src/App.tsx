//Este código debe de ir en src/App.js dentro de la carpeta de frontend

// Bibliotecas necesarias de React y React-Admin

import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin"; // Componentes principales de React-Admin

import Layout from "./layout/Layout";

import donations from "./donations";

import jsonServerProvider from "ra-data-json-server"; // Proveedor de datos para conectarse a una API RESTful

// Configura el proveedor de datos para conectarse a la API del backend
//const dataProvider = jsonServerProvider('http://localhost:5001/api');
const dataProvider = jsonServerProvider("http://localhost:5001/api/v1"); // Usa HTTPS en lugar de HTTP

// // Componente para crear un nuevo post
// const PostCreate: React.FC<CreateProps> = (props) => (
//   <Create {...props}>
//     <SimpleForm>
//       <TextInput source="title" /> {/* Campo para el título del post */}
//       <TextInput source="content" /> {/* Campo para el contenido del post */}
//     </SimpleForm>
//   </Create>
// );

// Componente principal de la aplicación
const App = () => (
  <Admin dataProvider={dataProvider} layout={Layout}>
    {/* <Resource
      name="posts" // Nombre del recurso que coincide con la colección en MongoDB
      list={ListGuesser} // Componente para listar los posts
      edit={EditGuesser} // Componente para editar un post
      create={PostCreate} // Componente para crear un nuevo post
    /> */}
    <Resource
      name="users" // Nombre del recurso que coincide con la colección en MongoDB
      list={ListGuesser} // Componente para listar los posts
      edit={EditGuesser} // Componente para editar un post
    />
    <Resource name="donations" {...donations} />
  </Admin>
);

export default App;
