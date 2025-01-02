const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log('Error aagya:', err);
  });
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name must be given'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Tour price must be given'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);
const testTour = new Tour({
  name: 'Tour to Mcleod',
  rating: 4.8,
  price: 120,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Error', err);
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
