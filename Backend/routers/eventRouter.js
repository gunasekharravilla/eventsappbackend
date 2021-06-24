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

eventRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.send(event);
    } else {
      res.status(404).send({ message: "Event Not Found" });
    }
  })
);

eventRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const event = new Event({
      title: "Event title " + Date.now(),
      image: "/images/p1.jpg",
      seatCount: 1,
      rating: 1,
      numReviews: 2,
      description: "sample description",
    });
    const createdEvent = await event.save();
    res.send({ message: "Event Created", event: createdEvent });
  })
);

eventRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (event) {
      event.title = req.body.title;
      event.image = req.body.image;
      event.seatCount = req.body.seatCount;
      event.description = req.body.description;
      const updatedEvent = await event.save();
      res.send({ message: "Event Updated", event: updatedEvent });
    } else {
      res.status(404).send({ message: "event Not Found" });
    }
  })
);

export default eventRouter;
