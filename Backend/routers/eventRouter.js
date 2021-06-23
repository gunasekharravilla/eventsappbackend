import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Event from "../models/eventModel.js";

const eventRouter = express.Router();

eventRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.send(events);
  })
);

eventRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Event.remove({});
    const createdEvents = await Event.insertMany(data.events);
    res.send({ createdEvents });
  })
);
eventRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const event = new Event({
      title: "Event title " + Date.now(),
      image: "/images/p1.jpg",
      seatCount: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdEvent = await event.save();
    res.send({ message: "Event Created", event: createdEvent });
  })
);

export default eventRouter;
