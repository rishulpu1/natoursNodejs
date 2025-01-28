const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour name must be given'],
      unique: true,
      trim: true,
      maxlength: [40, 'Tour name must have less or equal than 40 characters'],
      minlength: [10, 'Tour name must have more or equal than 10 characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Tour duration must be given'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour group size must be given'],
    },
    difficulty: {
      type: String,
      required: [true, 'Tour difficulty must be given'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Tour price must be given'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour summary must be given'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Tour cover image must be given'],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    images: [String],
    createdAt: { type: Date, default: Date.now(), select: false },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//Document  Middleware: runs before .save() and .create()

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Query Middleware: runs before .find() and .findOne()

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//Aggregation Middleware: runs before .aggregate()
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
