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
import jsonServerProvider from "ra-data-json-server";
import authProvider from "./authProvider";
import CustomLogin from "./CustomLogin"; // Import the custom login page

const lightTheme = defaultLightTheme;
const darkTheme = deepmerge(defaultDarkTheme, { palette: { mode: "dark" } });

const dataProvider = jsonServerProvider(`https://localhost:5001/api/v1`);

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
            darkTheme={darkTheme}
            defaultTheme="light"
            loginPage={CustomLogin} // Use the custom login page here
          >
            <Resource name="users" list={ListGuesser} edit={EditGuesser} />
            <Resource name="donators" {...donators} />
          </Admin>
        }
      />
    </Routes>
  </Router>
);

export default App;
