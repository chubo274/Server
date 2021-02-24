const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transportSchema = new Schema({
  name: { type: String, required: true },
  type: String,
  phone: String,
});

module.exports = mongoose.model("Transport", transportSchema);
