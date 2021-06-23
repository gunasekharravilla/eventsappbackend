import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    seatCount: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Event = mongoose.model("Event", eventSchema);

export default Event;
