import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  city: String,
  rent: Number,
  description: String,
  availableFrom: Date,
  type: { type: String, enum: ["need_room", "have_room"] }
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);
