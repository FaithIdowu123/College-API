const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database/connect');
const routes = require('./routes');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the College API');
});

app.use("/", routes);



const PORT = process.env.PORT || 3000;

db.connectDB(process.env.MONGO_URI).then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});
