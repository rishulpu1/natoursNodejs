const express = require('express');
const fs = require('fs');
const app = express();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const port = 3000;
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
});
// app.get('/', (req, res) => {
//   res.status(200).send('Hello from server side...');
// });
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
