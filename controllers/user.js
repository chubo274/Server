const UserModel = require("../models/user");

const createUser = async (req, res) => {
  const { phone, password, name, address } = req.body;
  try {
    if (!phone || !password || !name) {
      res.json({
        statusCode: 400,
        message: "You need fill phone, password and name!",
      });
    } else {
      await UserModel.create({
        phone,
        password,
        name,
        address,
      });
      res.json({
        statusCode: 200,
        message: "Create user successfully!",
      });
    }
  } catch (error) {
    console.log("createUser error: ", error.message);
    res.json("Error: ", error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await UserModel.findByIdAndDelete(id);
      res.json({
        statusCode: 200,
        message: "Delete user successfully!",
      });
    }
  } catch (error) {}
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const user = await UserModel.findById(id);

      res.json(user);
    }
  } catch (error) {}
};

const getUsers = async (req, res) => {
  console.log("getusers");
  try {
    const listUsers = await UserModel.find();
    res.json(listUsers);
    console.log("listUsers:", listUsers);
  } catch (error) {
    console.log("error:", error.message);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      await UserModel.findByIdAndUpdate(id, {
        ...req.body,
      });
      res.json({
        statusCode: 200,
        message: "Update user successfully!",
      });
    } else {
      res.json({
        statusCode: 400,
        message: "Id user not found!",
      });
    }
  } catch (error) {
    res.send("Error");
  }
};

module.exports = { getUserById, getUsers, createUser, deleteById, updateUser };
