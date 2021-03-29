import express from "express";
import passport from "passport";
import User from "./user.model";
import jwt from "jsonwebtoken";
import UserController from "./user.controller";

const userRouter = express.Router();

userRouter.get("/facebook", passport.authenticate("facebook"));

userRouter.post("/local", async (req, res) => {
  const { email, password } = req.body;
  const { user } = await User.authenticate()(email, password);
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 24 * 60 * 60 * 365,
  });
  res.send({ userId: user._id, tokenId: token });
});

userRouter.post("/create", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const user = new User({ email, firstName, lastName });
    await user.setPassword(password);
    await user.save();
    res.send({ user, success: true });
  } catch (error) {
    console.log("this is an error", error);
    res.status(400).send({ error });
  }
});

userRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/fail",
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 24 * 60 * 60 * 365,
    });
    res.redirect(
      `${process.env.ORIGIN}/authenticated?userId=${req.user._id}&tokenId=${token}`
    );
  }
);

userRouter.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

export default userRouter;
