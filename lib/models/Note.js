import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      maxLength: 200,
    },
  },
  {
    timestamps: true, // ✅ auto adds createdAt & updatedAt
  },
);

noteSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
