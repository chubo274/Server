const mongoose = require("mongoose");
const TourModel = require("../models/Tour");
const UserModel = require("../models/User");
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
      error: "Sai cấu trúc hoặc Đối tượng này không tồn tại!!!",
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
  const {
    place_start,
    priceFromKey,
    priceToKey,
    time_start,
    places,
  } = req.query;
  console.log(req.query);
  try {
    let tours = await TourModel.find({
      $and: [
        { place_start },
        { price: { $gte: Number(priceFromKey) } },
        { price: { $lte: Number(priceToKey) } },
        ...(time_start
          ? [
              {
                time_start: {
                  $gte: moment(time_start).startOf("day").toISOString(),
                  $lt: moment(time_start).endOf("day").toISOString(),
                },
              },
            ]
          : []),
        ...(places ? [{ places: { $in: JSON.parse(places) } }] : []),
      ],
    });
    res.status(200).json(tours);
  } catch (error) {
    res.status(400).json({
      error: "Sai cấu trúc hoặc Đối tượng này không tồn tại",
    });
  }
};

const bookingTour = async (req, res) => {
  const { id } = req.params;
  const body = {
    ...req.body,
    can_dispose: true,
  };
  if (body.discount >= 25) {
    body.can_dispose = false;
  }
  delete body.discount;
  try {
    const Tour = await TourModel.findById(id);
    const booking = [...Tour.booking, body];
    const newBooking = await TourModel.findByIdAndUpdate(id, {
      booking,
      slots: Tour.slots - body.total_ticket,
    });
    if (!_.isEmpty(newBooking)) {
      const user = await UserModel.findById(body.user);
      if (!_.isEmpty(user)) {
        const newDataWallet = await UserModel.findByIdAndUpdate(body.user, {
          money_available: user.money_available - body.total_money,
        });
        if (!_.isEmpty(newDataWallet)) {
          res.status(200).json("Đặt Tour, update ví thành công");
        } else {
          console.log("Lỗi không update được ví");
          res.status(400).json({
            error: "Lỗi không update được ví",
          });
        }
      } else {
        console.log("Lỗi không tìm được ví");
        res.status(400).json({
          error: "Lỗi không tìm được ví",
        });
      }
    } else {
      console.log("Lỗi không đặt được tour");
      res.status(400).json({
        error: "Lỗi không đặt được tour",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Sai cấu trúc hoặc Đối tượng này không tồn tại",
    });
  }
};

const cancelBookingTour = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  const { tour_id, booking_id } = req.query;
  try {
    const Tour = await TourModel.findById(tour_id);
    if (!_.isEmpty(Tour)) {
      let dataBooking = await TourModel.aggregate([
        { $project: { _id: 0, booking: 1 } },
        { $unwind: "$booking" },
        { $replaceRoot: { newRoot: "$booking" } },
        {
          $match: {
            _id: mongoose.Types.ObjectId(booking_id),
          },
        },
      ]);
      if (!_.isEmpty(dataBooking)) {
        const {
          _id,
          user,
          booking_date,
          total_money,
          total_ticket,
          can_dispose,
        } = dataBooking[0];
        console.log(
          { _id },
          { user },
          { booking_date },
          { total_money },
          { total_ticket },
          { can_dispose }
        );
        if (can_dispose) {
          const x = await Tour.update(
            { _id: mongoose.Types.ObjectId(tour_id) },
            {
              $unset: {
                booking: mongoose.Types.ObjectId(booking_id),
              },
            }
          );
          console.log({ x });
          const newTour = await TourModel.findById(tour_id);
          console.log(newTour);
          res.status(200).json(newTour);
        } else {
          res.status(400).json({
            error: "Tour không nằm trong danh sách được hỗ trợ huỷ",
          });
        }
      } else {
        res.status(400).json({
          error: "Lỗi không tìm thấy data booking",
        });
      }
    } else {
      res.status(400).json({
        error: "Lỗi không tìm thấy tour",
      });
    }
  } catch (error) {
    console.log({ error });
  }
};

const getAllBooking = async (req, res) => {
  const { start_date, end_date, user_id } = req.query;
  console.log(req.query);
  try {
    let tourBookings = await TourModel.aggregate([
      { $project: { _id: 0, booking: 1 } },
      { $unwind: "$booking" },
      { $replaceRoot: { newRoot: "$booking" } },
      {
        $match: {
          $and: [
            ...(start_date
              ? [
                  {
                    booking_date: {
                      $gte: moment(start_date).startOf("day").toISOString(),
                    },
                  },
                ]
              : []),
            ...(end_date
              ? [
                  {
                    booking_date: {
                      $lte: moment(end_date).startOf("day").toISOString(),
                    },
                  },
                ]
              : []),
            ...(user_id
              ? [
                  {
                    user: mongoose.Types.ObjectId(user_id),
                  },
                ]
              : []),
          ],
        },
      },
    ]);
    res.status(200).json(tourBookings);
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      error: "Oop! có lỗi bất ngờ",
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
  cancelBookingTour,
  getAllBooking,
};
