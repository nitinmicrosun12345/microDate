const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  age: { type: Number, required: true },
  bio: { type: String, default: "" },
  interests: [{ type: String }],
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  picture: { type: String, default: "" },
  preferences: {
    distanceRange: { type: Number, default: 50 },
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 100 },
    },
    genderPreference: {
      type: String,
      enum: ["Male", "Female", "Everyone"],
      default: "Everyone",
    },
  },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  visibility: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
