const UserModel = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
    role: req.body.role ? req.body.role.trim() : "User",
    bank_number: `${req.body.phone}88`,
    money_available: 0,
    address: req.body.address,
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
  if (req.user.role == "SuperAdmin") {
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
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

//* GetbyId
const getUserById = async (req, res) => {
  if (!_.isEmpty(req.user.role)) {
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
      delete result.baseToken;
      res.status(200).json(result);
    });
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

//* GetList
const getUsers = async (req, res) => {
  if (req.user.role == "SuperAdmin" || req.user.role == "Admin") {
    UserModel.find((err, result) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }

      res.status(200).json(result);
    });
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

//* UpdatebyId
const updateUser = async (req, res) => {
  if (req.user.role == "SuperAdmin" || req.user.role == "User") {
    const id = req.params.id;
    const body = {
      ...req.body,
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

      const data = { ...result._doc };
      delete data.baseToken;
      res.status(200).json(data);
    });
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const forGotPass = async (req, res) => {
  console.log(req.body);
  const { phone, password } = req.body;
  try {
    const user = await UserModel.find({ phone });
    let body = { ...user[0]._doc };
    if (!_.isEmpty(password)) {
      const hashPassword = await bcrypt.hash(password, 12);
      body.password = hashPassword;
      delete body._id;
      delete body.baseToken;
      delete body.token;
    }
    UserModel.findByIdAndUpdate(
      { _id: user[0]._id },
      body,
      { new: true },
      (err, result) => {
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

        const data = result;
        delete data.baseToken;
        res.status(200).json(data);
      }
    );
  } catch (error) {
    res.status(400).json({
      error: "Oop, có lỗi",
    });
  }
};

module.exports = {
  login,
  getUserById,
  getUsers,
  createUser,
  deleteById,
  updateUser,
  forGotPass,
};
