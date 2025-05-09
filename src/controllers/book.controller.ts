import { Request, Response } from 'express';
import { createBook } from '../actions/book/create.action';
import { readBookById, readBooksByVolume } from '../actions/book/read.action';
import { updateBook } from '../actions/book/update.action';
import { deleteBook } from '../actions/book/delete.action';

export const createBookController = async (req: Request, res: Response) => {
  try {
    const book = await createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const readBookByIdController = async (req: Request, res: Response) => {
  try {
    const book = await readBookById({ bookId: req.params.bookId });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const readBooksByVolumeController = async (req: Request, res: Response) => {
  try {
    const books = await readBooksByVolume({ filters: req.body });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateBookController = async (req: Request, res: Response) => {
  try {
    const book = await updateBook({ bookId: req.params.bookId, updates: req.body });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteBookController = async (req: Request, res: Response) => {
  try {
    await deleteBook({ bookId: req.params.bookId });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};