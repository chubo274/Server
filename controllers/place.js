const PlaceModel = require("../models/Place");

const createPlace = async (req, res) => {
  const { name } = req.body;
  try {
  } catch (error) {}
};

const getPlaces = async (req, res) => {
  try {
    const listPlaces = await PlaceModel.find();
    res.json(listPlaces);
  } catch (error) {}
};

module.exports = { createPlace, getPlaces };
