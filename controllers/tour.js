const mongoose = require("mongoose");
const TourModel = require("../models/Tour");
const UserModel = require("../models/User");
const PlaceModel = require("../models/Place");
const moment = require("moment");
const _ = require("lodash");

const createTour = async (req, res) => {
  const body = {
    name: req.body.name.trim(),
    places: req.body.places,
    price: req.body.price,
    avatar: req.body.avatar,
    place_start: req.body.place_start,
    time_start: req.body.time_start,
    travel_time: req.body.travel_time,
    schedule: req.body.schedule,
    slots: req.body.slots,
    hotels: req.body.hotels,
    vehicle: req.body.vehicle,
    tour_guide_info: req.body.tour_guide_info,
    list_images: req.body.list_images,
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
  try {
    let Tour = await TourModel.find().populate("places");
    res.status(200).json(Tour);
  } catch (error) {
    res.status(400).json({
      error: "Sai cấu trúc hoặc Đối tượng này không tồn tại",
    });
  }
};

const getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    let tour = await TourModel.findById(id);
    if (_.isEmpty(tour)) {
      res.status(400).json({
        error: "Đối tượng này không tồn tại",
      });
      return;
    }
    let Tour = await TourModel.findById(id).populate("places");
    res.status(200).json(Tour);
  } catch (error) {
    res.status(400).json({
      error: "Sai cấu trúc hoặc Đối tượng này không tồn tại",
    });
  }
  // const listPlace = await Promise.all(
  //   tour.place.map((el) => {
  //     return PlaceModel.findById(el);
  //   })
  // );
};

const updateTour = async (req, res) => {
  const { id } = req.params;
  const body = {
    ...req.body,
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

    res.status(200).json(result);
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

const searchTours = async (req, res) => {
  console.log(req.query);
  const {
    place_start,
    priceFromKey,
    priceToKey,
    start_time,
    places,
  } = req.query;
  console.log(JSON.parse(places));
  try {
    let tours = await TourModel.find({
      $and: [
        { place_start },
        { price: { $gte: Number(priceFromKey) } },
        { price: { $lte: Number(priceToKey) } },
        { start_time },
        { places: { $in: JSON.parse(places) } },
      ],
    });
    console.log({ tours });
  } catch (error) {
    console.log(error);
  }
};

const bookingTour = async (req, res) => {
  const { id } = req.params;
  const body = {
    ...req.body,
    can_dispose: true,
  };
  if (body.discount >= 30) {
    body.can_dispose = false;
  }
  delete body.discount;
  try {
    const Tour = await TourModel.findById(id);
    const booking = [...Tour.booking, body];
    TourModel.findByIdAndUpdate(
      id,
      { booking },
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
        // đặt thành công thì trừ tiền thôi
        // UserModel.findByIdAndUpdate(id, body, { new: true }, (err, result) => {
        //   if (err) {
        //     res.status(400).json({
        //       error: err.message,
        //     });
        //     return;
        //   }
        //   if (_.isEmpty(result)) {
        //     res.status(400).json({
        //       error: "Đối tượng này không tồn tại",
        //     });
        //     return;
        //   }
        // });
      }
    );
    const user = await UserModel.findById(body.user);
    console.log({ user });
  } catch (error) {
    res.status(400).json({
      error: "Sai cấu trúc hoặc Đối tượng này không tồn tại",
    });
  }
};

module.exports = {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTourById,
  searchTours,
  bookingTour,
};
