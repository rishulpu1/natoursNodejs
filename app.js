const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const port = 3000;

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
}
const getTour = (req, res) => {
  //console.log(req.params);
  const tourId = req.params.id * 1;
  const tour = tours.find((el) => el.id === tourId);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
    return;
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}
const createNewTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //res.send('done');
}
const updateTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'updated changes here...'
  })
}
const deleteTour = (req, res) => {
  if(req.params.id * 1 > tours.length){
   return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  })
}
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createNewTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours').get(getAllTours).post(createNewTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)
// app.get('/', (req, res) => {
//   res.status(200).send('Hello from server side...');
// });
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
