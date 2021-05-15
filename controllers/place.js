const PlaceModel = require("../models/Place");
const _ = require("lodash");

const createPlace = async (req, res) => {
  if (req.user.role == "SuperAdmin" || req.user.role == "Admin") {
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
        res.status(200).json(result);
      }
    );
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const getPlaces = async (req, res) => {
  if (!_.isEmpty(req.user.role)) {
    PlaceModel.find((err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
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

const getPlaceById = async (req, res) => {
  if (!_.isEmpty(req.user.role)) {
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

      res.status(200).json(result);
    });
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const deletePlaceById = async (req, res) => {
  console.log(req);
  if (req.user.role == "SuperAdmin" || req.user.role == "Admin") {
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
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const updatePlace = async (req, res) => {
  if (req.user.role == "SuperAdmin" || req.user.role == "Admin") {
    const { id } = req.params;
    const body = {
      ...req.body,
      province: req.body.province,
      name: req.body.name.trim(),
    };
    PlaceModel.findByIdAndUpdate(id, body, { new: true }, (err, result) => {
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

      res.status(200).json(result);
    });
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};
module.exports = {
  getPlaces,
  createPlace,
  deletePlaceById,
  getPlaceById,
  updatePlace,
};
