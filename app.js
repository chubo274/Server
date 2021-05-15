const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const { PORT } = require("./config/index");
const mongo = require("./config/index");

//! Router
const router = require("./router");
const app = express();

//! connect to database
mongo.connect_db();

//! configure middleware
app.set("port", process.env.port || PORT); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

//! view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.disable("etag");

//* Api Router
app.use("/user", router.user);
app.use("/admin", router.admin);
app.use("/place", router.place);
app.use("/tour", router.tour);
app.use("/upload", router.upload);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err.message : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// const adminBro = new AdminBro({
//   databases: [],
//   rootPath: "/admin-route",
// });

// const adminRoute = AdminBroExpress.buildRouter(adminBro);

// app.use(adminBro.options.rootPath, adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
// app.listen(3000, () => console.log("AdminBro is under localhost:8080/admin"));

module.exports = app;
