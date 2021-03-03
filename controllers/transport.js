const TransportModel = require("../models/Transport");

const createTransport = async (req, res) => {
  const { name, type, slots } = req.body;
  try {
    const newTransport = await TransportModel.create({
      name,
      type,
      slots,
    });
    res.status(200).json({
      message: "Create Transport successfully!",
      data: newTransport,
    });
  } catch (error) {
    console.log("createTransport error: ", error.message);
    res.status(400).json(error.message);
  }
};

const getTransports = async (req, res) => {
  try {
  } catch (error) {
    console.log("getTransports error: ", error.message);
    res.status(400).json(error.message);
  }
};

module.exports = { getTransports };
