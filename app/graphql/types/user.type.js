import { gql } from "apollo-server-express";

const typeDef = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    password: String
    email: String
  }

  type AuthPayload {
    token: String
  }

  input SignUpInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type Mutation {
    signup(input: SignUpInput!): AuthPayload
    signin(input: SignInInput!): AuthPayload
  }

  type Query {
    currentUser: User
  }
`;

export default typeDef;
