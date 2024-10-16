import { AuthProvider } from "react-admin";

const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const apiUrl = import.meta.env.VITE_API_URL; //
    const request = new Request(apiUrl + "/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
        window.location.href = "/users";
      })
      .catch(() => {
        throw new Error("Network error");
      });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth")
      ? Promise.resolve()
      : Promise.reject({ message: "login.required" }),
  logout: (params?: any) => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { id, fullName, avatar } = JSON.parse(
        localStorage.getItem("auth") || "{}"
      );
      return Promise.resolve({ id, fullName, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => {
    // Required for the authentication to work
    return Promise.resolve("guest");
  },
};

export default authProvider;
