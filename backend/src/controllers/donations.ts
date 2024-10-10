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

const getTopDonatorsHandler = async (req: Request, res: Response) => {
  try {
    const topDonators = await Donation.aggregate([
      {
        $group: {
          _id: "$donator",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "donators",
          localField: "_id",
          foreignField: "_id",
          as: "donator",
        },
      },
      {
        $unwind: "$donator",
      },
      {
        $project: {
          _id: 0,
          donatorId: "$_id",
          donatorName: "$donator.name",
          donatorEmail: "$donator.email",
          totalAmount: 1,
        },
      },
    ]);

    res.status(200).json(topDonators);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los donadores principales" });
  }
};

const getDonationTrendHandler = async (req: Request, res: Response) => {
  try {
    const { interval } = req.query; // Obtener el parámetro 'interval' de la consulta
    const currentDate = new Date();
    let startDate: Date | null = null;

    // Determinar la fecha de inicio basada en el intervalo
    switch (interval) {
      case "day":
        // Últimos 30 días
        startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - 30);
        break;

      case "week":
        // Últimas 7 semanas
        startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - 7 * 7); // Aproximadamente 7 semanas
        break;

      case "month":
        // Últimos 12 meses
        startDate = new Date(currentDate);
        startDate.setMonth(startDate.getMonth() - 12);
        break;

      case "year":
        // Mostrar todos los años (no establecer startDate)
        startDate = null;
        break;

      default:
        // Valor por defecto: 'month'
        startDate = new Date(currentDate);
        startDate.setMonth(startDate.getMonth() - 12);
        break;
    }

    // Construir el pipeline de agregación
    const pipeline: any[] = [];

    // Añadir etapa $match si startDate está definido
    if (startDate) {
      pipeline.push({
        $match: {
          createdAt: { $gte: startDate },
        },
      });
    }

    // Definir las etapas de agrupación y proyección según el intervalo
    switch (interval) {
      case "day":
        startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - 30); // Últimos 30 días
        pipeline.push({
          $match: {
            createdAt: { $gte: startDate },
          },
        });
        pipeline.push({
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            totalAmount: { $sum: "$amount" },
          },
        });
        pipeline.push({
          $project: {
            _id: 0,
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: {
                  $dateFromParts: {
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day",
                  },
                },
              },
            },
            totalAmount: 1,
          },
        });
        pipeline.push({
          $sort: { date: 1 },
        });
        break;

      case "week":
        startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - 7 * 7); // Últimas 7 semanas
        pipeline.push({
          $match: {
            createdAt: { $gte: startDate },
          },
        });
        pipeline.push({
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              week: { $isoWeek: "$createdAt" }, // Agrupar por semana ISO
            },
            totalAmount: { $sum: "$amount" },
          },
        });
        pipeline.push({
          $project: {
            _id: 0,
            date: {
              $concat: [
                { $toString: "$_id.year" },
                "-W",
                {
                  $cond: [
                    { $lte: ["$_id.week", 9] },
                    { $concat: ["0", { $toString: "$_id.week" }] },
                    { $toString: "$_id.week" },
                  ],
                },
              ],
            },
            totalAmount: 1,
          },
        });
        pipeline.push({
          $sort: { date: 1 },
        });
        break;

      case "year":
        pipeline.push({
          $group: {
            _id: {
              year: { $year: "$createdAt" },
            },
            totalAmount: { $sum: "$amount" },
          },
        });

        pipeline.push({
          $project: {
            _id: 0,
            date: { $toString: "$_id.year" },
            totalAmount: 1,
          },
        });
        break;

      case "month":
      default:
        pipeline.push({
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalAmount: { $sum: "$amount" },
          },
        });

        pipeline.push({
          $project: {
            _id: 0,
            date: {
              $dateToString: {
                format: "%Y-%m",
                date: {
                  $dateFromParts: {
                    year: "$_id.year",
                    month: "$_id.month",
                    day: 1,
                  },
                },
              },
            },
            totalAmount: 1,
          },
        });
        break;
    }

    // Añadir etapa $sort para ordenar cronológicamente
    pipeline.push({
      $sort: { date: 1 },
    });

    // Ejecutar la agregación
    const donationTrend = await Donation.aggregate(pipeline);

    res.status(200).json(donationTrend);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener la tendencia de donaciones" });
  }
};

const getRecurringVsUniqueDonationsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await Donation.aggregate([
      {
        $group: {
          _id: "$donator",
          totalDonations: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "donators",
          localField: "_id",
          foreignField: "_id",
          as: "donator",
        },
      },
      {
        $unwind: "$donator",
      },
      {
        $group: {
          _id: null,
          uniqueDonators: {
            $sum: { $cond: [{ $eq: ["$totalDonations", 1] }, 1, 0] },
          },
          recurringDonators: {
            $sum: { $cond: [{ $gt: ["$totalDonations", 1] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          uniqueDonators: 1,
          recurringDonators: 1,
        },
      },
    ]);

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(200).json({ uniqueDonators: 0, recurringDonators: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las donaciones recurrentes y únicas",
    });
  }
};

const getPaymentMethodDistributionHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const paymentMethodDistribution = await Donation.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          paymentMethod: "$_id",
          totalAmount: 1,
          count: 1,
        },
      },
    ]);

    res.status(200).json(paymentMethodDistribution);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener la distribución de métodos de pago" });
  }
};

export {
  getDonationHandler,
  getDonationsHandler,
  createDonationHandler,
  createDonation,
  updateDonationHandler,
  deleteDonationHandler,
  getTopDonatorsHandler,
  getDonationTrendHandler,
  getRecurringVsUniqueDonationsHandler,
  getPaymentMethodDistributionHandler,
};
