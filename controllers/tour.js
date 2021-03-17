const TourModel = require("../models/Tour");
const moment = require("moment");
const _ = require("lodash");

const createTour = async (req, res) => {
  const body = {
    name: req.body.name.trim(),
    place: req.body.place,
    price: req.body.price,
    avatar: req.body.avatar,
    place_start: req.body.place_start,
    time_start: req.body.time_start,
    travel_time: req.body.travel_time,
    schedule: req.body.schedule,
    slots: req.body.slots,
    hotel: req.body.hotel,
    transport: req.body.transport,
    tour_guide: req.body.tour_guide,
    list_image: req.body.list_image,
    discount: req.body.discount,
    description: req.body.description.trim(),
    notes: req.body.notes,
    booking: req.body.booking,
  };
  TourModel.create(body, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.status(200).json(result);
  });
};

const getTours = async (req, res) => {
  TourModel.find((err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.status(200).json(result);
  });
};

const getTourById = async (req, res) => {
  const { id } = req.params;
  TourModel.findById(id, (err, result) => {
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
};

const updateTour = async (req, res) => {
  const { id } = req.params;
  const body = {
    ...req.body,
    name: req.body.name.trim(),
    place: req.body.place,
    price: req.body.price,
    avatar: req.body.avatar,
    place_start: req.body.place_start,
    time_start: req.body.time_start,
    travel_time: req.body.travel_time,
    schedule: req.body.schedule,
    slots: req.body.slots,
    hotel: req.body.hotel,
    transport: req.body.transport,
    tour_guide: req.body.tour_guide,
    list_image: req.body.list_image,
    discount: req.body.discount,
    description: req.body.description.trim(),
    notes: req.body.notes,
    booking: req.body.booking,
  };
  TourModel.findByIdAndUpdate(id, body, { new: true }, (err, result) => {
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
  });
};

const deleteTourById = async (req, res) => {
  const { id } = req.params;
  TourModel.findByIdAndDelete(id, (err, result) => {
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
      message: "Delete Tour thành công!",
    });
  });
};

module.exports = {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTourById,
};
