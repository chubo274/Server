// Connect mongo
const mongoose = require("mongoose");

const PORT = 5000;

function connect() {
  const uri =
    "mongodb+srv://nhan:nhan@cluster0.esqbt.mongodb.net/nhan?retryWrites=true&w=majority";

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("=========== MongoDB Connected ===========");
    })
    .catch((err) => console.log(err));
}

module.exports = {
  connect_db: connect,
  PORT,
};
