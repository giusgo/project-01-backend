import { Request, Response } from 'express';
import { createUser } from '../actions/user/create.action';
import { readUser } from '../actions/user/read.action';
import { updateUser } from '../actions/user/update.action';
import { deleteUser } from '../actions/user/delete.action';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const readUserController = async (req: Request, res: Response) => {
  try {
    const user = await readUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = await updateUser({ userId: req.params.userId, updates: req.body });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    await deleteUser({ userId: req.params.userId });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};