import express from "express";
import passport from "passport";
import User from "./user.model";
import UserController from "./user.controller";

const userRouter = express.Router();

userRouter.get("/facebook/success", (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.session.user,
      cookies: req.cookies,
    });
  } else {
    return res.status(401).send({ message: "error message" });
  }
});

userRouter.get("/facebook", passport.authenticate("facebook"));

userRouter.post("/local", async (req, res) => {
  const { email, password } = req.body;
  const { user } = await User.authenticate()(email, password);
  req.session.user = user;
  res.send({ user, success: true });
});

userRouter.post("/create", async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  try {
    const user = new User({ email: username, firstName, lastName });
    await user.setPassword(password);
    await user.save();
    res.send({ user });
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
    req.session.user = req.user;
    res.redirect("http://localhost:3006");
  }
);

userRouter.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

export default userRouter;
