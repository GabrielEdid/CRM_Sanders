import {
  getDonator,
  getDonators,
  createDonator,
  updateDonator,
  deleteDonator,
} from "../services/donators";

import { Request, Response } from "express";
import { CreateDonatorInput, UpdateDonatorInput } from "../validation/donators";

interface DonatorQuery {
  name?: string;
  "lastDonationDate@gte"?: string;
  "lastDonationDate@lte"?: string;
}

const getDonatorsHandler = async (
  req: Request<{}, {}, {}, DonatorQuery>,
  res: Response
) => {
  try {
    const {
      name,
      "lastDonationDate@gte": lastDonationGte,
      "lastDonationDate@lte": lastDonationLte,
    } = req.query;

    // Pass the query parameters to the getDonators service
    const donators = await getDonators(name, lastDonationGte, lastDonationLte);
    res.set("X-Total-Count", donators.length.toString());
    res.status(200).json(donators);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los donadores" });
  }
};

const getDonatorHandler = async (req: Request, res: Response) => {
  try {
    const donator = await getDonator(req.params.id);
    if (donator) {
      res.status(200).json(donator);
    } else {
      res.status(404).json({ error: "Donador no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el donador" });
  }
};

const createDonatorHandler = async (
  req: Request<{}, {}, CreateDonatorInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const newDonator = await createDonator({
      ...body,
    });
    console.log(newDonator);
    await newDonator.save();
    res.status(201).json(newDonator);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear al donador" });
  }
};

const updateDonatorHandler = async (
  req: Request<UpdateDonatorInput["params"]>,
  res: Response
) => {
  try {
    const donatorId = req.params.id;
    console.log(req.params);
    const update = req.body;

    const donator = await getDonator(donatorId);

    if (!donator) {
      return res.status(404).json({ error: "Donador no encontrado" });
    }

    const updatedDonator = await updateDonator(donatorId, update);

    return res.status(200).json(updatedDonator);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el donador" });
  }
};

const deleteDonatorHandler = async (req: Request, res: Response) => {
  try {
    const deletedDonator = await deleteDonator(req.params.id);
    if (deletedDonator) {
      res.status(200).json({ id: deletedDonator._id });
    } else {
      res.status(404).json({ error: "Donador no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el donador" });
  }
};

export {
  getDonatorHandler,
  getDonatorsHandler,
  createDonatorHandler,
  updateDonatorHandler,
  deleteDonatorHandler,
};
