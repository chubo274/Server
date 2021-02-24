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
    res.json({
      statusCode: 200,
      message: "Create Hotel successfully!",
      data: newHotel,
    });
  } catch (error) {
    console.log("createHotel error: ", error.message);
    res.json(error.message);
  }
};

const getHotels = async (req, res) => {
  try {
  } catch (error) {
    console.log("getHotels error: ", error.message);
    res.json(error.message);
  }
};

module.exports = { getHotels };
