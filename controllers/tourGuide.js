const mongoose = require("mongoose");
const TourGuideModel = require("../models/TourGuide");
const _ = require("lodash");

const createTourGuide = async (req, res) => {
  const { name, gender, phone } = req.body;
  TourGuideModel.create(
    {
      name,
      gender,
      phone,
    },
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.status(200).json({
        message: "Create TourGuide thành công!",
        data: result,
      });
    }
  );
};

const getTourGuides = async (req, res) => {
  TourGuideModel.find((err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.status(200).json({
      data: result,
    });
  });
};

const getTourGuideById = async (req, res) => {
  const { id } = req.params;
  TourGuideModel.findById(id, (err, result) => {
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
      data: result,
    });
  });
};

const deleteTourGuideById = async (req, res) => {
  const { id } = req.params;
  TourGuideModel.findByIdAndDelete(id, (err, result) => {
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
      message: "Delete tour guide thành công",
    });
  });
};

const updateTourGuide = async (req, res) => {
  const id = req.params.id;
  const newBody = { ...req.body };
  TourGuideModel.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    newBody,
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
      res.status(200).json({
        message: "Update Tour Guide thành công",
        data: result,
      });
    }
  );
};

module.exports = {
  createTourGuide,
  getTourGuides,
  getTourGuideById,
  deleteTourGuideById,
  updateTourGuide,
};
