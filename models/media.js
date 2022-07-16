import mongoose from "mongoose";
const { Schema } = mongoose;

const mediaSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    favoritedBy: { type: Schema.Types.ObjectId, ref: "Profile" },
  },
  {
    timestamps: true,
  }
);

const Media = mongoose.model("Media", mediaSchema);

export { Media };
