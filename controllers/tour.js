const TourModel = require("../models/Tour");

const createTour = async (req, res) => {
  const {
    name,
    place,
    price,
    avatar,
    place_start,
    time_start,
    travel_time,
    schedule,
    slots,
    service,
    transport,
    list_image,
    discount,
    description,
    notes,
    booking,
  } = req.body;
  try {
  } catch (error) {}
};

const getTours = async (req, res) => {
  try {
    const listTours = await TourModel.find();
    res.status(200).json(listTours);
  } catch (error) {}
};

module.exports = { createTour, getTours };
