const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provinceSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    description: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Provinces", provinceSchema);
