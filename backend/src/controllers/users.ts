import jwt from "jsonwebtoken";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/users";

import { Request, Response } from "express";

import { CreateUserInput } from "../validation/users";
import { sendMail } from "../services/nodeMailerService";
import { donationHtmlTemplate } from "../services/emailTemplateService";
import { attachments } from "../types/donationEmail";
const secretKey = process.env.SECRET_KEY || "";

const bcrypt = require("bcrypt");

const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.set("X-Total-Count", users.length.toString());
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

const getUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await getUser({ _id: req.params.id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario por su Id" });
  }
};

const loginHandler = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Es necesario introducir usuario y contraseña" });
    }
    const user = await getUser({ username: username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(password);

      if (passwordMatch) {
        const token = jwt.sign({ username }, secretKey!, { expiresIn: "24h" });
        const tokenJson = {
          token: token,
          username: user.username,
        };

        return res.status(200).json(tokenJson);
      } else {
        return res
          .status(401)
          .json({ message: "Usuario y/o contraseña incorrectos" });
      }
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

const verifyToken = (
  req: Request & { username?: string },
  res: Response,
  next: any
) => {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, secretKey!) as jwt.JwtPayload;
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
};

const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const { username, email } = req.body;
    const existingUser = await getUser({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({
        error:
          "Usuario ya existe con ese nombre de usuario o correo electrónico",
      });
    }

    const newUser = await createUser(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la donación" });
  }
};

const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "Usuario no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json({ id: deletedUser._id });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

const emailSender = async (req: Request, res: Response) => {
  const receivers = [
    "diegoabdov@gmail.com",
    "marcosdm0404@gmail.com",
    "ishakalopaz@gmail.com",
    "gabrieledid28@gmail.com",
  ];
  const subject = "¡Gracias por tu donación!";

  const htmlEmail = await donationHtmlTemplate(
    `Hola<br />De parte de la Fundación Sanders agradecemos mucho tu donación.`,
    "headerArticle1",
    "bodyArticle1",
    "headerArticle2",
    "bodyArticle2",
    "stat1",
    "descriptionStat1",
    "stat2",
    "descriptionStat2",
    "stat3",
    "descriptionStat3",
    "headerArticle3",
    "bodyArticle3"
  );

  if (!htmlEmail) {
    return res.status(500).json({ message: "Error al crear el correo" });
  }

  await sendMail({
    subject,
    html: htmlEmail,
    to: receivers,
    attachments: attachments,
  });
  res.status(200).json({ message: "Email enviado" });
};

export {
  getUserHandler,
  getUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginHandler,
  emailSender,
};
