const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
};
exports.getTour = (req, res) => {
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
};
exports.createNewTour = (req, res) => {
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
};
exports.updateTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'updated changes here...',
  });
};
exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
