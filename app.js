const express = require('express');
const fs = require('fs');
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

// middlewares
app.use(express.json());
app.use(morgan('dev'));

const port = 3000;

//router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// app.get('/', (req, res) => {
//   res.status(200).send('Hello from server side...');
// });
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
