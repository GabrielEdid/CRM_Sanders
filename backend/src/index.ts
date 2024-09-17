//Este código debe de ir en el archiovo index.js dentro de la carpeta de backend

// Bibliotecas necesarias para iniciar
require("dotenv").config(); // Carga variables de entorno desde un archivo .env
const cors = require("cors"); // Importar el paquete 'cors'
import express from "express"; // Framework web para Node.js
import mongoose from "mongoose"; // opción de biblioteca para manejar MongoDB en Node.js
import fs from "fs"; // Biblioteca para interactuar con el sistema de archivos
import https from "https"; // Biblioteca para crear servidores HTTPS

import { Request, Response } from "express";

import { donationsRouter } from "./routes/donations";
import { usersRouter } from "./routes/users";
import { donatorsRouter } from "./routes/donators";
import { MailService } from "./services/nodeMailer";

// Crea la aplicación de Express
const app = express();
// Define el puerto en el que correrá el servidor (toma de la variable de entorno: 5001, o por defecto el puerto: 5000)
const PORT = process.env.PORT || 5001;

// Habilitar CORS para todas las solicitudes
app.use(
  cors({
    // Permite que cualquier origen pueda acceder a la API
    exposedHeaders: ["X-Total-Count"], // Expone el encabezado X-Total-Count
  })
);

// Conexión a mongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected")) // Mensaje si la conexión es exitosa
  .catch((err) => console.log(err)); // Mensaje si ocurre un error en la conexión

// Middleware para parsear las solicitudes JSON
app.use(express.json());

app.use("/api/v1/donations", donationsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/donators", donatorsRouter);

// Ruta para probar el backend en el navegador
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World - TC2007B!"); // Mensaje que se verá en la ventana del navegador
});

// Configuración de HTTPS

// Cargar los certificados SSL
const privateKey = fs.readFileSync("../certs/server.key", "utf8"); // Lee la llave privada del servidor desde el sistema de archivos
const certificate = fs.readFileSync("../certs/server.crt", "utf8"); // Lee el certificado público del servidor desde el sistema de archivos
const ca = fs.readFileSync("../certs/ca.crt", "utf8"); // Lee el certificado raíz de la CA desde el sistema de archivos

// Configuración de las credenciales SSL para el servidor HTTPS
const credentials = { key: privateKey, cert: certificate, ca: ca };

// Inicia el servidor HTTPS
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`); // Mensaje de confirmación con el protocolo HTTPS
});

// Inicia el servidor en HTTP escuchando en el puerto especificado
// app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
