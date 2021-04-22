const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    user_name: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    baseToken: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Admin", adminSchema);
