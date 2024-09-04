//Este código debe de ir en src/App.js dentro de la carpeta de frontend

// Bibliotecas necesarias de React y React-Admin

import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin"; // Componentes principales de React-Admin
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import donations from "./donations";

import jsonServerProvider from "ra-data-json-server"; // Proveedor de datos para conectarse a una API RESTful
import authProvider from "./authProvider";

// Configura el proveedor de datos para conectarse a la API del backend
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
  <Router>
    <Routes>
      <Route path="/" element={<div>Hacer todo lo de usuarios</div>} />
      <Route path="/register" element={<div>Hola</div>} />
      <Route path="/donate" element={<div>Haz tu donativo!!</div>} />

      {/* Rutas protegidas por React Admin */}
      <Route
        path="/*"
        element={
          <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            layout={Layout}
          >
            <Resource name="users" list={ListGuesser} edit={EditGuesser} />
            <Resource name="donations" {...donations} list={ListGuesser} />
          </Admin>
        }
      />
    </Routes>
  </Router>
);

export default App;
