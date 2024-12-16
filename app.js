const express = require('express');

const app = express();

const port = 3000;
app.get('/', (req, res) => {
  res.status(200).send('Hello from server side...');
});
app.listen(port, () => {
  console.log(`app running on ${port}`);
});