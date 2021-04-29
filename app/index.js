import { ApolloServer } from "apollo-server-express";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

import { connect } from "./config/db";
import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";
import userRouter from "./routes/user.routes";
import { TOKEN_SECRET } from "./constants";

connect();
dotenv.config();

const app = express();

// Use passport to log in with Facebook
app.use(passport.initialize());
// Facebook auth route
app.use("/auth", userRouter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let userId = null;

    // Get the user token from the headers.
    const authHeader = req?.headers?.authorization || "Bearer ";
    const token = authHeader.replace("Bearer ", "");

    if (token) {
      // Try to retrieve a user id with the token
      const { id } = jwt.verify(token, TOKEN_SECRET);

      if (id) {
        userId = id;
      }
    }

    const context = {
      // Add userId to context
      userId,
    };

    return context;
  },
});

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () => {
  console.log(`🚀  Server ready at ${server.graphqlPath}`);
});
