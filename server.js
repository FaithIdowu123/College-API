const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const errorHandler = require("./utilities/errorHandler")
const db = require('./database/connect');
const studentRoutes = require('./routes/student');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the College API');
});

app.use("/student", studentRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

/* db.connectDB(process.env.MONGO_URI).then(() => {
    console.log('Database connected successfully'); */
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
/* }).catch((error) => {
    console.error('Failed to connect to the database:', error);
}); */
