import { EventController } from "../../controllers/event.controller";

const Event = new EventController();

const resolver = {
  Query: {
    events: Event.getEvents,
  },
  Mutation: {
    removeUser: async (_, { id, userId }) => {
      const event = await Event.removeUser({ id, userId });
      return event;
    },
    addUser: async (_, { id, userId }) => {
      const event = await Event.addUser({ id, userId });

      return event;
    },
  },
};

export default resolver;
