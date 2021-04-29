import { gql } from "apollo-server-express";

const typeDef = gql`
  type Event {
    _id: ID
    name: String
    time: String
    participantIds: [ID]
  }

  type Query {
    events: [Event]
  }

  type Mutation {
    removeUser(id: ID, userId: ID): Event
    addUser(id: ID, userId: ID): Event
  }
`;

export default typeDef;
