// src/App.tsx
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  CustomRoutes,
  defaultLightTheme,
  defaultDarkTheme,
} from "react-admin";
import { deepmerge } from "@mui/utils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Route as ReactRouterRoute } from "react-router-dom";

import Layout from "./layout/Layout";
import Landing from "./Landing";
import donators from "./donators";
import donations from "./donations";
import budgets from "./budgets";
import jsonServerProvider from "ra-data-json-server";
import authProvider from "./authProvider";
import CustomLogin from "./CustomLogin";
import DonationSuccess from "./DonationSuccess";
import DonationCancel from "./DonationCancel";
import { i18nProvider } from "./i18nprovider";
import Dashboard from "./dashboard/Dashboard";

const lightTheme = defaultLightTheme;
const darkTheme = deepmerge(defaultDarkTheme, { palette: { mode: "dark" } });

const dataProvider = jsonServerProvider(
  `${import.meta.env.VITE_API_URL}/api/v1`
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/donation-success" element={<DonationSuccess />} />
      <Route path="/donation-canceled" element={<DonationCancel />} />

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
            loginPage={CustomLogin}
          >
            {/* Agregar rutas personalizadas */}
            <CustomRoutes>
              <ReactRouterRoute path="/dashboard" element={<Dashboard />} />
            </CustomRoutes>

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
