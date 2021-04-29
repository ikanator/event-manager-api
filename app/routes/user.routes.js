import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import facebook from "passport-facebook";

import User from "../models/user.model";

import {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
} from "../constants";

const FacebookStrategy = facebook.Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }).then((user) => done(null, user));
});

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "name"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const {
        email = "",
        first_name: firstName,
        last_name: lastName,
        id: facebookId,
      } = profile._json;
      const userData = {
        facebookId,
        email,
        firstName,
        lastName,
      };

      const user = await User.findOne({ facebookId });
      if (!user) {
        const newUser = await new User(userData).save();
        done(null, newUser);
      }
      done(null, user);
    }
  )
);

const userRouter = express.Router();

userRouter.get("/facebook", passport.authenticate("facebook"));

userRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.ORIGIN}/login`,
  }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 24 * 60 * 60 * 365,
    });
    res.redirect(`${process.env.ORIGIN}/login?token=${token}`);
  }
);

export default userRouter;
