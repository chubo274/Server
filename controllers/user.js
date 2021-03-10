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
  const { phone, password } = req.body;
  let user = await UserModel.findOne({ phone });
  if (_.isEmpty(user)) {
    console.log("login error: ", err.message);
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
  res.status(200).json({
    message: "Đăng nhập thành công",
    data: { ...resData },
  });
};

//* Create
const createUser = async (req, res) => {
  const { phone, password, name, address } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  UserModel.create(
    {
      phone,
      password: hashPassword,
      name,
      address,
    },
    (err, result) => {
      if (err) {
        console.log("createUser error: ", err.message);
        res.status(400).json({
          error: err.message,
        });
        return;
      }

      res.status(200).json({
        message: "Create user thành công!",
        data: result,
      });
    }
  );
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
    res.status(200).json({ data: result });
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

    res.status(200).json({ data: result });
  });
};

//* UpdatebyId
const updateUser = async (req, res) => {
  const id = req.params.id;
  const newBody = { ...req.body };
  UserModel.findByIdAndUpdate(id, newBody, { new: true }, (err, result) => {
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
      message: "Update user thành công",
      data: result,
    });
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
