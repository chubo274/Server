const mongoose = require("mongoose");
const TourModel = require("../models/Tour");
const UserModel = require("../models/User");
const moment = require("moment");
const _ = require("lodash");

const createTour = async (req, res) => {
  if (req.user.role == "SuperAdmin" || req.user.role == "Admin") {
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
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const getTours = async (req, res) => {
  if (!_.isEmpty(req.user.role)) {
    const { _id } = req.query;
    try {
      const Tour = await TourModel.find().populate("places");
      const listSale = await TourModel.find({ discount: { $gte: 25 } })
        .sort({ discount: -1 })
        .limit(10)
        .populate("places");
      await TourModel.find({
        $and: [
          {
            "booking.user": {
              $nin: _id,
            },
          },
          {
            time_start: { $gt: moment().endOf("day").toISOString() },
          },
        ],
      }).populate("places");
      var filter = {
        $and: [
          {
            "booking.user": {
              $nin: _id,
            },
          },
          {
            time_start: { $gt: moment().endOf("day").toISOString() },
          },
        ],
      };
      var options = { limit: 5, populate: "places" };
      TourModel.findRandom(filter, {}, options, function (err, results) {
        if (!err) {
          res.status(200).json({ Tour, listSale, listSuggest: results });
        } else {
          res.status(400).json({
            error: "Oop! something wrong with random",
          });
        }
      });
    } catch (error) {
      res.status(400).json({
        error: "Sai cấu trúc hoặc Đối tượng này không tồn tại",
      });
    }
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const getTourById = async (req, res) => {
  if (!_.isEmpty(req.user.role)) {
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
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
  // const listPlace = await Promise.all(
  //   tour.place.map((el) => {
  //     return PlaceModel.findById(el);
  //   })
  // );
};

const updateTour = async (req, res) => {
  if (req.user.role == "SuperAdmin" || req.user.role == "Admin") {
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
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const deleteTourById = async (req, res) => {
  if (req.user.role == "SuperAdmin" || req.user.role == "Admin") {
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
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const searchTours = async (req, res) => {
  if (!_.isEmpty(req.user.role)) {
    console.log(req.query);
    const {
      place_start,
      priceFromKey,
      priceToKey,
      time_start,
      places,
    } = req.query;
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
            : [
                {
                  time_start: {
                    $gte: moment().startOf("day").toISOString(),
                  },
                },
              ]),
          ...(places ? [{ places: { $in: places } }] : []),
        ],
      });
      res.status(200).json(tours);
    } catch (error) {
      res.status(400).json({
        error: "Sai cấu trúc hoặc Đối tượng này không tồn tại",
      });
    }
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const bookingTour = async (req, res) => {
  if (req.user.role == "User") {
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
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const cancelBookingTour = async (req, res) => {
  console.log(req.query);
  if (!_.isEmpty(req.user.role)) {
    const { tour_id, booking_id } = req.query;
    try {
      let Tour = await TourModel.findById(tour_id);
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
          if (can_dispose) {
            let percentRefund = 100;
            if (moment(Tour.time_start).diff(moment().toDate(), "days") > 9) {
              percentRefund = 100;
            } else if (
              moment(Tour.time_start).diff(moment().toDate(), "days") > 7
            ) {
              percentRefund = 75;
            } else if (
              moment(Tour.time_start).diff(moment().toDate(), "days") > 5
            ) {
              percentRefund = 50;
            } else if (
              moment(Tour.time_start).diff(moment().toDate(), "days") > 3
            ) {
              percentRefund = 25;
            } else percentRefund = 0;
            dataBooking[0].total_money =
              ((100 - percentRefund) / 100) * total_money;
            delete dataBooking[0].user;
            delete dataBooking[0].total_ticket;
            delete dataBooking[0].can_dispose;

            let indexBooking;
            Tour.booking.map((el, index) => {
              if (el._id.toString() === dataBooking[0]._id.toString())
                indexBooking = index;
            });
            Tour.booking[indexBooking] = {
              ...dataBooking[0],
            };
            Tour.slots = Tour.slots + total_ticket;
            const newTour = await TourModel.findByIdAndUpdate(tour_id, Tour);

            const getUser = await UserModel.findById(user);
            const bodyUser = { ...getUser._doc };
            const updateUser = {
              ...bodyUser,
              money_available:
                bodyUser.money_available + total_money * (percentRefund / 100),
            };
            const newUser = await UserModel.findByIdAndUpdate(user, updateUser);
            res.status(200).json({ newTour, newUser });
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
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
    });
  }
};

const getAllBooking = async (req, res) => {
  if (!_.isEmpty(req.user.role)) {
    const { start_date, end_date, user_id } = req.query;
    console.log(req.query);
    try {
      let tourBookings = await TourModel.aggregate([
        { $project: { _id: 0, booking: 1 } },
        { $unwind: "$booking" },
        { $replaceRoot: { newRoot: "$booking" } },
        ...(user_id
          ? [
              {
                $match: {
                  user: mongoose.Types.ObjectId(user_id),
                },
              },
            ]
          : []),
      ]);
      res.status(200).json(tourBookings);
    } catch (error) {
      console.log({ error });
      res.status(400).json({
        error: "Oop! có lỗi bất ngờ",
      });
    }
  } else {
    res.status(400).json({
      error: "Bạn không có quyền thực hiện thao tác này",
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
