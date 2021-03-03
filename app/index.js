import express from "express";
import { json } from "body-parser";
import passport from "passport";
import cors from "cors";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

import { connect } from "./utils/db";
import userRouter from "./user/user.routes";
import eventRouter from "./event/event.routes";

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 365,
    sameSite: false,
    httpOnly: false,
  })
);

// parse cookies
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
  cors({
    origin: "https://enigmatic-temple-94500.herokuapp.com",
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
