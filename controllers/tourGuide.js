const TourGuideModel = require("../models/TourGuide");

const createTourGuide = async (req, res) => {
  const { name, gender, phone } = req.body;
  try {
    const newTourGuide = await TourGuideModel.create({
      name,
      gender,
      service,
      phone,
    });
    res.json({
      statusCode: 200,
      message: "Create TourGuide successfully!",
      data: newTourGuide,
    });
  } catch (error) {
    console.log("createTourGuide error: ", error.message);
    res.json(error.message);
  }
};

const getTourGuides = async (req, res) => {
  try {
  } catch (error) {
    console.log("getTourGuides error: ", error.message);
    res.json(error.message);
  }
};

module.exports = { getTourGuides };
