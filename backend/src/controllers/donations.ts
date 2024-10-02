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
    const newDonation = await createDonation({
      ...body,
    });
    await newDonation.save();
    res.status(201).json(newDonation);
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
