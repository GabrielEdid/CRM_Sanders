//Este código debe de ir en el archiovo index.js dentro de la carpeta de backend

// Bibliotecas necesarias para iniciar
require("dotenv").config(); // Carga variables de entorno desde un archivo .env
const cors = require("cors"); // Importar el paquete 'cors'
import express from "express"; // Framework web para Node.js
import mongoose from "mongoose"; // opción de biblioteca para manejar MongoDB en Node.js
import fs from "fs"; // Biblioteca para interactuar con el sistema de archivos
import https from "https"; // Biblioteca para crear servidores HTTPS

import { Request, Response } from "express";

// Esquemas de Mongoose

import User from "./schemas/User";
import Budget from "./schemas/Budget";
import Donation from "./schemas/Donation";
import Email from "./schemas/Email";
import GenericEmail from "./schemas/GenericEmail";

import { donationsRouter } from "./routes/donations";
import { usersRouter } from "./routes/users";

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

// GET Users
// app.get("/api/v1/users", async (req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener los usuarios" });
//   }
// });

// // GET User
// app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ error: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener el usuario" });
//   }
// });

// // POST User
// app.post("/api/v1/users", async (req: Request, res: Response) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: "Error al crear el usuario" });
//   }
// });

// // PUT User
// app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // esto es para que regrese el objeto actualizado, sino lo regresa el viejo
//     });
//     if (updatedUser) {
//       res.status(200).json(updatedUser);
//     } else {
//       res.status(404).json({ error: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al actualizar el usuario" });
//   }
// });

// // DELETE User
// app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (deletedUser) {
//       res.status(200).json({ id: deletedUser._id });
//     } else {
//       res.status(404).json({ error: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al eliminar el usuario" });
//   }
// });

// // GET Donations
// app.get("/api/v1/donations", async (req: Request, res: Response) => {
//   try {
//     const donations = await Donation.find();
//     res.status(200).json(donations);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener las donaciones" });
//   }
// });

// // GET Donation
// app.get("/api/v1/donations/:id", async (req: Request, res: Response) => {
//   try {
//     const donation = await Donation.findById(req.params.id);
//     if (donation) {
//       res.status(200).json(donation);
//     } else {
//       res.status(404).json({ error: "Donación no encontrada" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener la donación" });
//   }
// });

// // POST Donation
// app.post("/api/v1/donations", async (req: Request, res: Response) => {
//   try {
//     const newDonation = new Donation(req.body);
//     await newDonation.save();
//     res.status(201).json(newDonation);
//   } catch (error) {
//     res.status(500).json({ message: "Error al crear la donación" });
//   }
// });

// // PUT Donation
// app.put("/api/v1/donations/:id", async (req: Request, res: Response) => {
//   try {
//     const updatedDonation = await Donation.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true, // esto es para que regrese el objeto actualizado, sino lo regresa el viejo
//       }
//     );
//     if (updatedDonation) {
//       res.status(200).json(updatedDonation);
//     } else {
//       res.status(404).json({ error: "Donación no encontrada" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al actualizar la donación" });
//   }
// });

// // DELETE Donation
// app.delete("/api/v1/donations/:id", async (req: Request, res: Response) => {
//   try {
//     const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
//     if (deletedDonation) {
//       res.status(200).json({ id: deletedDonation._id });
//     } else {
//       res.status(404).json({ error: "Donación no encontrada" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error al eliminar la donación" });
//   }
// });

// Ruta para probar el backend en el navegador
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World - TC2007B!"); // Mensaje que se verá en la ventana del navegador
});

// Configuración de HTTPS
// const options = {
//     key: fs.readFileSync('server.key'), // Lee la llave privada del servidor
//     cert: fs.readFileSync('server.crt')  // Lee el certificado del servidor
// };

// Inicia el servidor HTTPS
// https.createServer(options, app).listen(PORT, () => {
//     console.log(`Server running on https://localhost:${PORT}`); // Mensaje de confirmación con el protocolo HTTPS
// });

// Inicia el servidor escuchando en el puerto especificado
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
