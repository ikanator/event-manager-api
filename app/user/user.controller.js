import passport from "passport";
import dotenv from "dotenv";
import facebook from "passport-facebook";
import local from "passport-local";

import User from "../user/user.model";

const FacebookStrategy = facebook.Strategy;
const LocalStrategy = local.Strategy;

dotenv.config();
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }).then((user) => done(null, user));
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
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

passport.use(User.createStrategy());
