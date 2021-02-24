const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  address: String,
  baseToken: String,
});

module.exports = mongoose.model("Users", userSchema);
