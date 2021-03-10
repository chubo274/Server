const mongoose = require("mongoose");
const TransportModel = require("../models/Transport");
const _ = require("lodash");

const createTransport = async (req, res) => {
  const { name, type, slots, phone } = req.body;
  TransportModel.create(
    {
      name,
      type,
      slots,
      phone,
    },
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.status(200).json({
        message: "Create Transport thành công!",
        data: result,
      });
    }
  );
};

const getTransports = async (req, res) => {
  TransportModel.find((err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.status(200).json({
      data: result,
    });
  });
};

const getTransportById = async (req, res) => {
  const { id } = req.params;
  TransportModel.findById(id, (error, result) => {
    if (error) {
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

const updateTransport = async (req, res) => {
  const { id } = req.params;
  const { name, type, slots, phone } = req.body;
  TransportModel.findByIdAndUpdate(
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
        message: "Update Transport thành công",
        data: result,
      });
    }
  );
};

const deleteTransportById = async (req, res) => {
  const { id } = req.params;
  TransportModel.findByIdAndDelete(
    mongoose.Types.ObjectId(id),
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
        message: "Delete Transport thành công",
        data: result,
      });
    }
  );
};

module.exports = {
  createTransport,
  getTransports,
  getTransportById,
  updateTransport,
  deleteTransportById,
};
