import nodemailer from "nodemailer";

interface ISendMail {
  to: string;
  subject: string;
  message: string;
}
export class MailService {
  // logic for sending emails will go here
  async send({ to, subject, message }: ISendMail) {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GOOGLE_MAIL_APP_EMAIL,
        pass: process.env.GOOGLE_MAIL_APP_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.GOOGLE_MAIL_APP_EMAIL,
      to,
      subject,
      html: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("error sending email ", error);
      return false;
    }
  }
}
