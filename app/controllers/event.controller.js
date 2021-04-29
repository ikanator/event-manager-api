import cookieParser from "cookie-parser";
import Event from "../models/event.model";

class EventController {
  async getEvents() {
    return await Event.find({});
  }

  async removeUser({ id, userId }) {
    const event = await Event.findById(id);

    const participantIds = event.participantIds.filter((pId) => userId !== pId);

    return await Event.findByIdAndUpdate(id, { participantIds }, { new: true });
  }

  async addUser({ id, userId }) {
    return await Event.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          participantIds: [userId],
        },
      },
      { new: true }
    );
  }
}

export { EventController };
