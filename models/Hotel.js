const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  service: String,
  hotline: String,
});

module.exports = mongoose.model("Hotel", hotelSchema);
