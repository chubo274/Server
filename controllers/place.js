const PlaceModel = require("../models/Place");

const createPlace = async (req, res) => {
  const { province, name } = req.body;
  try {
    const newPlace = await PlaceModel.create({
      province,
      name,
    });

    res.status(200).json({
      message: "Create Place successfully!",
      data: newPlace,
    });
  } catch (error) {
    console.log("createPlace error: ", error.message);
    res.status(400).json(error.message);
  }
};

const getPlaces = async (req, res) => {
  try {
    const listPlaces = await PlaceModel.find();

    res.status(200).json({
      data: listPlaces,
    });
  } catch (error) {
    console.log("getPlaces error: ", error.message);
    res.status(400).json(error.message);
  }
};

const deletePlaceById = async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  try {
    await PlaceModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete Place successfully!",
    });
  } catch (error) {
    console.log("deletePlaceById error: ", error.message);
    res.status(400).json(error.message);
  }
};

module.exports = { getPlaces, createPlace, deletePlaceById };
