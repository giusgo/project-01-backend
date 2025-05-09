import { Request, Response } from 'express';
import { createReservation } from '../actions/reservation/create.action';
import { readReservationById, readReservations } from '../actions/reservation/read.action';
import { updateReservation } from '../actions/reservation/update.action';
import { deleteReservation } from '../actions/reservation/delete.action';

export const createReservationController = async (req: Request, res: Response) => {
  try {
    const reservation = await createReservation(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const readReservationByIdController = async (req: Request, res: Response) => {
  try {
    const reservation = await readReservationById({ reservationId: req.params.reservationId });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const readReservationsController = async (req: Request, res: Response) => {
  try {
    const reservations = await readReservations(req.body);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateReservationController = async (req: Request, res: Response) => {
  try {
    const reservation = await updateReservation({ reservationId: req.params.reservationId, updates: req.body });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteReservationController = async (req: Request, res: Response) => {
  try {
    await deleteReservation({ reservationId: req.params.reservationId });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};