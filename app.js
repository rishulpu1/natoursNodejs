const express = require('express');

const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// app.get('/', (req, res) => {
//   res.status(200).send('Hello from server side...');
// });

module.exports = app;
