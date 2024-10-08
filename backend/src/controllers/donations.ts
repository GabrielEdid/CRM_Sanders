import {
  getDonation,
  getDonations,
  createDonation,
  updateDonation,
  deleteDonation,
} from "../services/donations";

import { Request, Response } from "express";
import Donation from "../schemas/Donation";
import {
  CreateDonationInput,
  UpdateDonationInput,
} from "../validation/donations";
import { donationHtmlTemplate } from "../services/emailTemplateService";
import { sendMail } from "../services/nodeMailerService";
import { attachments } from "../types/donationEmail";
import DonatorModel from "../schemas/Donator"; // Assuming you have a Donator model

const getDonationsHandler = async (req: Request, res: Response) => {
  try {
    const { donator } = req.query;
    const donations = await getDonations(donator ? { donator } : {});
    res.set("X-Total-Count", donations.length.toString());
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las donaciones" });
  }
};

const getDonationHandler = async (req: Request, res: Response) => {
  try {
    const donation = await getDonation(req.params.id);
    if (donation) {
      res.status(200).json(donation);
    } else {
      res.status(404).json({ error: "Donación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la donación" });
  }
};

const createDonationHandler = async (
  req: Request<{}, {}, CreateDonationInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    console.log(body);

    const newDonation = await Donation.create({
      ...body,
    });

    await newDonation.save();

    // `Hola, ${
    //   newDonation?.donator?.name! || ""
    // } <br />De parte de la Fundación Sanders agradecemos mucho tu donación.`,

    // validar con donator.isSendEmails antes de mandar el correo

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
      subject: "¡Gracias por tu donación!",
      html: htmlEmail,
      // to: [newDonation?.donator?.email!],
      to: ["marcosdm0404@gmail.com"],
      attachments: attachments,
    });

    res.status(201).json(newDonation);
    console.log("Donación creada");
  } catch (error) {
    res.status(500).json({ message: "Error al crear la donación" });
  }
};

const updateDonationHandler = async (
  req: Request<UpdateDonationInput["params"]>,
  res: Response
) => {
  try {
    const donationId = req.params.id;
    const update = req.body;

    const donation = await getDonation(donationId);

    if (!donation) {
      return res.status(404).json({ error: "Donación no encontrada" });
    }

    const updatedDonation = await updateDonation(donationId, update);

    return res.status(200).json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la donación" });
  }
};

const deleteDonationHandler = async (req: Request, res: Response) => {
  try {
    const deletedDonation = await deleteDonation(req.params.id);
    if (deletedDonation) {
      res.status(200).json({ id: deletedDonation._id });
    } else {
      res.status(404).json({ error: "Donación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la donación" });
  }
};

export {
  getDonationHandler,
  getDonationsHandler,
  createDonationHandler,
  updateDonationHandler,
  deleteDonationHandler,
};
