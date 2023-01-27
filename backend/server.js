const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
connectDB(); //DB connection

// json parson & url encoder
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/goal', require('./routes/goalRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(errorHandler); //custom error handler

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
