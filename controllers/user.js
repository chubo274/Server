const UserModel = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

//* Token
const encodeToken = (_id, baseToken) => {
  return jwt.sign({ _id, baseToken }, "secret_key", { expiresIn: "7d" });
};

//* Login
const login = async (req, res) => {
  const { user_name, password } = req.body;
  let user = await UserModel.findOne({ phone: user_name });
  if (_.isEmpty(user)) {
    res.status(402).json({
      error: "Số điện thoại không tồn tại",
    });
    return;
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    res.status(402).json({
      error: "Sai mật khẩu",
    });
    return;
  }

  const baseToken = uuidv4();
  const data = await UserModel.findByIdAndUpdate(user._id, { baseToken });
  if (_.isEmpty(data)) {
    res.status(500).json({
      error: "oops! có lỗi của server",
    });
    return;
  }
  const token = encodeToken(user._id, baseToken);
  const resData = { ...data._doc, token };
  delete resData.baseToken;
  res.status(200).json(resData);
};

//* Create
const createUser = async (req, res) => {
  const body = {
    phone: req.body.phone,
    password: req.body.password,
    name: req.body.name.trim(),
    address: req.body.address.trim(),
  };
  const hashPassword = await bcrypt.hash(body.password, 12);
  body.password = hashPassword;
  UserModel.create(body, (err, result) => {
    if (err) {
      console.log("createUser error: ", err.message);
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
  UserModel.findByIdAndDelete(id, (err, result) => {
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
      message: "Delete user thành công!",
    });
  });
};

//* GetbyId
const getUserById = async (req, res) => {
  const id = req.params.id;

  UserModel.findById(id, (err, result) => {
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
    res.status(200).json(result);
  });
};

//* GetList
const getUsers = async (req, res) => {
  UserModel.find((err, result) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
      return;
    }

    res.status(200).json(result);
  });
};

//* UpdatebyId
const updateUser = async (req, res) => {
  const id = req.params.id;
  const body = {
    ...req.body,
    phone: req.body.phone,
    // password: req.body.password,
    name: req.body.name.trim(),
    address: req.body.address.trim(),
  };
  if (!_.isEmpty(body.password)) {
    const hashPassword = await bcrypt.hash(body.password, 12);
    body.password = hashPassword;
  }

  UserModel.findByIdAndUpdate(id, body, { new: true }, (err, result) => {
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
    res.status(200).json(result);
  });
};

module.exports = {
  login,
  getUserById,
  getUsers,
  createUser,
  deleteById,
  updateUser,
};
