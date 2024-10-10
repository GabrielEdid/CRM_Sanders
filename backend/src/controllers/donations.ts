import {
  getDonation,
  getDonations,
  updateDonation,
  deleteDonation,
  getLastYearDonationSummary,
} from "../services/donations";

import { get2RandomArticles } from "../services/articles";

import { Request, Response } from "express";
import Donation, { DonationInput } from "../schemas/Donation";
import {
  CreateDonationInput,
  UpdateDonationInput,
} from "../validation/donations";
import { donationHtmlTemplate } from "../services/emailTemplateService";
import { sendMail } from "../services/nodeMailerService";
import { attachments } from "../types/donationEmail";
import DonatorModel, { DonatorInput } from "../schemas/Donator"; // Assuming you have a Donator model
import { formatCurrency } from "../services/utils";

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

const sendDonationEmail = async (
  donation: DonationInput,
  donator: DonatorInput
) => {
  const { totalDonations, totalTransactions, donatorsCount } =
    await getLastYearDonationSummary();

  const articles = await get2RandomArticles();

  const htmlEmail = await donationHtmlTemplate(
    `Hola, ${
      donator.name || donator.email
    }! <br />De parte de la Fundación Sanders agradecemos mucho tu donación por ${formatCurrency(
      donation.amount
    )}.`,
    articles[0].title,
    articles[0].body,
    articles[0].readMoreUrlArticle,
    articles[1].title,
    articles[1].body,
    articles[1].readMoreUrlArticle,
    `${formatCurrency(totalDonations)}`,
    "Total recaudado",
    `${totalTransactions}`,
    "Número de transacciones",
    `${donatorsCount}`,
    "Número de donadores"
  );

  if (!htmlEmail) {
    throw new Error("Error al crear el correo");
  }

  await sendMail({
    subject: `${donator.name || donator.email} ¡Gracias por tu donación!`,
    html: htmlEmail,
    to: [donator.email],
    attachments: attachments,
  });
};

const createDonation = async (donation: DonationInput) => {
  const newDonation = await Donation.create({
    ...donation,
  });
  try {
    await newDonation.save();
  } catch (error) {
    return { error, message: "Error al crear la donación" };
  }

  const donator = await DonatorModel.findById(donation.donator);

  if (donator && donator.email !== "anonimo@mail.com") {
    try {
      await sendDonationEmail(newDonation, donator);
      return newDonation;
    } catch (error) {
      return { error, message: "Error al enviar el correo" };
    }
  }
};

const createDonationHandler = async (
  req: Request<{}, {}, CreateDonationInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const newDonation = await createDonation(body);
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ error });
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
  createDonation,
  updateDonationHandler,
  deleteDonationHandler,
};
