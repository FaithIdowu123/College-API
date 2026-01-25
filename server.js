const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require("./utilities/errorHandler")
const db = require('./database/connect');
const routes = require('./routes');
const session = require('express-session');
const passport = require('./utilities/passport');


app = express();

dotenv.config();


app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));

app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
  res.send("Welcom to College API " + (req.user ? `${req.user.firstName}` : ""));
});

app.use('/', routes);

// Auth routes


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
