import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  // Basic Info
  age: {
    type: Number,
    min: 0,
    max: 125,
    required: true
  },

  gender: {
    type: String,
    enum: ["male", "female", "others"],
    required: true
  },

  role: {
    type: String,
    enum: ["student", "working"],
    required: true
  },

  description: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  budget: {
    type: Number,
    required: true
  },

  moveInDate: {
    type: Date,
    required: true
  },

  // Roommate Logic
  hasRoom: {
    type: Boolean,
    required: true
  },

  // Only required if user HAS a room
  roomDetails: {
    address: String,
    details: String
  },

  // Preferences
  preferences: {
    smoking: {
      type: Boolean,
      default: false
    },
    drinking: {
      type: Boolean,
      default: false
    },
    foodType: {
      type: String,
      default: "veg"
    }
  }

}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);

