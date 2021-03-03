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
    res.status(200).json({
      message: "Create TourGuide successfully!",
      data: newTourGuide,
    });
  } catch (error) {
    console.log("createTourGuide error: ", error.message);
    res.status(400).json(error.message);
  }
};

const getTourGuides = async (req, res) => {
  try {
  } catch (error) {
    console.log("getTourGuides error: ", error.message);
    res.status(400).json(error.message);
  }
};

module.exports = { createTourGuide, getTourGuides };
