const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    province: String,
    name: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Place", placeSchema);
