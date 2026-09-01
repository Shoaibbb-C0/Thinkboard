import express from "express";

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

import {
  protectRoute,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Everything below this line requires authentication
router.use(protectRoute);

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;