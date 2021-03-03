const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    province: {
      type: Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },
    name: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Place", placeSchema);
