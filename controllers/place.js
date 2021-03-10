const PlaceModel = require("../models/Place");
const _ = require("lodash");

const createPlace = async (req, res) => {
  const { province, name } = req.body;
  PlaceModel.create(
    {
      province,
      name,
    },
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        ...result,
      });
    }
  );
};

const getPlaces = async (req, res) => {
  PlaceModel.find((err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      ...result,
    });
  });
};

const getPlaceById = async (req, res) => {
  const { id } = req.params;
  PlaceModel.findById(id, (err, result) => {
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
      ...result,
    });
  });
};

const deletePlaceById = async (req, res) => {
  const { id } = req.params;
  PlaceModel.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (_.isEmpty(result)) {
      res.status(400).json({
        error: "Đối tượng này không tồn tại",
      });
      return;
    }

    res.status(200).json({
      message: "Delete Place thành công!",
    });
  });
};

const updatePlace = async (req, res) => {
  const { id } = req.params;
  // const { name, type, slots, phone } = req.body;
  PlaceModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (_.isEmpty(result)) {
        res.status(400).json({
          error: "Đối tượng này không tồn tại",
        });
        return;
      }

      res.status(200).json({
        ...result,
      });
    }
  );
};
module.exports = {
  getPlaces,
  createPlace,
  deletePlaceById,
  getPlaceById,
  updatePlace,
};
