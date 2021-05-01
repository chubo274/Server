// Connect mongo
const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/nhan";

const PORT = 5000;

function connect() {
  const uri =
    "mongodb+srv://nhan:nhan@cluster0.esqbt.mongodb.net/nhan?retryWrites=true&w=majority";

  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
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
