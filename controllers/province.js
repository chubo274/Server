const ProvinceModel = require("../models/Province");

const createProvince = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProvince = await ProvinceModel.create({ name, description });
    res.json({
      statusCode: 200,
      message: "Create Province successfully!",
      data: newProvince,
    });
  } catch (error) {
    console.log("createProvince error: ", error.message);
    res.json("Error: ", error.message);
  }
};

const getProvinces = async (req, res) => {
  try {
    const listProvinces = await ProvinceModel.find();
    res.json(listProvinces);
  } catch (error) {
    console.log("getProvinces error: ", error.message);
    res.json("Error: ", error.message);
  }
};

module.exports = { createProvince, getProvinces };
