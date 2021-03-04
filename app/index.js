import express from "express";
import { json } from "body-parser";
import passport from "passport";
import cors from "cors";

import { connect } from "./utils/db";
import userRouter from "./user/user.routes";
import eventRouter from "./event/event.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(json());

app.use("/auth", userRouter);
app.use("/events", eventRouter);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

app.listen(port, async () => {
  await connect();
  console.log(`Server listening on ${port}`);
});
