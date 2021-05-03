const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    places: [
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
      type: String,
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
    hotels: [{ type: String }],
    vehicle: {
      type: String,
      required: true,
    },
    tour_guide_info: {
      type: String,
      required: true,
    },
    list_images: [String],
    discount: Number,
    description: String,
    notes: [String],
    booking: [
      {
        tour: { type: Schema.Types.ObjectId, ref: "Tour" },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        booking_date: { type: Date },
        total_ticket: { type: Number },
        total_money: { type: Number },
        can_dispose: { type: Boolean },
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Tour", tourSchema);
