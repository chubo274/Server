const AdminModel = require("../models/Admin");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

//* Token
const encodeToken = (_id, baseToken) => {
  return jwt.sign({ _id, baseToken }, "secret_key_admin", { expiresIn: "7d" });
};

//* Login
const login = async (req, res) => {
  const { user_name, password } = req.body;
  let admin = await AdminModel.findOne({ user_name: user_name });
  if (_.isEmpty(admin)) {
    res.status(402).json({
      error: "Tài khoản không tồn tại",
    });
    return;
  }
  const checkPassword = await bcrypt.compare(password, admin.password);
  if (!checkPassword) {
    res.status(402).json({
      error: "Sai mật khẩu",
    });
    return;
  }

  const baseToken = uuidv4();
  const data = await AdminModel.findByIdAndUpdate(admin._id, { baseToken });
  if (_.isEmpty(data)) {
    res.status(500).json({
      error: "oops! có lỗi của server",
    });
    return;
  }
  const token = encodeToken(admin._id, baseToken);
  const resData = { ...data._doc, token };
  delete resData.baseToken;
  resData.role = "admin";
  res.status(200).json(resData);
};

//* Create
const createAdmin = async (req, res) => {
  const body = {
    user_name: req.body.user_name,
    password: req.body.password,
    role: req.body.role.trim(),
  };
  const hashPassword = await bcrypt.hash(body.password, 12);
  body.password = hashPassword;
  AdminModel.create(body, (err, result) => {
    if (err) {
      console.log("creat Admin error: ", err.message);
      res.status(400).json({
        error: err.message,
      });
      return;
    }

    res.status(200).json(result);
  });
};

//* Delete
const deleteById = async (req, res) => {
  const { id } = req.params;
  AdminModel.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
      return;
    }
    if (_.isEmpty(result)) {
      res.status(400).json({
        error: "Đối tượng này không tồn tại",
      });
      return;
    }
    res.status(200).json({
      message: "Delete admin thành công!",
    });
  });
};

//* get
const getAdmins = async (req, res) => {
  AdminModel.find((err, result) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
      return;
    }

    res.status(200).json(result);
  });
};

module.exports = {
  login,
  createAdmin,
  deleteById,
  getAdmins,
};
