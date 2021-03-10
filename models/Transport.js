const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transportSchema = new Schema(
  {
    name: { type: String, required: true },
    type: String,
    slots: Number,
    phone: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Transport", transportSchema);
