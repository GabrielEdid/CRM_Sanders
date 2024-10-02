import nodemailer from "nodemailer";
// https://medium.com/@efenstakes101/send-free-emails-with-typescript-express-nestjs-58b4ef027a60

// Interfaz para definir la estructura de los datos de envío de correo
interface ISendMail {
  subject: string;
  html: string;
  attachments?: { filename: string; path: string; cid: string }[];
  to: string[];
  cc?: string[];
  bcc?: string[];
}

// Función para enviar el correo
export const sendMail = async ({
  subject,
  html,
  attachments,
  to,
  cc = [],
  bcc = [],
}: ISendMail): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GOOGLE_MAIL_APP_EMAIL,
      pass: process.env.GOOGLE_MAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_MAIL_APP_EMAIL,
    to: to,
    attachments: attachments,
    cc: cc,
    bcc: bcc,
    subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error enviando correo: ", error);
    return false;
  }
};
