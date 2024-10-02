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
import donators from "./donators";
import donations from "./donations";
import budgets from "./budgets";
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
            <Resource
              name="donations"
              {...donations}
              options={{ label: "Donaciones" }}
            />
            <Resource
              name="budgets"
              {...budgets}
              options={{ label: "Presupuestos" }}
            />
          </Admin>
        }
      />
    </Routes>
  </Router>
);

export default App;
