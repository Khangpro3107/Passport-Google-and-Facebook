const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    return done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,   // set your own client ID, secret and callbackURL in .env file
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
};

module.exports = initializePassport;
