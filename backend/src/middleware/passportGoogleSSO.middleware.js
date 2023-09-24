const passport = require("passport");
const { UserRepo } = require("../repositories");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { UserModel } = require("../models");
const { generatePassword, saveTokenCookie } = require("../utils");
const { createTokenPair, createDoubleKeys } = require("../utils/token.utils");
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

      if (user) return done(null, user);

      const defaultUser = {
        user_fullName: profile.displayName,
        user_email: profile.emails[0].value,
        user_password: generatePassword(),
      };

      const newUser = await UserModel.create(defaultUser);
      if (!newUser) throw new BadRequestError("Login error");
      done(null, newUser);
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
  else done(null, false);
});
