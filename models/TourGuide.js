const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourGuideSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: Number,
    phone: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("TourGuide", tourGuideSchema);
