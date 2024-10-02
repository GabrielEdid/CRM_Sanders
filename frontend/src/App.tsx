import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  defaultLightTheme,
  defaultDarkTheme,
} from "react-admin";
import { deepmerge } from "@mui/utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Landing from "./Landing";
import donators from "./donators";
import jsonServerProvider from "ra-data-json-server";
import authProvider from "./authProvider";
import CustomLogin from "./CustomLogin"; // Import the custom login page

import { i18nProvider } from "./i18nprovider";

const lightTheme = defaultLightTheme;
const darkTheme = deepmerge(defaultDarkTheme, { palette: { mode: "dark" } });

const dataProvider = jsonServerProvider(`http://localhost:5001/api/v1`);

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Landing />} />
      <Route path="/" element={<div>Hacer todo lo de usuarios</div>} />
      <Route path="/register" element={<div>Hola</div>} />
      <Route path="/donate" element={<div>Haz tu donativo!!</div>} />

      {/* Protected React Admin Routes */}
      <Route
        path="/*"
        element={
          <Admin
            authProvider={authProvider}
            dataProvider={dataProvider}
            layout={Layout}
            theme={lightTheme}
            i18nProvider={i18nProvider}
            darkTheme={darkTheme}
            defaultTheme="light"
            loginPage={CustomLogin} // Use the custom login page here
          >
            <Resource
              name="users"
              list={ListGuesser}
              edit={EditGuesser}
              options={{ label: "Usuarios" }}
            />
            <Resource
              name="donators"
              {...donators}
              options={{ label: "Donadores" }}
            />
          </Admin>
        }
      />
    </Routes>
  </Router>
);

export default App;
