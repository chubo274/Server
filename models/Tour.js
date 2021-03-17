const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    place: [
      {
        type: Schema.Types.ObjectId,
        ref: "Place",
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    avatar: { type: String, required: true },
    place_start: {
      type: Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },
    time_start: { type: Date, required: true },
    travel_time: { day: { type: Number, required: true }, night: Number },
    schedule: [
      {
        day: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        detail: { type: String, required: true },
      },
    ],
    slots: {
      type: Number,
      requried: true,
    },
    hotel: [{ type: Schema.Types.ObjectId, ref: "Hotel", required: true }],
    transport: {
      type: Schema.Types.ObjectId,
      ref: "Transport",
      required: true,
    },
    tour_guide: {
      type: Schema.Types.ObjectId,
      ref: "TourGuide",
      required: true,
    },
    list_image: [String],
    discount: Number,
    description: String,
    notes: [String],
    booking: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        booking_date: { type: Date },
        total_ticket: { type: Number },
        total_money: { type: Number },
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Tour", tourSchema);
