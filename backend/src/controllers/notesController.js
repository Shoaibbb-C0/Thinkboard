import mongoose from "mongoose";
import Note from "../models/Note.js";

function isValidNoteId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getNoteById(req, res) {
  try {
    if (!isValidNoteId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid note ID",
      });
    }

    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      userId: req.user._id,
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function updateNote(req, res) {
  try {
    if (!isValidNoteId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid note ID",
      });
    }

    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      {
        title: title.trim(),
        content: content.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function deleteNote(req, res) {
  try {
    if (!isValidNoteId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid note ID",
      });
    }

    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}