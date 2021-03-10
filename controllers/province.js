const ProvinceModel = require("../models/Province");
const _ = require("lodash");

const createProvince = async (req, res) => {
  const { name, description } = req.body;
  ProvinceModel.create(
    {
      name,
      description,
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

const getProvinces = async (req, res) => {
  ProvinceModel.find((err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      ...result,
    });
  });
};

const getProvinceById = async (req, res) => {
  const { id } = req.params;
  ProvinceModel.findById(id, (err, result) => {
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

const deleteProvinceById = async (req, res) => {
  const { id } = req.params;
  ProvinceModel.findByIdAndDelete(id, (err, result) => {
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
      message: "Delete Province thành công!",
    });
  });
};

const updateProvince = async (req, res) => {
  const { id } = req.params;
  // const { name, type, slots, phone } = req.body;
  ProvinceModel.findByIdAndUpdate(
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
  getProvinces,
  createProvince,
  deleteProvinceById,
  getProvinceById,
  updateProvince,
};
