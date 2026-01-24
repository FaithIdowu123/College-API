const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authModel = require('../models/auth');
const hasher = require('./hasher');
const dotenv = require('dotenv');
dotenv.config();

// ------------------- LOCAL STRATEGY -------------------
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await authModel.getProfileByEmail(email);
        if (!user || !user.password) return done(null, false, { message: 'Incorrect email or password' });

        const isMatch = await hasher.comparePassword(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect email or password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ------------------- GOOGLE OAUTH STRATEGY -------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL  
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await authModel.getProfileByEmail(profile.emails[0].value);

        if (!user) {
          // create new OAuth user
          user = await authModel.addProfile({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: null,          // no password for OAuth
            oauthProvider: 'google',
            oauthId: profile.id
          });
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// ------------------- SERIALIZE / DESERIALIZE -------------------
passport.serializeUser((user, done) => done(null, user._id.toString()));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await authModel.getProfileById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
