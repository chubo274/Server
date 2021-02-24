const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourGuideSchema = new Schema({
  name: { type: String, required: true },
  gender: Number,
  phone: String,
});

module.exports = mongoose.model("TourGuide", tourGuideSchema);
