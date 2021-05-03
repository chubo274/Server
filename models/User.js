const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Staff", "Admin", "SuperAdmin", "User"],
    },
    bank_number: String,
    money_available: Number,
    address: String,
    baseToken: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
