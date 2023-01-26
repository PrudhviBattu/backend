const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', require('./routes/getUsers'));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
