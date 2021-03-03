const UserModel = require("../models/user");

const createUser = async (req, res) => {
  const { phone, password, name, address } = req.body;
  try {
    {
      await UserModel.create({
        phone,
        password,
        name,
        address,
      });

      res.status(200).json({
        message: "Create user successfully!",
      });
    }
  } catch (error) {
    console.log("Create user error: ", error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json({
        message: "Delete user successfully!",
      });
    }
  } catch (error) {
    console.log("Delete user error: ", error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const user = await UserModel.findById(id);
      res.status(200).json(user);
    }
  } catch (error) {
    console.log("get user by id error: ", error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const listUsers = await UserModel.find();
    res.status(200).json(listUsers);
  } catch (error) {
    console.log("get list user error: ", error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      await UserModel.findByIdAndUpdate(id, {
        ...req.body,
      });
      res.status(200).json({
        message: "Update user successfully!",
      });
    } else {
      res.status(400).json({
        message: "Id user not found!",
      });
    }
  } catch (error) {
    console.log("update user error: ", error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { getUserById, getUsers, createUser, deleteById, updateUser };
