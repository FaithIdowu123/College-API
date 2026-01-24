const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require("./utilities/errorHandler")
const db = require('./database/connect');
const routes = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .use(bodyParser.json())
  .use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, x-requested-With, Content-Type, Accept, Z-key, Authorization');
    next();
  })
  .use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE']}))
  .use(cors({origin: '*'}))
  .use("/", routes);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // This is the user object
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/', (req, res) => {
  res.send(req.session.user ? `Logged in as ${req.session.user.displayName}` : `Not logged in`);
});

app.get('/auth/callback', passport.authenticate('google', 
    {failureRedirect: '/api-docs'}
  ), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

db.connectDB().then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});
