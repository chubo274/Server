const mongoose = require("mongoose");
const TransportModel = require("../models/Transport");
const _ = require("lodash");

const createTransport = async (req, res) => {
  const body = {
    name: req.body.name.trim(),
    type: req.body.type.trim(),
    slots: req.body.slots,
    phone: req.body.phone,
  };
  TransportModel.create(body, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.status(200).json(result);
  });
};

const getTransports = async (req, res) => {
  TransportModel.find((err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.status(200).json(result);
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
    res.status(200).json(result);
  });
};

const updateTransport = async (req, res) => {
  const { id } = req.params;
  const body = {
    ...req.body,
    name: req.body.name.trim(),
    type: req.body.type.trim(),
    slots: req.body.slots,
    phone: req.body.phone,
  };
  TransportModel.findByIdAndUpdate(id, body, { new: true }, (err, result) => {
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
      res.status(200).json(result);
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
