import express from "express";
import Event from "./event.model";
import User from "../user/user.model";

const eventRouter = express.Router();

eventRouter.get("/", async (req, res) => {
  const events = await Event.find({}).populate("participants");
  res.json(events);
});

eventRouter.post("/:id/removeMe", async (req, res) => {
  const { id: eventId } = req.params;
  const { userId } = req.body;
  const event = await Event.findOne({ _id: eventId });

  await Event.updateOne(
    { _id: eventId },
    {
      participantIds: event.participantIds.filter((id) => userId !== id),
    }
  );
  const events = await Event.find({}).populate("participants");
  res.send(events);
});

eventRouter.post("/:id/addMe", async (req, res) => {
  const { id: eventId } = req.params;
  const { userId } = req.body;

  const event = await Event.findOne({ _id: eventId });
  const newParticipants = [...event.participantIds, userId];

  await Event.updateOne({ _id: eventId }, { participantIds: newParticipants });
  const events = await Event.find({}).populate("participants");
  res.send(events);
});

export default eventRouter;
