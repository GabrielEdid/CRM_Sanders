// import jsonServerProvider from "ra-data-json-server";

// export const dataProvider = jsonServerProvider(
//   import.meta.env.VITE_JSON_SERVER_URL
// );

import { fetchUtils, DataProvider } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

// Definimos un tipo para el objeto de autenticación
interface Auth {
  token: string;
}

// Función para obtener el token desde localStorage
const getAuthToken = (): string | null => {
  const auth: Auth | null = JSON.parse(localStorage.getItem("auth") || "null");
  console.log("auth:", auth);
  return auth ? auth.token : null;
};

// Creamos un cliente HTTP personalizado que agrega el token en el header Authorization
const httpClient = (
  url: string,
  options: fetchUtils.Options = {}
): Promise<any> => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = getAuthToken();
  if (token) {
    (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, options);
};

// Creamos el dataProvider utilizando jsonServerProvider
const dataProvider: DataProvider = jsonServerProvider(
  // `${import.meta.env.VITE_JSON_SERVER_URL}/api/v1` as string,
  "https://localhost:5001/api/v1" as string,
  httpClient
);

export default dataProvider;
