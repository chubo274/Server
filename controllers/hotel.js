const HotelModel = require("../models/Hotel");

const createHotel = async (req, res) => {
  const { name, address, service, hotline } = req.body;
  try {
    const newHotel = await HotelModel.create({
      name,
      address,
      service,
      hotline,
    });

    res.status(200).json({
      message: "Create Hotel successfully!",
      data: newHotel,
    });
  } catch (error) {
    console.log("createHotel error: ", error.message);
    res.status(400).json(error.message);
  }
};

const getHotels = async (req, res) => {
  try {
    const listHotels = await HotelModel.find();

    res.status(200).json({
      data: listHotels,
    });
  } catch (error) {
    console.log("getHotels error: ", error.message);
    res.status(400).json(error.message);
  }
};

const deleteHotelById = async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  try {
    await HotelModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete Hotel successfully!",
    });
  } catch (error) {
    console.log("deleteHotelById error: ", error.message);
    res.status(400).json(error.message);
  }
};

module.exports = { getHotels, createHotel, deleteHotelById };
