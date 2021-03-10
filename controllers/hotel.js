const HotelModel = require("../models/Hotel");
const _ = require("lodash");

const createHotel = async (req, res) => {
  const { name, address, service, hotline } = req.body;
  HotelModel.create(
    {
      name,
      address,
      service,
      hotline,
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

const getHotels = async (req, res) => {
  HotelModel.find((err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.status(200).json({
      ...result,
    });
  });
};

const getHotelById = async (req, res) => {
  const { id } = req.params;
  HotelModel.findById(id, (err, result) => {
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

const deleteHotelById = async (req, res) => {
  const { id } = req.params;
  HotelModel.findByIdAndDelete(id, (err, result) => {
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
      message: "Delete Hotel thành công!",
    });
  });
};

const updateHotel = async (req, res) => {
  const { id } = req.params;
  // const { name, type, slots, phone } = req.body;
  HotelModel.findByIdAndUpdate(
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
  getHotels,
  createHotel,
  deleteHotelById,
  getHotelById,
  updateHotel,
};
