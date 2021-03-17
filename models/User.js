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
    address: String,
    baseToken: String,
  },
  { versionKey: false }
);

// userSchema.methods.hashPassword = function(password){
//   return bcrypt.hashPassword
// }

// userSchema.pre('save', function() {
//   hashPassword = this.hashPassword(password)
// })

userSchema.pre('update', function(next) {
  console.log('running here')
  console.log(this.getUpdate())
  next()
})

module.exports = mongoose.model("User", userSchema);
