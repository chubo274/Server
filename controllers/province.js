const ProvinceModel = require("../models/Province");

const createProvince = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProvince = await ProvinceModel.create({
      name,
      description,
    });

    res.status(200).json({
      message: "Create Province successfully!",
      data: newProvince,
    });
  } catch (error) {
    console.log("createProvince error: ", error.message);
    res.status(400).json(error.message);
  }
};

const getProvinces = async (req, res) => {
  try {
    const listProvinces = await ProvinceModel.find();

    res.status(200).json({
      data: listProvinces,
    });
  } catch (error) {
    console.log("getProvinces error: ", error.message);
    res.status(400).json(error.message);
  }
};

const deleteProvinceById = async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  try {
    await ProvinceModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete Province successfully!",
    });
  } catch (error) {
    console.log("deleteProvinceById error: ", error.message);
    res.status(400).json(error.message);
  }
};

module.exports = { getProvinces, createProvince, deleteProvinceById };
