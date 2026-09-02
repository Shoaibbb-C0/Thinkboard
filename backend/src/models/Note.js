import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    category: {
      type: String,
      default: "Personal",
      trim: true,
      maxlength: 50,
    },

    reminder: {
      enabled: {
        type: Boolean,
        default: false,
      },
      dateTime: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;