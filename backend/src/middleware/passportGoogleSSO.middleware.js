const passport = require("passport");
const { UserRepo } = require("../repositories");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { UserModel } = require("../models");
const { generatePassword } = require("../utils");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CALLBACK_URL = `${process.env.LOCAL_HOST_SERVER}/api/v1/auth/login/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await UserRepo.getUserByEmail({
        user_email: profile.emails[0].value,
      });
      if (!user) {
        const defaultUser = {
          user_userName: profile.displayName,
          user_email: profile.emails[0].value,
          user_password: generatePassword(),
        };
        const newUser = await UserModel.create(defaultUser);
        if (!newUser) throw new BadRequestError("Login error");
        done(null, newUser);
      }

      if (!user.user_googleId)
        await user.updateOne({ $set: { user_googleId: profile.id } });
      else done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("SerializeUser", user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserRepo.getUserById({ userId: id });
  if (user) done(null, user);
  else throw new BadRequestError("Login Error");
});
