import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const userId = req.user._id;
  const { tag, search, page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find({
    userId,
  });

  if (tag) notesQuery.where('tag').equals(tag);
  if (search) notesQuery.where({ $text: { $search: search } });

  const [totalItems, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const userId = req.user._id;
  const { noteId } = req.params;
  const note = await Note.findOne({
    _id: noteId,
    userId,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const userId = req.user._id;
  const note = await Note.create({ ...req.body, userId });

  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const userId = req.user._id;
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId,
  });

  if (!note) throw createHttpError(404, 'Note not found');

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const userId = req.user._id;
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId,
    },
    req.body,
    {
      returnDocument: 'after',
    },
  );
  if (!note) throw createHttpError(404, 'Note not found');

  res.status(201).json(note);
};
